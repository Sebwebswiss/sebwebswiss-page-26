import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { AuditPageContent } from "@/components/audit/AuditPageContent";

export const metadata: Metadata = {
  title: { absolute: "Check-up site web gratuit | SEO, local et nDSG" },
  description:
    "Analysez gratuitement les points techniques, locaux, de visibilité IA et de conformité nDSG de votre site en moins d’une minute : SEO, indexation, confidentialité.",
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
      "Analyse automatique des points techniques, locaux, de préparation à la visibilité IA et des signaux de conformité nDSG d’un site web, adaptée au contexte suisse (SEO, visibilité locale, données structurées, accès des robots de recherche, politique de confidentialité, consentement).",
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
