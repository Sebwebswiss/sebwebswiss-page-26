export type ParsedPage = {
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  questionHeadingCount?: number;
  detailsCount?: number;
  canonical: string | null;
  robotsMeta: string | null;
  viewport: boolean;
  htmlLang: string | null;
  ogCount: number;
  twitterCount: number;
  jsonLd: string[];
  invalidJsonLdCount?: number;
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
    .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (entity, hex: string | undefined, decimal: string | undefined) => {
      const code = hex ? parseInt(hex, 16) : Number(decimal);
      return code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
    })
    .replace(/&nbsp;/g, " ");

function attribute(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? decodeEntities(match[1] ?? match[2] ?? match[3]) : null;
}

const tagAttributes = String.raw`(?:[^"'<>]|"[^"]*"|'[^']*')*`;

function openingTags(markup: string, name: string): string[] {
  return markup.match(new RegExp(`<${name}\\b${tagAttributes}>`, "gi")) ?? [];
}

function elements(markup: string, name: string): string[] {
  return markup.match(new RegExp(`<${name}\\b${tagAttributes}>[\\s\\S]*?<\\/${name}>`, "gi")) ?? [];
}

export function parsePage(html: string): ParsedPage {
  // Script payloads and comments are not rendered page metadata or headings.
  const document = html.replace(/<!--[\s\S]*?-->/g, "");
  const markup = document.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ");
  const metas = openingTags(markup, "meta");
  const metaContent = (name: string) => {
    const tag = metas.find(tag => attribute(tag, "name")?.toLowerCase() === name);
    return tag ? attribute(tag, "content") : null;
  };

  const titleBlock = elements(markup, "title")[0];
  const title = titleBlock ? titleBlock.slice(openingTags(titleBlock, "title")[0].length).replace(/<\/title>$/i, "").trim() : null;
  const titleClean = title ? decodeEntities(title.replace(/\s+/g, " ").trim()) : null;

  const metaDescription = metaContent("description");

  const canonicalTag = openingTags(markup, "link")
    .find(tag => attribute(tag, "rel")?.toLowerCase().split(/\s+/).includes("canonical"));
  const canonical = canonicalTag ? attribute(canonicalTag, "href") : null;

  const robotsMeta = [metaContent("robots"), metaContent("googlebot")].filter(Boolean).join(", ") || null;

  const htmlTag = openingTags(markup, "html")[0];
  const htmlLang = htmlTag ? attribute(htmlTag, "lang") : null;

  const viewport = metas.some(tag => attribute(tag, "name")?.toLowerCase() === "viewport");

  const ogCount = metas.filter(tag => attribute(tag, "property")?.startsWith("og:")).length;
  const twitterCount = metas.filter(tag => attribute(tag, "name")?.startsWith("twitter:")).length;

  const h1s = elements(markup, "h1");
  const h2s = elements(markup, "h2");
  const h3s = elements(markup, "h3");

  const jsonLdRaw = elements(document, "script")
    .filter(block => attribute(openingTags(block, "script")[0], "type")?.split(";")[0].trim().toLowerCase() === "application/ld+json");
  const jsonLdBlocks = jsonLdRaw
    .map((b) => b.slice(openingTags(b, "script")[0].length).replace(/<\/script>$/i, "").trim())
    .filter(Boolean);
  const jsonLd = jsonLdBlocks.filter(block => {
    try {
      const value: unknown = JSON.parse(block);
      return value !== null && typeof value === "object";
    } catch {
      return false;
    }
  });

  const links = openingTags(markup, "a")
    .map(tag => attribute(tag, "href"))
    .filter((link): link is string => Boolean(link));

  const text = decodeEntities(markup
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "))
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
    questionHeadingCount: [...h1s, ...h2s, ...h3s].filter(heading => decodeEntities(heading.replace(/<[^>]*>/g, " ")).includes("?")).length,
    detailsCount: (markup.match(/<details\b/gi) ?? []).length,
    canonical,
    robotsMeta,
    viewport,
    htmlLang,
    ogCount,
    twitterCount,
    jsonLd,
    invalidJsonLdCount: jsonLdBlocks.length - jsonLd.length,
    links,
    text,
  };
}

export function isRobotsBlockingIndex(robotsMeta: string | null): boolean {
  if (!robotsMeta) return false;
  return /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(robotsMeta);
}

function* schemaObjects(blocks: string[]): Generator<Record<string, unknown>> {
  for (const block of blocks) {
    let root: unknown;
    try { root = JSON.parse(block); } catch { continue; }
    const pending: unknown[] = [root];
    while (pending.length) {
      const node = pending.pop();
      if (!node || typeof node !== "object") continue;
      if (Array.isArray(node)) {
        for (const child of node) pending.push(child);
        continue;
      }
      const object = node as Record<string, unknown>;
      yield object;
      for (const value of Object.values(object)) if (value && typeof value === "object") pending.push(value);
    }
  }
}

export function hasSchemaType(blocks: string[], types: string[]): boolean {
  const wanted = new Set(types.map(type => type.toLowerCase()));
  for (const object of schemaObjects(blocks)) {
    const values = Array.isArray(object["@type"]) ? object["@type"] : [object["@type"]];
    if (values.some(value => typeof value === "string" && wanted.has((value.split(/[\/#:]/).pop() ?? "").toLowerCase()))) return true;
  }
  return false;
}

export function hasSchemaProperty(blocks: string[], key: string): boolean {
  for (const object of schemaObjects(blocks)) if (Object.hasOwn(object, key)) return true;
  return false;
}
