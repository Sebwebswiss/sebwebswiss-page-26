import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "block" });
const serif = Playfair_Display({ variable: "--font-display", subsets: ["latin"], display: "block" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sebwebswiss.ch"),
  title: {
    default: "SebWebSwiss | Agence web en Suisse romande",
    template: "%s | SebWebSwiss",
  },
  description: "Sites web performants, e-commerce, référencement SEO et développement sur mesure pour les entreprises de Suisse romande.",
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: "SebWebSwiss",
    title: "SebWebSwiss | Agence web à Lausanne",
    description: "Création de sites internet, référencement SEO et solutions digitales sur mesure à Lausanne et en Suisse romande.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SebWebSwiss — Agence web à Lausanne" }],
  },
  twitter: { card: "summary_large_image", title: "SebWebSwiss | Agence web à Lausanne", description: "Création de sites internet, SEO et solutions digitales sur mesure.", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sebwebswiss.ch/#organization",
    name: business.name,
    url: business.url,
    logo: "https://sebwebswiss.ch/og-image.png",
    image: "https://sebwebswiss.ch/og-image.png",
    email: business.email,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      postalCode: business.postalCode,
      addressLocality: business.locality,
      addressCountry: business.country,
    },
    sameAs: [business.social.facebook, business.social.youtube, business.social.tiktok],
  };
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
