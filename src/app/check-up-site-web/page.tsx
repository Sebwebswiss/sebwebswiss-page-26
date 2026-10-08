import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { AuditPageContent } from "@/components/audit/AuditPageContent";

export const metadata: Metadata = {
  title: { absolute: "Check-up site web gratuit | SEO & visibilité locale" },
  description:
    "Analysez gratuitement les points techniques, locaux et de visibilité IA de votre site en moins d’une minute : SEO, indexation et données structurées.",
  alternates: { canonical: "/check-up-site-web" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/check-up-site-web" },
};

export default function Page() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Check-up site web gratuit Suisse",
    applicationCategory: "WebApplication",
    url: "https://sebwebswiss.ch/check-up-site-web",
    description:
      "Analyse automatique des points techniques, locaux et de préparation à la visibilité IA d’un site web, adaptée au contexte suisse (SEO, visibilité locale, données structurées, accès des robots de recherche).",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
    inLanguage: "fr",
    operatingSystem: "Tout navigateur",
    browserRequirements: "Nécessite JavaScript",
  };

  return (
    <>
      <Header />
      <JsonLd data={appSchema} />
      <AuditPageContent />
      <Footer />
    </>
  );
}
