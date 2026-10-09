import { articleUrl, articles } from "@/content/articles";
import { business } from "@/content/business";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const items = [...articles]
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, 20)
    .map(
      (a) => `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${articleUrl(a.slug)}</link>
      <guid isPermaLink="true">${articleUrl(a.slug)}</guid>
      <pubDate>${new Date(a.datePublished).toUTCString()}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog SebWebSwiss</title>
    <link>${business.url}/blog</link>
    <description>${escapeXml(
      "Conseils web, SEO et performance pour les entreprises de Suisse romande, publiés par Sébastien."
    )}</description>
    <language>fr-CH</language>
    <atom:link href="${business.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
