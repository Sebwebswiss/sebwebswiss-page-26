import type { CheckResult } from "@/content/audit/checks";
import { techChecks } from "@/content/audit/checks";
import { describe, type DetailKey } from "@/content/audit/checkTranslations";
import type { ParsedPage } from "./parsers";
import { isRobotsBlockingIndex } from "./parsers";
import type { SiteResponse } from "./fetchSite";

function statusFrom(ok: boolean, warn: boolean): "ok" | "warn" | "fail" {
  return ok ? "ok" : warn ? "warn" : "fail";
}

function langStatus(lang: string | null): { ok: boolean; warn: boolean } {
  if (!lang) return { ok: false, warn: false };
  try {
    new Intl.Locale(lang);
    return { ok: true, warn: false };
  } catch {
    return { ok: false, warn: true };
  }
}

export function assessTech(page: ParsedPage, site: SiteResponse): CheckResult[] {
  const results: CheckResult[] = [];
  const byId = (id: string) => techChecks.find((c) => c.id === id)!;

  const titleOk = page.titleLength >= 30 && page.titleLength <= 60;
  const titleWarn = page.titleLength > 0 && !titleOk;
  results.push({
    ...byId("title"),
    status: statusFrom(titleOk, titleWarn),
    ...describe(page.title ? "title.present" : "title.absent", { length: page.titleLength, title: page.title?.slice(0, 60) ?? "" }),
  });

  const descOk = page.metaDescriptionLength >= 70 && page.metaDescriptionLength <= 160;
  const descWarn = page.metaDescriptionLength > 0 && !descOk;
  results.push({
    ...byId("meta-description"),
    status: statusFrom(descOk, descWarn),
    ...describe(page.metaDescription ? "description.present" : "description.absent", { length: page.metaDescriptionLength }),
  });

  const h1Ok = page.h1Count === 1;
  const h1Warn = page.h1Count > 1;
  results.push({
    ...byId("h1"),
    status: statusFrom(h1Ok, h1Warn),
    ...describe("h1", { count: page.h1Count }),
  });

  const canonicalOk = Boolean(page.canonical);
  results.push({
    ...byId("canonical"),
    status: statusFrom(canonicalOk, false),
    ...describe(page.canonical ? "canonical.present" : "canonical.absent", { value: page.canonical ?? "" }),
  });

  const robotsHeader = site.headers["x-robots-tag"];
  const robotsBlocked = isRobotsBlockingIndex(page.robotsMeta) || isRobotsBlockingIndex(robotsHeader ?? null);
  const robotsOk = Boolean(page.robotsMeta) && !robotsBlocked;
  const robotsNotes: DetailKey[] = [];
  if (page.robotsMeta) robotsNotes.push("robots.meta");
  if (robotsHeader) robotsNotes.push("robots.header");
  if (robotsBlocked) robotsNotes.push("robots.blocked");
  results.push({
    ...byId("robots"),
    status: robotsBlocked ? "fail" : robotsOk ? "ok" : "warn",
    ...describe(page.robotsMeta || robotsHeader ? "robots.checked" : "robots.absent", { meta: page.robotsMeta ?? "", header: robotsHeader ?? "" }, robotsNotes),
  });

  const ogOk = page.ogCount >= 4;
  const ogWarn = page.ogCount >= 1;
  results.push({
    ...byId("og"),
    status: statusFrom(ogOk, ogWarn),
    ...describe("og", { count: page.ogCount }),
  });

  const viewOk = page.viewport;
  results.push({
    ...byId("viewport"),
    status: statusFrom(viewOk, false),
    ...describe(viewOk ? "viewport.present" : "viewport.absent"),
  });

  const { ok: langOk, warn: langWarn } = langStatus(page.htmlLang);
  results.push({
    ...byId("lang"),
    status: statusFrom(langOk, langWarn),
    ...describe(page.htmlLang ? "lang.present" : "lang.absent", { value: page.htmlLang ?? "" }),
  });

  const hasJsonLd = page.jsonLd.length > 0;
  const invalidJsonLd = page.invalidJsonLdCount ?? 0;
  results.push({
    ...byId("schema"),
    status: statusFrom(hasJsonLd && !invalidJsonLd, hasJsonLd),
    ...describe(hasJsonLd ? "schema.present" : "schema.absent", { count: page.jsonLd.length, invalid: invalidJsonLd }, invalidJsonLd ? ["schema.invalid"] : []),
  });

  const httpsOk = site.finalUrl.startsWith("https://");
  const redirected = site.finalUrl !== site.url;
  results.push({
    ...byId("https"),
    status: httpsOk ? "ok" : "fail",
    ...describe("https", { protocol: new URL(site.finalUrl).protocol, url: site.finalUrl }, redirected ? ["redirect"] : []),
  });

  const responseOk = site.status >= 200 && site.status < 300;
  const responseWarn = site.status >= 300 && site.status < 400;
  results.push({
    ...byId("response"),
    status: responseOk ? "ok" : responseWarn ? "warn" : "fail",
    ...describe("response", { status: site.status, time: site.timeMs }),
  });

  return results;
}
