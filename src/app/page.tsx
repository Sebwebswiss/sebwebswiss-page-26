import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";
import { realisations } from "@/content/realisations";

export const metadata: Metadata = {
  title: "Agence web à Lausanne | Création de site internet & SEO",
  description: "SebWebSwiss : création de sites internet, référencement SEO et accompagnement technique pour les entreprises à Lausanne, Lutry et en Suisse romande.",
  alternates: { canonical: "/" },
  openGraph: { url: "https://sebwebswiss.ch/" },
};

const services = [
  ["01", "Création de sites web", "Des sites rapides, élégants et conçus pour convertir vos visiteurs en clients.", "/services/creation-site-internet-lausanne"],
  ["02", "E-commerce", "Des boutiques en ligne simples à gérer, sécurisées et prêtes à évoluer.", "/services/creation-site-internet-lausanne"],
  ["03", "Référencement SEO", "Une stratégie locale et durable pour gagner en visibilité sur Google.", "/services/referencement-seo-lausanne"],
  ["04", "Développement sur mesure", "Applications web, automatisations et intégrations adaptées à votre activité.", "/contact"],
];

const faqs = [
  ["Combien coûte la création d'un site web ?", "Chaque projet est différent. Après un premier échange, nous préparons une proposition claire selon vos objectifs, vos fonctionnalités et votre calendrier."],
  ["Travaillez-vous uniquement à Lausanne ?", "Nous sommes basés près de Lausanne et accompagnons des entreprises du canton de Vaud et de toute la Suisse romande."],
  ["Puis-je faire évoluer mon site plus tard ?", "Oui. Nous construisons des solutions évolutives et proposons des prestations de maintenance, d'hébergement et d'amélioration continue."],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: business.url,
    email: business.email,
    telephone: business.phone,
    image: "https://sebwebswiss.ch/og-image.png",
    priceRange: "CHF",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      postalCode: business.postalCode,
      addressLocality: business.locality,
      addressRegion: "Vaud",
      addressCountry: business.country,
    },
    areaServed: ["Lausanne", "Lutry", "Canton de Vaud", "Suisse romande"],
    sameAs: [business.social.facebook, business.social.youtube, business.social.tiktok],
  };

  return (
    <main>
      <JsonLd data={jsonLd} />
      <Header />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span /> SUR MESURE · LAUSANNE · SUISSE ROMANDE</p>
          <h1>Une agence web à Lausanne,<em> pensée pour faire grandir</em> votre entreprise.</h1>
          <p className="hero-lead">Création de site internet, e-commerce et référencement SEO pour les PME, indépendants et artisans de Lausanne, du canton de Vaud et de Suisse romande.</p>
          <div className="hero-actions">
            <a className="button primary" href="/contact">Demander un devis <span>↗</span></a>
            <a className="button ghost" href="/services">Découvrir nos services <span>↓</span></a>
          </div>
          <p className="location-line">Lausanne <b>·</b> Lutry <b>·</b> Canton de Vaud <b>·</b> Suisse romande</p>
        </div>
        <div className="hero-art" aria-label="Aperçu des expertises SebWebSwiss">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-panel panel-main"><span>SEBWEBSWISS</span><strong>Digital<br/>with intent.</strong><small>Web · SEO · E-commerce</small></div>
          <div className="hero-panel panel-note"><span>01 — 04</span><strong>Clarté<br/>Impact<br/>Croissance</strong></div>
          <div className="hero-panel panel-dot"><i /><i /><i /></div>
        </div>
      </section>

      <section className="marquee" aria-label="Expertises"><span>STRATÉGIE DIGITALE</span><b>✦</b><span>WEB DESIGN</span><b>✦</b><span>SEO LOCAL</span><b>✦</b><span>DÉVELOPPEMENT SUR MESURE</span><b>✦</b><span>E-COMMERCE</span></section>

      <section className="trust-bar" aria-label="Points clés"><span><strong>5 ans</strong> de projets web</span><span className="dot">·</span><span><strong>Projets internationaux</strong></span><span className="dot">·</span><span>Basé <strong>près de Lausanne</strong></span><span className="dot">·</span><span><strong>Contact direct</strong>, sans intermédiaire</span></section>

      <section className="intro section-grid" id="approche">
        <p className="section-kicker">01 — L&apos;AGENCE</p>
        <div>
          <h2>Un partenaire digital,<br/><em>pas une usine à sites.</em></h2>
          <p>En tant qu&apos;agence web à Lausanne, nous travaillons avec des indépendants, PME et entreprises qui cherchent plus qu&apos;un joli site : une présence digitale claire, crédible et utile pour leur développement.</p>
          <p>Chaque projet commence par vos objectifs. Ensuite, nous réunissons design, technologie et référencement pour créer une solution qui vous ressemble — et qui fonctionne vraiment.</p>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading"><p className="section-kicker">02 — EXPERTISES</p><h2>Ce que nous pouvons<br/><em>construire ensemble.</em></h2></div>
        <div className="service-list">
          {services.map(([number, title, description, href]) => <a className="service-card" key={number} href={href}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><b>↗</b></a>)}
        </div>
      </section>

      <section className="expertise" id="expertise">
        <div className="section-heading">
          <p className="section-kicker">03 — VOTRE PARTENAIRE DIGITAL</p>
          <div>
            <h2>Une expertise digitale pensée<br/><em>pour faire avancer votre activité.</em></h2>
            <p className="expertise-intro">SebWebSwiss accompagne les indépendants, PME et entreprises dans la création de leur présence digitale à Lausanne, dans le canton de Vaud et partout en Suisse romande.</p>
          </div>
        </div>
        <div className="expertise-grid">
          <article><span>01</span><h3>Un site qui inspire confiance</h3><p>Un site internet professionnel, rapide et adapté à votre activité pour présenter clairement votre offre et générer des demandes de contact.</p></article>
          <article><span>02</span><h3>Une visibilité locale durable</h3><p>Une stratégie de référencement SEO pensée pour aider votre entreprise à être trouvée sur Google à Lausanne, dans le canton de Vaud et en Suisse romande.</p></article>
          <article><span>03</span><h3>Une expérience simple à utiliser</h3><p>Design responsive, navigation claire et contenu utile : tout est conçu pour que vos visiteurs trouvent rapidement ce qu&apos;ils cherchent.</p></article>
          <article><span>04</span><h3>Une solution prête à évoluer</h3><p>Votre site peut évoluer avec vos besoins : nouvelles pages, e-commerce, fonctionnalités sur mesure, maintenance et optimisation continue.</p></article>
        </div>
        <div className="coverage"><p>Zones accompagnées</p><div><span>Lausanne</span><span>Lutry</span><span>Vaud</span><span>Suisse romande</span></div></div>
      </section>

      <section className="content-section">
        <div className="content-label">Réalisations · International</div>
        <div>
          <h2>Une expérience<br/><em>construite sur des projets réels.</em></h2>
          <p>Mon expertise technique s’appuie sur cinq années de projets web, notamment à l’international. Aujourd’hui basé près de Lausanne, je mets cette expérience au service des entreprises de Suisse romande.</p>
          <a className="text-link" href="/realisations">Voir mes réalisations ↗</a>
        </div>
      </section>

      <section className="process">
        <p className="section-kicker">04 — MÉTHODE</p>
        <h2>Une méthode simple.<br/><em>Des décisions solides.</em></h2>
        <div className="process-steps"><div><span>01</span><h3>Comprendre</h3><p>Vos objectifs, votre activité et vos clients.</p></div><div><span>02</span><h3>Concevoir</h3><p>Une direction claire, utile et distinctive.</p></div><div><span>03</span><h3>Développer</h3><p>Une expérience rapide, fiable et évolutive.</p></div><div><span>04</span><h3>Faire grandir</h3><p>SEO, optimisation et accompagnement continu.</p></div></div>
      </section>

<section className="realisations-showcase">
        <div className="section-heading">
          <p className="section-kicker">05 — RÉALISATIONS</p>
          <h2>Des projets réels,<br/><em>menés de bout en bout.</em></h2>
        </div>
        <div className="service-list">
          {realisations.map(([n, name,, desc, href]) => <a className="service-card" key={n} href={href}><span>{n}</span><div><h3>{name}</h3><p>{desc}</p></div><b>↗</b></a>)}
        </div>
        <div className="showcase-cta"><a className="button primary" href="/realisations">Voir toutes les réalisations <span>↗</span></a></div>
      </section>

      <section className="faq">
        <div><p className="section-kicker">06 — QUESTIONS</p><h2>Vous avez un projet ?<br/><em>Commençons simplement.</em></h2></div>
        <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="contact" id="contact">
        <p className="section-kicker">07 — CONTACT</p>
        <h2>Construisons quelque chose<br/><em>qui compte vraiment.</em></h2>
        <p>Décrivez-nous votre projet. Nous vous répondrons avec une approche claire et adaptée à votre entreprise.</p>
        <a className="contact-email" href={`mailto:${business.email}`}>{business.email}<span>↗</span></a>
        <div className="contact-bottom"><span>{business.locality} · {business.region}</span><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phoneDisplay}</a></div>
      </section>

      <footer><Link href="/" className="brand">Seb<span>Web</span>Swiss<i>.</i></Link><p>© {new Date().getFullYear()} SebWebSwiss. Tous droits réservés.</p><div><Link href="/realisations">Réalisations</Link><Link href="/blog">Blog</Link><Link href="/offre-lancement">Offre</Link><a href={business.social.facebook} target="_blank" rel="noreferrer">Facebook</a><a href={business.social.youtube} target="_blank" rel="noreferrer">YouTube</a><a href={business.social.tiktok} target="_blank" rel="noreferrer">TikTok</a></div></footer>
    </main>
  );
}
