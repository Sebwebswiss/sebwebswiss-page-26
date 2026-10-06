export const CONSENT_KEY = "sws-consent";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const listeners = new Set<() => void>();

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function readConsent(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(CONSENT_KEY) ?? "";
}

export function getConsent(): Consent | null {
  const value = readConsent();
  return value === "granted" || value === "denied" ? value : null;
}

export function setConsent(value: Consent) {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.gtag?.("consent", "update", { analytics_storage: value });
  listeners.forEach((listener) => listener());
}

export function sendPageView() {
  window.gtag?.("event", "page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}
