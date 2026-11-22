import type { Metadata } from "next";
import Link from "next/link";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Agence web à Lutry | Création de site & SEO",
  description:
    "Agence web à Lutry : création de site internet, SEO local et accompagnement des PME et associations de Lavaux. Basés à La Croix-sur-Lutry.",
  alternates: { canonical: "/agence-web-lutry" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/agence-web-lutry" },
};

const faqs = [
  ["Combien coûte un site internet à Lutry ?", "Un site vitrine de 5 à 7 pages démarre à 399 CHF, une boutique en ligne à 1 290 CHF. Le devis final dépend des pages, de la rédaction, des fonctionnalités et de l’accompagnement. Le périmètre est détaillé avant le démarrage."],
  ["Travaillez-vous avec les restaurants et les vignerons du Lavaux ?", "Oui. Ces activités ont des besoins précis : horaires, menus, réservation, visite du domaine, vente de vin. Le site est construit autour de ces usages, pas autour d’un modèle générique."],
  ["Faut-il une version allemande pour une entreprise à Lutry ?", "Pas automatiquement. Si votre clientèle est locale, le français suffit. Une version allemande devient utile si vous accueillez des clients de Suisse alémanique ou si votre activité touristique le justifie."],
  ["Pouvez-vous reprendre un site existant ?", "Oui. Nous commençons par un état des lieux : ce qui fonctionne, ce qui bloque l’indexation ou la conversion, et ce qui peut être conservé. Ensuite, nous décidons ensemble entre optimisation et refonte."],
  ["Le site sera-t-il visible sur Google ?", "Nous posons les bases techniques et locales, puis travaillons les contenus et la fiche Google. Aucune position ne peut être garantie honnêtement, mais les pages locales et les avis font généralement bouger les choses en quelques mois."],
  ["Comment se passe un rendez-vous à Lutry ?", "Un premier échange de 15 minutes, à La Croix-sur-Lutry, chez vous ou en visio. Vous parlez directement à la personne qui développe votre site."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agence web à Lutry",
    serviceType: "Création de site internet et référencement local",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/agence-web-lutry",
    areaServed: ["Lutry", "Paudex", "Belmont-sur-Lausanne", "Canton de Vaud", "Suisse romande"],
  };
  return (
    <>
      <Header />
      <main>
        <JsonLd data={serviceSchema} />
        <PageHero
          kicker="AGENCE WEB · LUTRY"
          crumbs={[{ label: "Agence web à Lutry" }]}
          title={<>Agence web à Lutry<br /><em>pour votre site internet.</em></>}
          intro="Basés à La Croix-sur-Lutry, nous créons des sites internet et travaillons le référencement local pour les PME, indépendants et associations de Lutry, Paudex, Belmont et du Lavaux."
          primary={{ label: "Parler de votre projet", href: "/contact" }}
        />

        <section className="trust-bar" aria-label="Points clés">
          <span><strong>Basés à Lutry</strong></span><span className="dot">·</span>
          <span>Contact direct, sans intermédiaire</span><span className="dot">·</span>
          <span>Prix de départ affichés</span><span className="dot">·</span>
          <span><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phoneDisplay}</a></span>
        </section>

        <section className="content-section"><div className="content-label">VOTRE AGENCE LOCALE</div><div>
          <h2>Un interlocuteur à quelques minutes<br /><em>de votre entreprise.</em></h2>
          <p>SebWebSwiss est installé à La Croix-sur-Lutry. Concrètement : un rendez-vous sur place est possible, vous parlez directement à la personne qui conçoit et développe votre site, et les décisions ne passent pas par trois intermédiaires.</p>
          <p>Nous travaillons avec des entreprises de Lutry et des communes voisines — Paudex, Belmont, Cully, Grandvaux — sur trois sujets : créer un site qui explique clairement l’activité, le rendre visible sur Google, et le maintenir dans le temps.</p>
        </div></section>

        <section className="content-section"><div className="content-label">PRIX</div><div>
          <h2>Combien coûte un site internet<br /><em>à Lutry ?</em></h2>
          <p>Un site vitrine de 5 à 7 pages démarre à 399 CHF. Une boutique en ligne démarre à 1 290 CHF. Le prix final dépend de ce que le site doit réellement faire : nombre de pages, rédaction, fonctionnalités, langues et accompagnement.</p>
          <ul className="check-list">
            <li>Site vitrine de 5 à 7 pages : dès 399 CHF</li>
            <li>Refonte d’un site existant : dès 399 CHF</li>
            <li>Boutique en ligne ou catalogue : dès 1 290 CHF</li>
            <li>SEO local : dès 149 CHF par mois</li>
            <li>Accompagnement complet : dès 399 CHF par mois</li>
          </ul>
          <p>Le devis détaille le périmètre. Ce qui n’est pas listé n’est pas facturé en surprise, et ce qui n’est pas nécessaire n’est pas ajouté.</p>
        </div></section>

        <section className="content-section"><div className="content-label">DÉLAIS</div><div>
          <h2>Quel délai pour un site<br /><em>à Lutry ?</em></h2>
          <p>Quelques semaines pour un site vitrine dont les contenus sont prêts. Une refonte ou une boutique demandent davantage. Le facteur limitant est presque toujours le contenu : textes, photos et validations.</p>
          <ul className="check-list">
            <li>Cadrage : un échange pour comprendre l’activité et les objectifs</li>
            <li>Structure et contenus : une à deux semaines</li>
            <li>Conception et développement : deux à quatre semaines</li>
            <li>Tests et mise en ligne : quelques jours</li>
          </ul>
          <p>Le calendrier est fixé avant le démarrage, avec les étapes et les responsabilités de chaque côté.</p>
        </div></section>

        <section className="content-section"><div className="content-label">DÉCISION</div><div>
          <h2>Création ou refonte :<br /><em>que choisir ?</em></h2>
          <p>Un site récent, rapide et lisible sur mobile n’a pas besoin d’être refait. Un site lent, difficile à mettre à jour ou absent de Google coûte souvent plus cher à réparer qu’à reconstruire.</p>
          <ul className="check-list">
            <li>Gardez et optimisez si la structure et la technique sont saines</li>
            <li>Refaites si le site dépend d’une technologie obsolète ou bloque l’indexation</li>
            <li>Dans les deux cas, commencez par un état des lieux</li>
          </ul>
          <p>Le <Link className="text-link" href="/check-up-site-web">check-up de site web</Link> donne une première lecture technique. Pour un projet plus large, l’<Link className="text-link" href="/services/audit-seo">audit SEO</Link> fixe les priorités.</p>
        </div></section>

        <section className="content-section"><div className="content-label">VISIBILITÉ</div><div>
          <h2>Comment être visible<br /><em>sur Google à Lutry ?</em></h2>
          <p>Les recherches locales ne se gagnent pas avec une page qui répète « Lutry ». Elles se gagnent avec une fiche Google complète, des pages qui répondent à une intention précise, des avis récents et des mentions cohérentes.</p>
          <ul className="check-list">
            <li>Fiche Google Business Profile : catégories, services, horaires, photos</li>
            <li>Pages par offre : création, SEO, e-commerce</li>
            <li>Avis clients demandés après chaque projet</li>
            <li>Citations locales : annuaires, associations, partenaires</li>
            <li>Mesure : Search Console, appels et demandes entrantes</li>
          </ul>
          <p>Le travail local est détaillé sur la page de <Link className="text-link" href="/services/referencement-seo-lausanne">référencement SEO à Lausanne</Link>.</p>
        </div></section>

        <section className="content-section"><div className="content-label">DONNÉES LOCALES</div><div>
          <h2>Ce que nous observons<br /><em>sur les sites de Lutry.</em></h2>
          <p>En novembre 2026, nous avons analysé les sites publics de 18 associations et clubs de Lutry, à partir de la liste communale.</p>
          <ul className="check-list">
            <li>16 sur 18 (89 %) n’ont pas de page de confidentialité accessible</li>
            <li>6 sur 18 (33 %) n’ont pas de meta description</li>
            <li>3 sur 18 (17 %) n’ont pas de balise viewport, base de l’affichage mobile</li>
            <li>Note technique moyenne : 58/100</li>
          </ul>
          <p>Ce n’est pas un jugement sur ces associations : leur énergie va au terrain, pas au site. C’est exactement le type de structure où un site clair et à jour change la donne — pour les bénévoles comme pour le public.</p>
          <p>Méthode : pages d’accueil publiques, outil automatique, novembre 2026. Ce n’est pas un audit juridique.</p>
        </div></section>

        <section className="content-section"><div className="content-label">ACTIVITÉS</div><div>
          <h2>Avec quels types d’activités<br /><em>travaillons-nous à Lutry ?</em></h2>
          <p>Le tissu local est varié : restaurants et cafés du bourg, domaines et caves du Lavaux, commerces indépendants, artisans, professions libérales, associations et acteurs du tourisme.</p>
          <p>Chaque activité a ses contraintes : un restaurant a besoin d’horaires, d’un menu et d’une réservation ; un domaine a besoin de raconter ses vins et ses visites ; une association a besoin d’informer et de recruter des bénévoles. Le site doit répondre à ces besoins, pas à un modèle générique.</p>
        </div></section>

        <section className="content-section"><div className="content-label">PROJET</div><div>
          <h2>Comment se passe<br /><em>un projet à Lutry ?</em></h2>
          <p>Un premier échange de 15 minutes suffit pour savoir si nous sommes la bonne personne. Ensuite : cadrage, devis, contenus, conception, mise en ligne, suivi.</p>
          <p>Le rendez-vous peut se faire à La Croix-sur-Lutry, chez vous ou en visio. Vous gardez un interlocuteur unique du début à la fin.</p>
          <Link className="text-link" href="/contact">Demander un premier échange ↗</Link>
        </div></section>

        <section className="content-section"><div className="content-label">PROPRIÉTÉ</div><div>
          <h2>Qui possède le site,<br /><em>le domaine et les contenus ?</em></h2>
          <p>Vous. Le nom de domaine est à votre nom, les contenus vous appartiennent, et le site peut être repris par un autre prestataire si vous le souhaitez. Nous ne travaillons pas avec un système qui vous enferme.</p>
          <p>L’hébergement peut rester chez votre fournisseur actuel ou être géré par nous — à vous de choisir.</p>
        </div></section>

        <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un projet à Lutry<br /><em>commence par une question.</em></h2></div><div className="faq-list">
          {faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
        </div></section>

        <section className="soft-cta"><p>Vous avez un projet de site internet à Lutry ?</p><a className="button primary" href="/contact">Demander un premier échange <span>↗</span></a></section>
      </main>
      <Footer />
    </>
  );
}
