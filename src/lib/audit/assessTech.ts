import type { CheckResult } from "@/content/audit/checks";
import { techChecks } from "@/content/audit/checks";
import type { ParsedPage } from "./parsers";
import { isRobotsBlockingIndex } from "./parsers";
import type { SiteResponse } from "./fetchSite";

function statusFrom(ok: boolean, warn: boolean): "ok" | "warn" | "fail" {
  return ok ? "ok" : warn ? "warn" : "fail";
}

function langStatus(lang: string | null): { ok: boolean; warn: boolean } {
  if (!lang) return { ok: false, warn: false };
  return { ok: lang.length === 2, warn: lang.length !== 2 };
}

export function assessTech(page: ParsedPage, site: SiteResponse): CheckResult[] {
  const results: CheckResult[] = [];
  const byId = (id: string) => techChecks.find((c) => c.id === id)!;

  const titleOk = page.titleLength >= 30 && page.titleLength <= 60;
  const titleWarn = page.titleLength > 0 && !titleOk;
  results.push({
    ...byId("title"),
    status: statusFrom(titleOk, titleWarn),
    detail: page.title
      ? `Longueur : ${page.titleLength} caractères — « ${page.title.slice(0, 60)} »`
      : "Balise <title> absente.",
  });

  const descOk = page.metaDescriptionLength >= 70 && page.metaDescriptionLength <= 160;
  const descWarn = page.metaDescriptionLength > 0 && !descOk;
  results.push({
    ...byId("meta-description"),
    status: statusFrom(descOk, descWarn),
    detail: page.metaDescription
      ? `Longueur : ${page.metaDescriptionLength} caractères.`
      : "Meta description absente.",
  });

  const h1Ok = page.h1Count === 1;
  const h1Warn = page.h1Count > 1;
  results.push({
    ...byId("h1"),
    status: statusFrom(h1Ok, h1Warn),
    detail: `Balises H1 trouvées : ${page.h1Count}.`,
  });

  const canonicalOk = Boolean(page.canonical);
  results.push({
    ...byId("canonical"),
    status: statusFrom(canonicalOk, false),
    detail: page.canonical ?? "Balise canonical absente.",
  });

  const robotsBlocked = isRobotsBlockingIndex(page.robotsMeta);
  const robotsOk = Boolean(page.robotsMeta) && !robotsBlocked;
  results.push({
    ...byId("robots"),
    status: robotsBlocked ? "fail" : robotsOk ? "ok" : "warn",
    detail: page.robotsMeta
      ? `Balise robots : ${page.robotsMeta}${robotsBlocked ? " (indexation bloquée)" : ""}`
      : "Aucune balise robots détectée (l’indexation n’est pas bloquée).",
  });

  const ogOk = page.ogCount >= 4;
  const ogWarn = page.ogCount >= 1;
  results.push({
    ...byId("og"),
    status: statusFrom(ogOk, ogWarn),
    detail: `Balises Open Graph détectées : ${page.ogCount}.`,
  });

  const viewOk = page.viewport;
  results.push({
    ...byId("viewport"),
    status: statusFrom(viewOk, false),
    detail: viewOk ? "Balise viewport présente." : "Balise viewport absente (compatibilité mobile).",
  });

  const { ok: langOk, warn: langWarn } = langStatus(page.htmlLang);
  results.push({
    ...byId("lang"),
    status: statusFrom(langOk, langWarn),
    detail: page.htmlLang
      ? `Langue déclarée : ${page.htmlLang}.`
      : "Attribut lang absent sur la balise <html>.",
  });

  const hasJsonLd = page.jsonLd.length > 0;
  results.push({
    ...byId("schema"),
    status: statusFrom(hasJsonLd, false),
    detail: hasJsonLd
      ? `Blocs JSON-LD trouvés : ${page.jsonLd.length}.`
      : "Aucune donnée structurée JSON-LD détectée.",
  });

  const httpsOk = site.url.startsWith("https://");
  const redirectWarn = site.finalUrl !== site.url;
  results.push({
    ...byId("https"),
    status: httpsOk ? "ok" : "fail",
    detail: `Protocole : ${new URL(site.finalUrl).protocol}// ${redirectWarn ? "(redirigé vers " + site.finalUrl + ")" : ""}`,
  });

  const responseOk = site.status >= 200 && site.status < 300;
  const responseWarn = site.status >= 300 && site.status < 400;
  results.push({
    ...byId("response"),
    status: responseOk ? "ok" : responseWarn ? "warn" : "fail",
    detail: `Code HTTP : ${site.status} · Temps : ${site.timeMs} ms`,
  });

  return results;
}