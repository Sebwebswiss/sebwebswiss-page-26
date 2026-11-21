import type { Metadata } from "next";
import Link from "next/link";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";
import { realisations } from "@/content/realisations";

export const metadata: Metadata = {
  title: "Création de site internet à Lausanne",
  description: "Création de site internet et de site web à Lausanne : sites vitrines, refonte, performance, bases SEO et accompagnement après la mise en ligne.",
  alternates: { canonical: "/services/creation-site-internet-lausanne" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/services/creation-site-internet-lausanne" },
};

const faqs = [
  ["Combien coûte la création d’un site internet ?", "Chaque projet est différent. Le devis dépend notamment des objectifs, du nombre de pages, des contenus, des fonctionnalités et du niveau d’accompagnement souhaité. Nous clarifions le périmètre avant de proposer une solution."],
  ["Mon site sera-t-il adapté aux mobiles ?", "Oui. La navigation, les contenus et les appels à l’action sont pensés pour les écrans mobiles dès le départ, puis vérifiés avant la mise en ligne."],
  ["Le référencement est-il inclus ?", "Le site est construit avec des bases SEO solides : structure des pages, titres, performances, liens internes, indexation et sitemap. Une stratégie SEO continue peut être mise en place séparément selon vos objectifs."],
  ["Dois-je prendre votre hébergement ?", "Non. Vous restez libre de conserver votre hébergement actuel. Si vous le souhaitez, SebWebSwiss peut gérer l’hébergement, les sauvegardes et le suivi technique après la mise en ligne."],
  ["Puis-je faire évoluer mon site plus tard ?", "Oui. Nous privilégions une structure claire et des solutions adaptées à l’évolution de votre activité, afin d’ajouter des pages, des contenus ou des fonctionnalités de manière cohérente."],
  ["Combien coûte un site web à Lausanne ?", "Un site vitrine de 5 à 7 pages commence à 399 CHF. Le devis final dépend des pages, des contenus, des fonctionnalités et de l’accompagnement souhaité ; une boutique en ligne démarre à 1 290 CHF."],
  ["Combien de temps faut-il pour créer un site internet ?", "Quelques semaines pour un site vitrine dont les contenus sont prêts, davantage pour une refonte, une boutique en ligne ou un projet dont la structure doit être construite. Le calendrier est fixé avant le démarrage, avec les étapes principales."],
  ["Travaillez-vous aussi en dehors de Lausanne ?", "Oui. Nous accompagnons des entreprises à Lausanne, Lutry, Pully, Morges, Vevey, Montreux, Nyon et dans le reste du canton de Vaud, ainsi qu’en Suisse romande. Les échanges peuvent se faire sur place ou à distance."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de site internet à Lausanne",
    serviceType: "Création de site internet",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/services/creation-site-internet-lausanne",
    areaServed: ["Lausanne", "Lutry", "Canton de Vaud", "Suisse romande"],
  };
  return <><Header/><main>
    <JsonLd data={serviceSchema} />
    <PageHero
      kicker="CRÉATION WEB · LAUSANNE"
      crumbs={[{label:"Services",href:"/services"},{label:"Création de site internet à Lausanne"}]}
      title={<>Création de site internet à Lausanne<br/><em>pour faire avancer votre entreprise.</em></>}
      intro="Un site professionnel ne doit pas seulement être esthétique. Il doit expliquer votre activité, inspirer confiance et permettre à vos futurs clients de vous contacter. SebWebSwiss crée des sites internet pour les indépendants, PME et entreprises de Lausanne et du canton de Vaud."
      primary={{label:"Parler de votre projet",href:"/contact"}}
    />

    <section className="trust-bar" aria-label="Points clés"><span><strong>Contact direct</strong>, sans intermédiaire</span><span className="dot">·</span><span><strong>5 ans</strong> de projets web</span><span className="dot">·</span><span>Des bases <strong>SEO et performance</strong> incluses</span><span className="dot">·</span><span><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phoneDisplay}</a></span></section>

    <section className="content-section"><div className="content-label">VOTRE PRÉSENCE EN LIGNE</div><div>
      <h2>Un site clair, rapide<br/><em>et utile.</em></h2>
      <p>Votre site est souvent le premier contact avec votre entreprise. Nous concevons des sites internet sur mesure pour les indépendants, PME et entreprises de Lausanne, Lutry et du canton de Vaud qui veulent présenter leur offre avec clarté.</p>
      <p>Avant de parler de couleurs ou de maquettes, nous cherchons à comprendre ce que vos visiteurs doivent trouver, comprendre et faire. Cette base permet de créer une expérience simple pour vos clients et cohérente pour votre activité.</p>
      <ul className="check-list"><li>Un message clair, adapté à votre clientèle</li><li>Une navigation simple sur mobile et ordinateur</li><li>Des pages pensées pour convertir les visites en demandes</li><li>Une base technique propre pour la performance et le SEO</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">PRIX ET DÉLAIS</div><div>
      <h2>Combien coûte<br/><em>un site web à Lausanne ?</em></h2>
      <p>Un site vitrine de 5 à 7 pages commence à 399 CHF. Le tarif final dépend ensuite du nombre de pages, de la rédaction, des fonctionnalités et de l’accompagnement souhaité — pas d’une grille fixe. Pour un catalogue ou une boutique en ligne, comptez à partir de 1 290 CHF.</p>
      <ul className="check-list"><li>Site vitrine de 5 à 7 pages : à partir de 399 CHF</li><li>Refonte avec migration et conservation du référencement : à partir de 399 CHF</li><li>Boutique en ligne ou catalogue : à partir de 1 290 CHF</li><li>Accompagnement SEO après la mise en ligne : à partir de 149 CHF par mois en local, ou 399 CHF par mois pour un accompagnement complet</li></ul>
      <p>Les délais suivent la même logique : un site vitrine dont les contenus sont prêts demande généralement quelques semaines, une refonte ou un projet e-commerce davantage. Un devis sérieux détaille le périmètre, les étapes et ce qui est inclus. Nous détaillons les fourchettes et les facteurs de prix dans notre guide sur le <Link className="text-link" href="/blog/combien-coute-un-site-internet-lausanne">prix d’un site internet à Lausanne</Link>.</p>
    </div></section>

    <section className="content-section"><div className="content-label">PROJETS WEB</div><div>
      <h2>La bonne solution,<br/><em>pas une formule imposée.</em></h2>
      <p>Nous n’imposons pas un modèle unique ni une accumulation de plugins. La technologie, les contenus et les fonctionnalités sont choisis selon la réalité de votre projet, votre budget et les évolutions que vous envisagez.</p>
      <div className="service-list"><article className="service-card"><span>01</span><div><h3>Site vitrine professionnel</h3><p>Présentez votre entreprise, vos prestations, votre méthode et vos coordonnées avec une structure conçue pour rassurer et orienter vos visiteurs.</p></div><b>↗</b></article><article className="service-card"><span>02</span><div><h3>Refonte de site internet</h3><p>Reprenez un site devenu lent, difficile à faire évoluer ou peu clair afin de mieux servir vos clients et votre visibilité en ligne.</p></div><b>↗</b></article><article className="service-card"><span>03</span><div><h3>Pages de service et landing pages</h3><p>Créez des pages ciblées pour une offre, une campagne ou une zone de chalandise, avec un objectif concret et un appel à l’action utile.</p></div><b>↗</b></article><article className="service-card"><span>04</span><div><h3>Fonctionnalités sur mesure</h3><p>Formulaires, automatisations, outils métier ou intégrations : nous évaluons ce qui apporte réellement de la valeur avant de développer.</p></div><b>↗</b></article><article className="service-card"><span>05</span><div><h3>Boutique en ligne (e-commerce)</h3><p>Vendez vos produits directement sur votre site : un catalogue clair, un parcours d’achat simple et une solution sécurisée, prête à évoluer avec votre activité.</p></div><b>↗</b></article></div>
    </div></section>

    <section className="content-section"><div className="content-label">NOTRE MÉTHODE</div><div>
      <h2>Du besoin réel<br/><em>à une mise en ligne maîtrisée.</em></h2>
      <p>Un projet avance mieux lorsque les décisions sont prises dans le bon ordre. Nous vous accompagnons avec une méthode simple, des échanges directs et des étapes compréhensibles.</p>
      <ul className="check-list"><li>Découverte : objectifs, activité, clientèle et situation existante</li><li>Architecture : pages, contenus, priorités et parcours du visiteur</li><li>Conception : direction visuelle et interface responsive</li><li>Développement : intégration, performance, accessibilité et sécurité</li><li>Vérification : tests sur mobile, formulaires, liens et indexation</li><li>Mise en ligne : accompagnement et choix du suivi après lancement</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">SEO DÈS LE DÉPART</div><div>
      <h2>Une fondation saine<br/><em>pour être trouvé.</em></h2>
      <p>Le référencement ne se résume pas à ajouter quelques mots-clés après la création du site. Il commence avec une structure logique, des contenus utiles, des pages accessibles aux moteurs de recherche et une expérience rapide sur mobile.</p>
      <p>Chaque projet inclut les fondamentaux nécessaires à une bonne base : hiérarchie des titres, métadonnées essentielles, maillage interne, sitemap, règles d’indexation et contrôle des éléments techniques principaux. Pour un travail continu, découvrez notre <a className="text-link" href="/services/referencement-seo-lausanne">service de référencement SEO à Lausanne</a>.</p>
      <p>Vous voulez vérifier votre site actuel avant de décider ? Le <a className="text-link" href="/check-up-site-web">check-up de site web</a> contrôle les points techniques en quelques secondes. Et si votre site existe déjà mais reste invisible, notre guide sur un <Link className="text-link" href="/blog/site-internet-pas-visible-google">site internet absent de Google</Link> liste les causes les plus fréquentes.</p>
    </div></section>

    <section className="content-section"><div className="content-label">RÉALISATIONS</div><div>
      <h2>Des projets réels,<br/><em>menés de bout en bout.</em></h2>
      <p>Chaque projet applique la même exigence qu’à Lausanne : un message clair, une structure utile et une base technique posée pour la performance et le SEO.</p>
      <div className="service-list">
        {realisations.map(([n, name, tag,, href, built]) => <a className="service-card" key={n} href={href}><span>{n}</span><div><h3>{name}</h3><p className="case-tag">{tag}</p><p>{built}</p></div><b>↗</b></a>)}
      </div>
      <p>Pour un aperçu complet, découvrez nos <a className="text-link" href="/realisations">réalisations web</a>.</p>
    </div></section>

    <section className="content-section"><div className="content-label">VOTRE RÉGION</div><div>
      <h2>Basé près de Lausanne,<br/><em>au service des entreprises vaudoises.</em></h2>
      <p>Nous sommes installés à La Croix-sur-Lutry, à quelques minutes de Lausanne. Concrètement, cela signifie qu’un échange en personne est possible pour cadrer votre projet, que vous parlez directement à la personne qui développe votre site, et que vous travaillez avec une agence qui comprend les réalités des PME et indépendants du canton de Vaud.</p>
      <p>Nous accompagnons des entreprises à Lausanne, Lutry, Pully, Morges, Vevey, Montreux et Nyon. Votre site internet est conçu, développé et suivi depuis le canton de Vaud — une proximité qui simplifie la collaboration du premier appel à la mise en ligne, et bien après.</p>
      <p>Cette proximité fait partie de ce que nous attendons d’une agence web à Lausanne : un interlocuteur qui connaît le marché local, les habitudes de recherche et les attentes des clients de la région.</p>
    </div></section>

    <section className="content-section"><div className="content-label">APRÈS LE LANCEMENT</div><div>
      <h2>Vous gardez le choix,<br/><em>nous restons disponibles.</em></h2>
      <p>Après la mise en ligne, vous pouvez conserver votre hébergement actuel ou confier la gestion technique à SebWebSwiss. Notre formule d’hébergement web géré peut inclure le suivi technique, les sauvegardes et l’accompagnement selon le périmètre convenu.</p>
      <p>Vous souhaitez garder votre propre hébergement ? C’est possible. Dans ce cas, les accès, renouvellements, sauvegardes et le support de l’infrastructure restent sous votre responsabilité ou celle de votre prestataire.</p>
      <a className="text-link" href="/contact">Discuter de l’hébergement et de la maintenance ↗</a>
    </div></section>

    <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un projet clair<br/><em>commence par de bonnes questions.</em></h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <section className="soft-cta"><p>Vous avez un projet de création ou de refonte de site internet à Lausanne ?</p><a className="button primary" href="/contact">Demander un premier échange <span>↗</span></a></section>
  </main><Footer /></>;
}
