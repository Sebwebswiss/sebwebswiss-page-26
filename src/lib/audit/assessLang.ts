import type { CheckResult } from "@/content/audit/checks";
import { langChecks } from "@/content/audit/checks";
import { describe } from "@/content/audit/checkTranslations";
import type { ParsedPage } from "./parsers";
import type { SiteResponse } from "./fetchSite";

type Status = "ok" | "warn";

const KNOWN_BASE = new Set(["fr", "de", "it", "en", "rm", "es", "pt", "nl"]);

const STOPWORDS: Record<string, string[]> = {
  fr: ["le", "la", "les", "de", "du", "des", "et", "pour", "une", "un", "avec", "dans", "sur", "votre", "notre", "à"],
  de: ["der", "die", "das", "und", "für", "mit", "ein", "eine", "von", "im", "auf", "ihre", "ihr", "zu"],
  it: ["il", "lo", "la", "gli", "le", "e", "per", "un", "una", "di", "con", "nel", "sulla", "tuo", "vostro"],
  en: ["the", "and", "for", "with", "of", "a", "to", "in", "on", "your", "our", "is", "are"],
};

function attribute(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : null;
}

function baseLang(value: string | null): string | null {
  if (!value) return null;
  const clean = value.trim().toLowerCase().replace(/_/g, "-");
  if (!/^(?:x-default|[a-z]{2,3}(?:-[a-z0-9]{2,8})*)$/.test(clean)) return null;
  const base = clean.split("-")[0];
  return KNOWN_BASE.has(base) ? base : null;
}

function detectTitleLang(title: string | null): string | null {
  if (!title) return null;
  const words = title.toLowerCase().match(/[a-zà-öø-ÿ]+/g) ?? [];
  const scores = Object.entries(STOPWORDS).map(([lang, list]) => {
    const set = new Set(list);
    return [lang, words.filter((word) => set.has(word)).length] as const;
  });
  const best = scores.sort((a, b) => b[1] - a[1])[0];
  return best && best[1] >= 2 ? best[0] : null;
}

function normalizeUrl(value: string, baseUrl: string): string | null {
  try {
    const url = new URL(value, baseUrl);
    return `${url.origin}${url.pathname.replace(/\/+$/, "") || "/"}`;
  } catch {
    return null;
  }
}

type Hreflang = { lang: string; href: string };

function parseHreflangs(html: string): Hreflang[] {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  return links
    .map((tag) => {
      const rel = attribute(tag, "rel");
      const hreflang = attribute(tag, "hreflang");
      const href = attribute(tag, "href");
      if (!rel || !rel.toLowerCase().split(/\s+/).includes("alternate")) return null;
      if (!hreflang || !href) return null;
      return { lang: hreflang.trim(), href };
    })
    .filter((item): item is Hreflang => Boolean(item));
}

function parseOgLocale(html: string): { locale: string | null; alternates: string[] } {
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  let locale: string | null = null;
  const alternates: string[] = [];
  for (const tag of metas) {
    const property = attribute(tag, "property")?.toLowerCase();
    const content = attribute(tag, "content");
    if (!property || !content) continue;
    if (property === "og:locale") locale = content.trim();
    if (property === "og:locale:alternate") alternates.push(content.trim());
  }
  return { locale, alternates };
}

