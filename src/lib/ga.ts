export const CONSENT_KEY = "sws-consent";
export const GA_ID = "G-F0EX3JLZC0";
export const UNKNOWN_CONSENT = "unknown";
const DISABLE_KEY = `ga-disable-${GA_ID}` as const;

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    [DISABLE_KEY]?: boolean;
  }
}

const listeners = new Set<() => void>();
let sessionConsent: Consent | null | undefined;
let configured = false;

function notifyConsent() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== CONSENT_KEY && event.key !== null) return;
  sessionConsent = undefined;
  syncConsent();
  notifyConsent();
}

export function subscribeConsent(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function readConsent(): string {
  if (typeof window === "undefined") return "";
  if (sessionConsent !== undefined) return sessionConsent ?? "";
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "";
  } catch {
    return "";
  }
}

export function serverConsentSnapshot() {
  return UNKNOWN_CONSENT;
}

export function getConsent(): Consent | null {
  const value = readConsent();
  return value === "granted" || value === "denied" ? value : null;
}

export function setConsent(value: Consent) {
  sessionConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Privola vrijedi za ovu sesiju i kada preglednik ne dopušta pohranu.
  }
  syncConsent();
  notifyConsent();
}

/** Birač privole se ponovno otvara iz footera: briše odluku i trenutno gasi mjerenje. */
export function reopenConsent() {
  sessionConsent = null;
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // U memoriji brišemo odluku i kada localStorage nije dostupan.
  }
  syncConsent();
  notifyConsent();
}

function sendCommand(...args: unknown[]) {
  try {
    window.gtag?.(...args);
  } catch {
    // Analytics ne smije prekinuti navigaciju ili uspješno slanje forme.
  }
}

/** Consent Mode sam ne zaustavlja cookieless hitove: koristimo i GA opt-out. */
export function syncConsent() {
  const value = getConsent() === "granted" ? "granted" : "denied";
  window[DISABLE_KEY] = value !== "granted";
  sendCommand("consent", "update", { analytics_storage: value });
}

export function configureAnalytics() {
  if (configured || getConsent() !== "granted") return;
  configured = true;
  sendCommand("config", GA_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 60 * 60 * 24 * 390,
    ...(new URLSearchParams(window.location.search).get("debug_mode") === "true"
      ? { debug_mode: true }
      : {}),
  });
}

export function sendPageView() {
  if (getConsent() !== "granted") return;
  sendCommand("event", "page_view", {
    send_to: GA_ID,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}

/** Šalje GA4 event samo ako je korisnik dao privolu. */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (getConsent() !== "granted") return;
  sendCommand("event", name, { ...params, send_to: GA_ID });
}
