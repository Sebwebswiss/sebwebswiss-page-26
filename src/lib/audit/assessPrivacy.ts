import type { CheckResult } from "@/content/audit/checks";
import { privacyChecks } from "@/content/audit/checks";
import { describe } from "@/content/audit/checkTranslations";
import type { ParsedPage } from "./parsers";
import type { SiteResponse } from "./fetchSite";

export type PrivacyExtras = {
  policyHtml: string | null;
  policyUrl: string | null;
  policyStatus: number | null;
  policyExternal?: boolean;
};

type Status = "ok" | "warn" | "fail";

const PRIVACY_HINT = /confidentialit|privacy|datenschutz|protezione(?:\s+dei)?\s+dati|informativa\s+privacy|protection\s+des\s+donn|donn[eé]es\s+personnelles|data\s+protection|privatsph|rgpd|nlpd/i;

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ");
}

function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Finds the most plausible privacy-policy link on a page, in FR/DE/IT/EN. */
export function findPrivacyLink(html: string, baseUrl: string): string | null {
  const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];
  let base: URL;
  try {
    base = new URL(baseUrl);
  } catch {
    return null;
  }

  let best: string | null = null;
  let bestScore = 0;

  for (const anchor of anchors) {
    const openTag = anchor.match(/<a\b[^>]*>/i)?.[0] ?? "";
    const hrefMatch = openTag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = hrefMatch?.[1] ?? hrefMatch?.[2] ?? hrefMatch?.[3] ?? "";
    if (!href || /^(?:#|mailto:|tel:|javascript:)/i.test(href)) continue;

    let url: URL;
    try {
      url = new URL(href, base);
    } catch {
      continue;
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") continue;

    const text = htmlToText(anchor.replace(/<[^>]+>/g, " "));
    const haystack = `${url.pathname} ${url.search} ${text}`;
    if (!PRIVACY_HINT.test(haystack)) continue;

    let score = 1;
    if (url.origin === base.origin) score += 3;
    if (/confidentialit|privacy|datenschutz|dati|donn|personnelles/i.test(url.pathname)) score += 2;
    if (/politique|politica|policy|informativa|erkl|privacy/i.test(text)) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = url.toString();
    }
  }

  return best;
}

type Topic = { id: string; re: RegExp };

const TOPICS: Topic[] = [
  { id: "controller", re: /responsable (?:du|de) traitement|responsable de la protection|verantwortlich(?:e)? (?:stelle|person)|titolare del trattamento|data controller|controller of/ },
  { id: "purposes", re: /finalit[eé]s?|buts? poursuivis|zweck(?:e)?\b|scop(?:o|i)\b|purposes?\b/ },
  { id: "data", re: /donn[eé]es (?:personnelles|collect[eé]es)|personenbezogene daten|dati personali|personal data/ },
  { id: "retention", re: /dur[eé]e de conservation|conservation des donn|aufbewahrung|conservazione|retention period/ },
  { id: "rights", re: /droit d'acc[eè]s|droits des personnes|droit à l'effacement|droit de rectification|recht auf auskunft|diritti dell'interessato|right to access|rights of (?:the )?data subjects|rectification/ },
  { id: "cookies", re: /cookies?|traceurs?|trackers?\b/ },
  { id: "thirdParties", re: /sous-traitants?|prestataires?|tiers\b|dienstleister|fornitori|third[- ]part|processors?/ },
  { id: "transfers", re: /transfert|hors de suisse|à l'étranger|ausland|estero|outside switzerland|third countr/ },
  { id: "updated", re: /derni[eè]re mise à jour|mise à jour|zuletzt aktualisiert|ultimo aggiornamento|last updated|\b20\d{2}\b/ },
];

const LAW = /nlpd|lpd\b|dsg\b|fadp|loi (?:f[eé]d[eé]rale )?sur la protection des donn|datenschutzgesetz|legge sulla protezione dei dati/;

const CONTACT = /d[eé]l[eé]gu[eé] à la protection|dpo\b|[\w.+-]+@[\w-]+\.[\w.-]+|contact.{0,40}(?:protection|donn[eé]es|privacy|datenschutz)/;

// Only observable network endpoints count: an analytics ID or a gtag() stub in
// the HTML does not prove that a tracker actually loads (consent gating is
// often applied client-side, after the user's choice).
const TRACKERS: { name: string; re: RegExp }[] = [
  { name: "Google Analytics", re: /googletagmanager\.com\/gtag\/js|google-analytics\.com\/(?:ga|analytics|collect)/ },
  { name: "Google Tag Manager", re: /googletagmanager\.com\/gtm\.js/ },
  { name: "Meta Pixel", re: /connect\.facebook\.net\/[^"']*fbevents\.js/ },
  { name: "LinkedIn Insight", re: /snap\.licdn\.com\/li\.lms-analytics/ },
  { name: "Hotjar", re: /static\.hotjar\.com/ },
  { name: "Microsoft Clarity", re: /clarity\.ms\/tag/ },
  { name: "Matomo", re: /matomo\.(?:js|php)|piwik\.(?:js|php)/ },
  { name: "TikTok Pixel", re: /analytics\.tiktok\.com/ },
];

const CMPS: { name: string; re: RegExp }[] = [
  { name: "Cookiebot", re: /cookiebot/i },
  { name: "CookieYes", re: /cookieyes/i },
  { name: "Klaro", re: /klaro/i },
  { name: "Tarteaucitron", re: /tarteaucitron/i },
  { name: "Iubenda", re: /iubenda/i },
  { name: "Usercentrics", re: /usercentrics/i },
  { name: "OneTrust", re: /onetrust/i },
  { name: "Axeptio", re: /axeptio/i },
  { name: "Didomi", re: /didomi/i },
  { name: "Osano", re: /osano/i },
  { name: "Complianz", re: /complianz/i },
  { name: "Borlabs", re: /borlabs/i },
  { name: "CookieConsent", re: /cookieconsent/i },
  { name: "Consent Manager", re: /consentmanager|consent-manager/i },
];

function detectTrackers(html: string): string[] {
  return TRACKERS.filter((tracker) => tracker.re.test(html)).map((tracker) => tracker.name);
}

function detectConsent(html: string): string | null {
  const vendor = CMPS.find((cmp) => cmp.re.test(html));
  if (vendor) return vendor.name;

  const hasConsentMarkup = /(?:class|id)\s*=\s*["'][^"']*(?:cookie|consent|gdpr|rgpd)[^"']*["']/i.test(html);
  const hasChoice = /(accepter|refuser|accept all|reject all|alle akzeptieren|alle ablehnen|accetta|rifiuta|i agree)/i.test(html);
  if (hasConsentMarkup && hasChoice) return "bannière personnalisée";

  return null;
}

function statusFrom(score: number, okThreshold: number, warnThreshold: number): Status {
  if (score >= okThreshold) return "ok";
  if (score >= warnThreshold) return "warn";
  return "fail";
}

export function assessPrivacy(page: ParsedPage, site: SiteResponse, extras: PrivacyExtras): CheckResult[] {
  const homepage = site.html;
  const policyText = extras.policyHtml ? htmlToText(extras.policyHtml) : "";
  const hasPolicy = Boolean(extras.policyUrl);

  const linkResult: CheckResult = {
    ...privacyChecks[0],
    status: hasPolicy ? "ok" : "fail",
    ...(hasPolicy
      ? describe("privacy.link.found", { url: extras.policyUrl ?? "" })
      : describe("privacy.link.absent")),
  };

  let pageStatus: Status;
  let pageDetail;
  if (!hasPolicy) {
    pageStatus = "fail";
    pageDetail = describe("privacy.page.absent");
  } else if (extras.policyExternal) {
    pageStatus = "warn";
    pageDetail = describe("privacy.page.external", { url: extras.policyUrl ?? "" });
  } else if (extras.policyStatus === 200 && extras.policyHtml) {
    pageStatus = "ok";
    pageDetail = describe("privacy.page.ok", { status: 200 });
  } else if (extras.policyStatus == null) {
    pageStatus = "warn";
    pageDetail = describe("privacy.page.unreachable");
  } else {
    pageStatus = "fail";
    pageDetail = describe("privacy.page.status", { status: extras.policyStatus });
  }
  const pageResult: CheckResult = { ...privacyChecks[1], status: pageStatus, ...pageDetail };

  const missingTopics = TOPICS.filter((topic) => !topic.re.test(policyText));
  const foundCount = TOPICS.length - missingTopics.length;
  const contentStatus: Status = !policyText ? "warn" : statusFrom(foundCount, 6, 4);
  const contentDetail = !policyText
    ? describe("privacy.content.none")
    : describe("privacy.content.result", {
        found: foundCount,
        total: TOPICS.length,
        missingCount: missingTopics.length,
      });
  const contentResult: CheckResult = { ...privacyChecks[2], status: contentStatus, ...contentDetail };

  const hasRights = TOPICS.find((topic) => topic.id === "rights")?.re.test(policyText) ?? false;
  const hasContact = CONTACT.test(policyText);
  const rightsScore = Number(hasRights) + Number(hasContact);
  const rightsStatus: Status = !policyText ? "warn" : rightsScore === 2 ? "ok" : rightsScore === 1 ? "warn" : "fail";
  const rightsDetail = !policyText
    ? describe("privacy.content.none")
    : rightsScore === 2
      ? describe("privacy.rights.ok")
      : rightsScore === 1
        ? describe("privacy.rights.partial")
        : describe("privacy.rights.absent");
  const rightsResult: CheckResult = { ...privacyChecks[3], status: rightsStatus, ...rightsDetail };

  const trackers = detectTrackers(homepage);
  const cmp = detectConsent(homepage);
  let consentStatus: Status;
  let consentDetail;
  if (trackers.length === 0) {
    consentStatus = "ok";
    consentDetail = describe("privacy.consent.none");
  } else if (cmp) {
    consentStatus = "ok";
    consentDetail = describe("privacy.consent.ok", { cmp, trackers: trackers.join(", ") });
  } else {
    consentStatus = "fail";
    consentDetail = describe("privacy.consent.fail", { trackers: trackers.join(", ") });
  }
  const consentResult: CheckResult = { ...privacyChecks[4], status: consentStatus, ...consentDetail };

  const forms = homepage.match(/<form\b[\s\S]*?<\/form>/gi) ?? [];
  const formWithNotice = forms.some((form) =>
    PRIVACY_HINT.test(form) ||
    /type\s*=\s*["']?checkbox/i.test(form) ||
    /j'accepte|ich stimme|accetto|i agree/i.test(form),
  );
  let formsStatus: Status;
  let formsDetail;
  if (forms.length === 0) {
    formsStatus = "ok";
    formsDetail = describe("privacy.forms.none");
  } else if (formWithNotice) {
    formsStatus = "ok";
    formsDetail = describe("privacy.forms.ok");
  } else {
    formsStatus = "warn";
    formsDetail = describe("privacy.forms.warn");
  }
  const formsResult: CheckResult = { ...privacyChecks[5], status: formsStatus, ...formsDetail };

  const lawStatus: Status = LAW.test(policyText) ? "ok" : "warn";
  const lawResult: CheckResult = {
    ...privacyChecks[6],
    status: lawStatus,
    ...(lawStatus === "ok" ? describe("privacy.law.found") : describe("privacy.law.absent")),
  };

  void page;
  return [linkResult, pageResult, contentResult, rightsResult, consentResult, formsResult, lawResult];
}
