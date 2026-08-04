import type { MetadataRoute } from "next";
const baseUrl = "https://sebwebswiss.ch";
const paths = ["", "/services", "/services/creation-site-internet-lausanne", "/services/referencement-seo-lausanne", "/services/consultant-seo-lausanne", "/services/audit-seo", "/services/refonte-site-internet", "/services/hebergement-maintenance-web", "/a-propos", "/methode", "/contact"];
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly" }));
}