function detectSwitcher(html: string, baseUrl: string, current: string | null): string[] {
  let origin = "";
  try {
    origin = new URL(baseUrl).origin;
  } catch {
    return [];
  }
  const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];
  const langs = new Set<string>();
  for (const anchor of anchors) {
    const openTag = anchor.match(/<a\b[^>]*>/i)?.[0] ?? "";
    const href = attribute(openTag, "href");
    if (!href || /^(?:#|mailto:|tel:|javascript:)/i.test(href)) continue;
    let url: URL;
    try {
      url = new URL(href, baseUrl);
    } catch {
      continue;
    }
    if (url.origin !== origin) continue;

    const pathMatch = url.pathname.match(/^\/(fr|de|it|en)(?:\/|$)/i);
    const queryMatch = url.search.match(/[?&](?:lang|locale)=([a-z]{2})(?:[-_][a-z]{2})?/i);
    const subdomainMatch = url.hostname.match(/^(fr|de|it|en)\./i);
    const lang = (pathMatch?.[1] ?? queryMatch?.[1] ?? subdomainMatch?.[1] ?? "").toLowerCase();
    if (lang && lang !== current) langs.add(lang.toUpperCase());
  }
  return [...langs].sort();
}

export function assessLang(page: ParsedPage, site: SiteResponse): CheckResult[] {
  const html = site.html;
  const declaredRaw = page.htmlLang;
  const declared = baseLang(declaredRaw);
  const hreflangs = parseHreflangs(html);
  const validHreflangs = hreflangs.filter((item) => baseLang(item.lang) || item.lang.toLowerCase() === "x-default");
  const hreflangLangs = [...new Set(validHreflangs.map((item) => item.lang.toUpperCase()))].sort();
  const xDefault = validHreflangs.some((item) => item.lang.toLowerCase() === "x-default");

  const canonicalNorm = page.canonical ? normalizeUrl(page.canonical, site.finalUrl) : null;
  const pageNorm = normalizeUrl(site.finalUrl, site.finalUrl);
  const selfReference = validHreflangs.some((item) => {
    const target = normalizeUrl(item.href, site.finalUrl);
    return Boolean(target && (target === pageNorm || target === canonicalNorm));
  });

  const { locale, alternates } = parseOgLocale(html);
  const ogBase = baseLang(locale);
  const switcher = detectSwitcher(html, site.finalUrl, declared);

  const htmlStatus: Status = declared ? "ok" : "warn";
  const htmlDetail = declared
    ? describe("lang.html.ok", { value: declaredRaw ?? "" })
    : describe("lang.html.invalid", { value: declaredRaw ?? "—" });

  const titleLang = detectTitleLang(page.title);
  const coherenceStatus: Status = !declared || !titleLang || titleLang === declared ? "ok" : "warn";
  const coherenceDetail = coherenceStatus === "ok"
    ? describe("lang.coherence.ok")
    : describe("lang.coherence.mismatch", { detected: titleLang ?? "—", declared: declared ?? "—" });

  const multilingual = validHreflangs.length > 0 || alternates.length > 0;
  const switcherStatus: Status = switcher.length > 0 || !multilingual ? "ok" : "warn";
  const switcherDetail = switcher.length > 0
    ? describe("lang.switcher.found", { langs: switcher.join(", ") })
    : describe("lang.switcher.absent");

  let hreflangStatus: Status = "ok";
  let hreflangDetail;
  if (validHreflangs.length === 0) {
    hreflangDetail = describe("lang.hreflang.absent");
  } else if (selfReference && xDefault) {
    hreflangDetail = describe("lang.hreflang.ok", { langs: hreflangLangs.join(", ") });
  } else {
    hreflangStatus = "warn";
    hreflangDetail = describe("lang.hreflang.partial", { langs: hreflangLangs.join(", ") });
  }

  let ogStatus: Status;
  let ogDetail;
  if (!locale) {
    ogStatus = "warn";
    ogDetail = describe("lang.og.absent");
  } else if (declared && ogBase && ogBase !== declared) {
    ogStatus = "warn";
    ogDetail = describe("lang.og.mismatch", { value: locale });
  } else {
    ogStatus = "ok";
    ogDetail = describe("lang.og.ok", { value: locale });
  }

  const contentLanguage = site.headers["content-language"] ?? null;
  const headerBase = contentLanguage ? baseLang(contentLanguage.split(",")[0]?.trim() ?? null) : null;
  let headerStatus: Status = "ok";
  let headerDetail;
  if (!contentLanguage) {
    headerDetail = describe("lang.header.absent");
  } else if (declared && headerBase && headerBase !== declared) {
    headerStatus = "warn";
    headerDetail = describe("lang.header.mismatch", { value: contentLanguage });
  } else {
    headerDetail = describe("lang.header.ok", { value: contentLanguage });
  }

  const checks: CheckResult[] = [
    { ...langChecks[0], status: htmlStatus, ...htmlDetail },
    { ...langChecks[1], status: coherenceStatus, ...coherenceDetail },
    { ...langChecks[2], status: switcherStatus, ...switcherDetail },
    { ...langChecks[3], status: hreflangStatus, ...hreflangDetail },
    { ...langChecks[4], status: ogStatus, ...ogDetail },
    { ...langChecks[5], status: headerStatus, ...headerDetail },
  ];
  return checks;
}
