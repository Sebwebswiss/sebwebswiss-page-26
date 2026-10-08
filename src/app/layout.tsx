import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { RouteTracker } from "@/components/RouteTracker";
import { ConsentBar } from "@/components/ConsentBar";
import { EventTracker } from "@/components/EventTracker";
import { business } from "@/content/business";
import { openGraphDefaults } from "@/content/metadata";
import { GA_ID } from "@/lib/ga";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "optional" });
const serif = Playfair_Display({ variable: "--font-display", subsets: ["latin"], display: "optional" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sebwebswiss.ch"),
  title: {
    default: "SebWebSwiss | Agence web en Suisse romande",
    template: "%s | SebWebSwiss",
  },
  description: "Sites web performants, e-commerce, référencement SEO et développement sur mesure pour les entreprises de Suisse romande.",
  openGraph: {
    ...openGraphDefaults,
    title: "SebWebSwiss | Agence web à Lausanne",
    description: "Création de sites internet, référencement SEO et solutions digitales sur mesure à Lausanne et en Suisse romande.",
  },
  facebook: {
    appId: "39490314557233919",
  },
  twitter: { card: "summary_large_image", site: "@SebWebSwiss", images: ["/og-image.png"] },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window['ga-disable-${GA_ID}']=true;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());`,
          }}
        />
        <RouteTracker />
        <ConsentBar />
        <EventTracker />
        {children}
      </body>
    </html>
  );
}
