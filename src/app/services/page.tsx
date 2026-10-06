import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services web et SEO à Lausanne",
  description: "Création de sites internet, référencement SEO, refonte, audit et maintenance pour les entreprises de Lausanne, Lutry et de Suisse romande.",
  alternates: { canonical: "/services" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/services" },
};

const cards = [
  ["01", "Création de site internet à Lausanne", "Un site sur mesure, rapide et conçu pour soutenir vos objectifs commerciaux.", "/services/creation-site-internet-lausanne"],
  ["02", "Référencement SEO à Lausanne", "Un plan clair pour améliorer votre visibilité organique de façon durable.", "/services/referencement-seo-lausanne"],
  ["03", "Consultant SEO", "Un accompagnement stratégique pour prioriser les bonnes actions.", "/services/consultant-seo-lausanne"],
  ["04", "Audit SEO", "Une analyse structurée de votre visibilité, de votre technique et de vos priorités.", "/services/audit-seo"],
  ["05", "Refonte de site internet", "Repenser un site devenu lent, confus ou insuffisant pour vos objectifs.", "/services/refonte-site-internet"],
  ["06", "Hébergement web géré & maintenance", "Une option de suivi technique, sauvegardes et hébergement après la mise en ligne.", "/services/hebergement-maintenance-web"],
];

export default function Services() {
  return <><Header /><main>
    <PageHero
      kicker="SERVICES · LAUSANNE · SUISSE ROMANDE"
      crumbs={[{ label: "Services" }]}
      title={<>Des services web et SEO<br /><em>pensés pour avancer.</em></>}
      intro="Nous aidons les PME, indépendants et artisans de Suisse romande à construire une présence digitale plus claire, plus rapide et plus utile pour leurs clients."
      primary={{ label: "Parler de votre projet", href: "/contact" }}
    />
    <section className="content-section"><div className="content-label">NOS PRESTATIONS</div><div>
      <h2>Création de sites, SEO<br /><em>et accompagnement technique.</em></h2>
      <p>Une agence web à Lausanne pour les entreprises qui veulent un site professionnel, une visibilité durable sur Google et un interlocuteur direct. Chaque service peut être combiné selon vos besoins et votre calendrier.</p>
      <ul className="check-list"><li>Des sites vitrines et des projets sur mesure, performants dès le départ</li><li>Un référencement SEO local axé sur Lausanne, le canton de Vaud et la Suisse romande</li><li>Un suivi clair, sans intermédiaire, basé sur des données réelles</li></ul>
      <p>Vous partez de zéro ? Découvrez comment nous menons la <a className="text-link" href="/services/creation-site-internet-lausanne">création de votre site internet à Lausanne</a>, de la structure à la mise en ligne. Vous avez déjà un site ? Notre approche du <a className="text-link" href="/services/referencement-seo-lausanne">référencement SEO à Lausanne</a> vous aide à gagner en visibilité organique.</p>
    </div></section>
    <section className="content-section"><div className="content-label">NOTRE ZONE</div><div>
      <h2>Une agence web à Lausanne,<br /><em>au service de la Suisse romande.</em></h2>
      <p>Nous accompagnons les entreprises de Lausanne, de Lutry, du canton de Vaud et de la Suisse romande : création de sites internet, référencement SEO et développement web sur mesure.</p>
      <a className="text-link" href="/contact">Discuter de votre projet ↗</a>
    </div></section>
    <section className="services service-page-list">{cards.map(([n, t, d, h]) => <ServiceCard key={n} number={n} title={t} text={d} href={h} />)}</section>
  </main><Footer /></>;
}