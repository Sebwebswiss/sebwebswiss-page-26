import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Playfair_Display({ variable: "--font-display", subsets: ["latin"] });

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
  },
  twitter: { card: "summary", title: "SebWebSwiss | Agence web à Lausanne", description: "Création de sites internet, SEO et solutions digitales sur mesure." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
