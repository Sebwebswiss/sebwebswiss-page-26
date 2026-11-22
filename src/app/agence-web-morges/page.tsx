import type { Metadata } from "next";
import Link from "next/link";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Agence web à Morges | Création de site & SEO",
  description:
    "Agence web pour les PME et indépendants de Morges : création de site, refonte et SEO local. Basés à Lutry, intervention à Morges et sur La Côte.",
  alternates: { canonical: "/agence-web-morges" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/agence-web-morges" },
};

const faqs = [
  ["Combien coûte un site internet à Morges ?", "Un site vitrine de 5 à 7 pages démarre à 399 CHF, une boutique en ligne à 1 290 CHF. Le devis final dépend des pages, des contenus, des fonctionnalités et de l’accompagnement."],
  ["Intervenez-vous sur place à Morges ?", "Oui. Morges est à une quinzaine de minutes de Lutry, en voiture ou en train. Les rendez-vous importants peuvent se faire sur place, le reste en visio."],
  ["Travaillez-vous avec les commerces indépendants ?", "Oui. Un commerce a besoin d’être trouvé localement, de montrer ses horaires, ses produits et ses actualités. Le site doit être simple à mettre à jour, sans dépendre d’un développeur."],
  ["Pouvez-vous reprendre un site existant ?", "Oui. Nous commençons par un état des lieux : indexation, vitesse, contenus, formulaires. Ensuite, nous décidons entre optimisation et refonte."],
  ["Faut-il une page par ville autour de Morges ?", "Non. Une page par ville sans contenu propre ne sert à rien et peut nuire. Mieux vaut une page utile pour Morges, et des contenus spécifiques seulement là où il y a une vraie différence."],
  ["Le site sera-t-il visible sur Google ?", "Nous posons les bases techniques et locales, puis travaillons les contenus et la fiche Google. Aucune position ne peut être garantie, mais les résultats se mesurent dans Search Console."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agence web à Morges",
    serviceType: "Création de site internet et référencement local",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/agence-web-morges",
    areaServed: ["Morges", "Tolochenaz", "Saint-Prex", "Canton de Vaud", "Suisse romande"],
  };
  return (
    <>
      <Header />
      <main>
        <JsonLd data={serviceSchema} />
        <PageHero
          kicker="AGENCE WEB · MORGES"
          crumbs={[{ label: "Agence web à Morges" }]}
          title={<>Agence web à Morges<br /><em>pour votre site internet.</em></>}
          intro="Nous travaillons avec des PME, commerces et indépendants de Morges et de La Côte : un site clair, une base technique propre et une visibilité locale qui se mesure."
          primary={{ label: "Parler de votre projet", href: "/contact" }}
        />

        <section className="trust-bar" aria-label="Points clés">
          <span><strong>À 15 minutes de Morges</strong></span><span className="dot">·</span>
          <span>Contact direct</span><span className="dot">·</span>
          <span>Prix de départ affichés</span><span className="dot">·</span>
          <span><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phoneDisplay}</a></span>
        </section>

        <section className="content-section"><div className="content-label">UNE AGENCE POUR MORGES</div><div>
          <h2>Un partenaire à une quinzaine<br /><em>de minutes de Morges.</em></h2>
          <p>Notre base est à La Croix-sur-Lutry. Morges est accessible en une quinzaine de minutes, en voiture ou en train. Les rendez-vous de cadrage peuvent se faire sur place ; le reste se règle en visio ou par téléphone.</p>
          <p>Morges est un pôle commercial pour toute La Côte. Les entreprises y sont nombreuses, les clients comparent facilement, et un site daté ou invisible sur Google coûte des demandes chaque semaine.</p>
        </div></section>

        <section className="content-section"><div className="content-label">PRIX</div><div>
          <h2>Combien coûte un site internet<br /><em>à Morges ?</em></h2>
          <p>Un site vitrine de 5 à 7 pages démarre à 399 CHF, une boutique en ligne à 1 290 CHF. Le devis final dépend des pages, des contenus, des fonctionnalités et de l’accompagnement.</p>
          <ul className="check-list">
            <li>Site vitrine de 5 à 7 pages : dès 399 CHF</li>
            <li>Refonte avec migration : dès 399 CHF</li>
            <li>Boutique en ligne ou catalogue : dès 1 290 CHF</li>
            <li>SEO local à Morges et sur La Côte : dès 149 CHF par mois</li>
            <li>Accompagnement complet : dès 399 CHF par mois</li>
          </ul>
          <p>Le périmètre est écrit avant le démarrage. Les pages, la rédaction, l’intégration et les bases SEO sont listées séparément.</p>
        </div></section>

        <section className="content-section"><div className="content-label">DÉLAIS</div><div>
          <h2>Quel délai pour un site<br /><em>à Morges ?</em></h2>
          <p>Quelques semaines pour un site vitrine dont les contenus sont prêts. Une refonte ou une boutique demandent plus de temps, surtout si les textes et les photos doivent être produits.</p>
          <ul className="check-list">
            <li>Cadrage : un échange pour comprendre l’activité et les priorités</li>
            <li>Contenus : une à deux semaines selon la disponibilité des informations</li>
            <li>Développement : deux à quatre semaines</li>
            <li>Mise en ligne et suivi : quelques jours</li>
          </ul>
          <p>Le calendrier est fixé avant le démarrage. Un retard de contenu est signalé, pas absorbé en silence.</p>
        </div></section>

        <section className="content-section"><div className="content-label">VISIBILITÉ</div><div>
          <h2>Comment être visible<br /><em>sur Google à Morges ?</em></h2>
          <p>À Morges, la recherche locale se joue sur trois terrains : la fiche Google, les pages du site et les avis. Les annuaires et les partenaires locaux complètent le tableau, mais ne remplacent pas une base propre.</p>
          <ul className="check-list">
            <li>Fiche Google Business Profile : catégorie, horaires, photos, services</li>
            <li>Pages par offre et par intention, pas une page par mot-clé</li>
            <li>Avis clients demandés au bon moment</li>
            <li>Contenus locaux utiles : horaires, accès, stationnement, zone desservie</li>
            <li>Mesure dans Search Console et suivi des demandes</li>
          </ul>
          <p>Le détail de la méthode se trouve sur la page de <Link className="text-link" href="/services/referencement-seo-lausanne">référencement SEO</Link>.</p>
        </div></section>

        <section className="content-section"><div className="content-label">DONNÉES LOCALES</div><div>
          <h2>Ce que nous observons<br /><em>sur les sites de Morges.</em></h2>
          <p>En novembre 2026, nous avons analysé les sites publics de 18 associations et clubs de Morges, à partir de l’annuaire communal.</p>
          <ul className="check-list">
            <li>14 sur 18 (78 %) n’ont pas de page de confidentialité accessible</li>
            <li>7 sur 18 (39 %) n’ont pas de meta description</li>
            <li>Aucun problème de balise viewport détecté sur cet échantillon</li>
            <li>Note technique moyenne : 61/100</li>
          </ul>
          <p>Le constat est cohérent avec le reste de la région : les sites associatifs remplissent leur rôle d’information, mais restent faibles sur la confidentialité et sur les signaux que Google utilise pour comprendre une page.</p>
          <p>Méthode : pages d’accueil publiques, outil automatique, novembre 2026. Ce n’est pas un audit juridique.</p>
        </div></section>

        <section className="content-section"><div className="content-label">ACTIVITÉS</div><div>
          <h2>Avec quels types d’activités<br /><em>travaillons-nous à Morges ?</em></h2>
          <p>Commerces indépendants, restaurants, artisans, professions libérales, associations et acteurs du tourisme : les besoins ne sont pas les mêmes. Un commerce doit montrer ses produits et ses horaires ; un artisan doit rassurer sur son savoir-faire ; une profession libérale doit rendre la prise de contact évidente.</p>
          <p>Le site est construit autour de ces usages. Pas de page « vitrine » qui ne sert qu’à exister.</p>
        </div></section>

        <section className="content-section"><div className="content-label">REFONTE</div><div>
          <h2>Création ou refonte :<br /><em>comment trancher ?</em></h2>
          <p>Un site qui charge vite, s’affiche correctement sur mobile et se met à jour facilement n’a pas besoin d’être refait. Un site lent, difficile à modifier ou absent des résultats de recherche coûte plus cher à entretenir qu’à remplacer.</p>
          <ul className="check-list">
            <li>Commencez par vérifier l’indexation et la vitesse</li>
            <li>Identifiez les pages qui reçoivent déjà des impressions</li>
            <li>Décidez ensuite : optimisation ciblée ou nouvelle structure</li>
          </ul>
          <p>La <Link className="text-link" href="/services/refonte-site-internet">refonte de site internet</Link> peut conserver les contenus utiles et les redirections nécessaires.</p>
        </div></section>

        <section className="content-section"><div className="content-label">PROJET</div><div>
          <h2>Comment se passe un projet<br /><em>à Morges ?</em></h2>
          <p>Un premier échange de 15 minutes permet de cadrer le besoin. Ensuite : devis, contenus, conception, mise en ligne et suivi. Les points importants peuvent se faire à Morges, à Lutry ou en visio.</p>
          <p>Vous gardez un interlocuteur unique et un calendrier écrit. C’est la partie la moins spectaculaire du métier, et souvent la plus utile.</p>
          <Link className="text-link" href="/contact">Demander un premier échange ↗</Link>
        </div></section>

        <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un projet à Morges<br /><em>commence par une question.</em></h2></div><div className="faq-list">
          {faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
        </div></section>

        <section className="soft-cta"><p>Vous avez un projet de site internet à Morges ?</p><a className="button primary" href="/contact">Demander un premier échange <span>↗</span></a></section>
      </main>
      <Footer />
    </>
  );
}
