import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { AuditTool } from "@/components/audit/AuditTool";

export const metadata: Metadata = {
  title: "Check-up site web gratuit en Suisse | Audit SEO & visibilité locale",
  description:
    "Analysez gratuitement les principaux points techniques et locaux de votre site en moins d’une minute : SEO, visibilité locale et données structurées.",
  alternates: { canonical: "/check-up-site-web" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/check-up-site-web" },
};

const faqs = [
  ["Que vérifie exactement ce check-up ?", "Il analyse les points techniques essentiels (HTTPS, balises, indexation, données structurées) et les informations locales visibles sur votre page d’accueil : nom, téléphone, adresse, localité, horaires."],
  ["Est-ce un audit SEO complet ?", "Non — c’est un contrôle rapide et gratuit, axé sur les bases techniques et locales. Pour une analyse approfondie, un audit manuel est nécessaire."],
  ["Comment améliorer mon score ?", "Les 3 priorités affichées au résultat vous indiquent quoi corriger en premier, classées par impact et par effort. La plupart se règlent en quelques minutes sur votre CMS."],
  ["Le résultat est-il confidentiel ?", "Votre score et vos recommandations sont accessibles uniquement via votre lien de partage, que vous choisissez de diffuser ou non. Nous ne publions jamais le résultat d’un site tiers."],
  ["Qui a droit au rapport complet ?", "En laissant votre e-mail (avec consentement), vous recevez le rapport détaillé par e-mail, avec toutes les vérifications et recommandations."],
];

export default function Page() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Check-up site web gratuit Suisse",
    applicationCategory: "WebApplication",
    url: "https://sebwebswiss.ch/check-up-site-web",
    description:
      "Analyse automatique des points techniques et locaux essentiels d’un site web, adaptée au contexte suisse (SEO, visibilité locale, données structurées).",
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
      <main>
        <JsonLd data={appSchema} />
        <section className="audit-hero">
          <Breadcrumbs items={[{ label: "Check-up site web" }]} />
          <p className="eyebrow"><span /> CHECK-UP GRATUIT · SUISSE</p>
          <h1>Votre site est-il vraiment<br /><em>prêt à attirer des clients ?</em></h1>
          <p className="hero-lead">
            Analysez gratuitement les principaux points techniques et locaux de votre site en moins d’une minute.
            Vous obtenez un score clair et vos 3 priorités d’action.
          </p>
        </section>

        <AuditTool />

        <section className="audit-feature-grid">
          <article><p className="section-kicker">A · TECHNIQUE</p><h2>Les bases techniques<br /><em>de votre site.</em></h2><p>Sécurité HTTPS, balises, indexation, données structurées et compatibilité mobile.</p></article>
          <article><p className="section-kicker">B · LOCAL</p><h2>Vos informations<br /><em>locales sur le site.</em></h2><p>Nom, téléphone, adresse, localité, horaires et cohérence des informations locales visibles.</p></article>
          <article><p className="section-kicker">À VENIR</p><h2>Confidentialité, langues<br /><em>et visibilité IA.</em></h2><p>Les modules nDSG, multilinguisme et visibilité IA arrivent prochainement.</p></article>
        </section>

        <section className="faq">
          <div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un check-up clair,<br /><em>sans jargon.</em></h2></div>
          <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        </section>

        <section className="soft-cta"><p>Besoin d’aide pour corriger ces points ?</p><a className="button primary" href="/contact">Réserver un appel gratuit <span>↗</span></a></section>
      </main>
    </>
  );
}