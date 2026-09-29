import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { articles } from "@/content/articles";

const paths = [
  "",
  "/services",
  "/services/creation-site-internet-lausanne",
  "/services/referencement-seo-lausanne",
  "/services/consultant-seo-lausanne",
  "/services/audit-seo",
  "/services/refonte-site-internet",
  "/services/hebergement-maintenance-web",
  "/a-propos",
  "/methode",
  "/contact",
  "/realisations",
  "/realisations/hexapower-solutions",
  "/realisations/metropolis-grad-rijeka",
  "/realisations/base-line",
  "/offre-lancement",
  "/check-up-site-web",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${business.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${business.url}/blog/${a.slug}`,
    lastModified: new Date(a.dateModified),
    changeFrequency: "monthly" as const,
  }));

  return [...pages, ...articlePages];
}