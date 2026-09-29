export type ParsedPage = {
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  canonical: string | null;
  robotsMeta: string | null;
  viewport: boolean;
  htmlLang: string | null;
  ogCount: number;
  twitterCount: number;
  jsonLd: string[];
  links: string[];
  text: string;
};

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ");

function matchContent(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? (m[1] ?? "").trim() : null;
}

export function parsePage(html: string): ParsedPage {
  const lower = html.toLowerCase();

  const title = matchContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleClean = title ? decodeEntities(title.replace(/\s+/g, " ").trim()) : null;

  const metaDescription =
    matchContent(
      html,
      /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
    ) ??
    matchContent(
      html,
      /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i
    );

  const canonical =
    matchContent(
      html,
      /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i
    ) ??
    matchContent(
      html,
      /<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i
    );

  const robotsMeta =
    matchContent(
      html,
      /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i
    ) ??
    matchContent(
      html,
      /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']robots["'][^>]*>/i
    );

  const htmlLang = matchContent(html, /<html[^>]*lang=["']([^"']+)["']/i);

  const viewport = /<meta[^>]+name=["']viewport["']/i.test(lower);

  const ogCount = (html.match(/property=["']og:[a-zA-Z0-9_:]+["']/gi) ?? []).length;
  const twitterCount = (html.match(/name=["']twitter:[a-zA-Z0-9_:]+["']/gi) ?? []).length;

  const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) ?? [];
  const h2s = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) ?? [];
  const h3s = html.match(/<h3[^>]*>[\s\S]*?<\/h3>/gi) ?? [];

  const jsonLdRaw =
    html.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) ?? [];
  const jsonLd = jsonLdRaw
    .map((b) => b.replace(/<script[^>]*>/i, "").replace(/<\/script>/gi, "").trim())
    .filter(Boolean);

  const links = Array.from(html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi))
    .map((m) => m[1])
    .filter(Boolean);

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: titleClean,
    titleLength: titleClean ? titleClean.length : 0,
    metaDescription,
    metaDescriptionLength: metaDescription ? metaDescription.length : 0,
    h1Count: h1s.length,
    h2Count: h2s.length,
    h3Count: h3s.length,
    canonical,
    robotsMeta,
    viewport,
    htmlLang,
    ogCount,
    twitterCount,
    jsonLd,
    links,
    text,
  };
}

export function isRobotsBlockingIndex(robotsMeta: string | null): boolean {
  if (!robotsMeta) return false;
  return /noindex/i.test(robotsMeta);
}