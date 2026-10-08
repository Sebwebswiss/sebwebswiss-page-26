import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Programme Fondateur : 10 sites web offerts",
  description: "Le Programme Fondateur SebWebSwiss : je crée le site et mets en place le SEO de 10 entreprises sélectionnées pour leur première année.",
  alternates: { canonical: "/offre-lancement" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/offre-lancement" },
};

export default function Page() {
  return <><Header/><main>
    <PageHero
      kicker="PROGRAMME FONDATEUR · 10 ENTREPRISES"
      crumbs={[{label:"Offre de lancement"}]}
      title={<>Programme Fondateur<br/><em>10 sites offerts la première année.</em></>}
      intro="À l’occasion de mes cinq années de projets web, je sélectionne 10 entreprises pour leur créer un site et mettre en place leur référencement — à CHF 0 pendant la première année."
      primary={{label:"Postuler au programme",href:"/contact"}}
    />

    <section className="content-section"><div className="content-label">POURQUOI CE PROGRAMME</div><div>
      <h2>Je finance mon entrée<br/><em>sur le marché romand.</em></h2>
      <p>Je crée et j’optimise en direct, sans intermédiaire. Ce programme me permet de construire dix partenariats documentés avec des entreprises sérieuses, et en retour de vous proposer une première année sans coût pour votre présence en ligne.</p>
      <p>Il ne s’agit pas d’une promotion « premier arrivé ». Je sélectionne dix entreprises qui veulent réellement avancer et qui correspondent à mes prestations.</p>
    </div></section>

    <section className="content-section"><div className="content-label">CE QUI EST INCLUS</div><div>
      <h2>La première année,<br/><em>tout est compris.</em></h2>
      <ul className="check-list"><li>Création de votre site vitrine (conception, design, développement)</li><li>Mise en place SEO et optimisation technique initiale</li><li>Configuration de Google Search Console</li><li>Hébergement, nom de domaine et certificat SSL</li><li>Sauvegardes et sécurité</li><li>Maintenance dans le cadre défini ensemble</li></ul>
      <p>L’infrastructure, la sécurité, l’hébergement et le suivi technique sont inclus pendant 12 mois, dans le périmètre convenu.</p>
    </div></section>

    <section className="content-section"><div className="content-label">APRÈS LA PREMIÈRE ANNÉE</div><div>
      <h2>Une transition<br/><em>claire et sans surprise.</em></h2>
      <p>À l’issue des 12 mois, votre entreprise est libre de poursuivre ou non l’hébergement, la maintenance et l’accompagnement SEO de son site — selon les tarifs communiqués avant le début du projet.</p>
      <p>Vous connaissez donc dès le départ les conditions de la deuxième année, afin de décider en toute transparence.</p>
    </div></section>

    <section className="content-section"><div className="content-label">LE PÉRIMÈTRE</div><div>
      <h2>Un site vitrine,<br/><em>de 5 à 7 pages.</em></h2>
      <p>Ce programme est pensé pour un site vitrine professionnel de 5 à 7 pages (accueil, services, à propos, réalisations, contact, une page complémentaire). Il ne comprend pas de grands projets e-commerce, d’applications sur mesure ou de fonctionnalités illimitées.</p>
      <p>Un projet plus large peut faire l’objet d’une proposition particulière.</p>
    </div></section>

    <section className="content-section"><div className="content-label">EN CONTREPARTIE</div><div>
      <h2>Ce que je vous demande<br/><em>en retour.</em></h2>
      <p>Pour participer au programme, les entreprises sélectionnées s’engagent à :</p>
      <ul className="check-list"><li>accepter que le projet soit présenté dans le portfolio SebWebSwiss et que les choix techniques soient documentés</li><li>fournir les contenus et informations nécessaires dans un délai convenu</li><li>respecter un nombre défini de cycles de révision</li><li>respecter le périmètre de maintenance défini ensemble</li><li>conserver la propriété de leur site et de leur nom de domaine</li></ul>
      <p>À la fin du projet, je vous demanderai un retour honnête sur votre expérience — uniquement si vous le souhaitez.</p>
    </div></section>

    <section className="content-section"><div className="content-label">CRITÈRES DE SÉLECTION</div><div>
      <h2>Pour qui<br/><em>est ce programme ?</em></h2>
      <ul className="check-list"><li>Une entreprise ou un indépendant qui exerce réellement</li><li>Une offre claire et une activité qui a besoin d’une présence en ligne</li><li>La possibilité de fournir les contenus nécessaires</li><li>Une volonté de collaborer tout au long du projet</li><li>Un projet qui peut réellement bénéficier d’un site vitrine</li></ul>
    </div></section>

    <section className="soft-cta"><p>Votre entreprise mérite une présence en ligne claire, sans coût la première année.</p><a className="button primary" href="/contact">Postuler au programme <span>↗</span></a></section>
  </main><Footer /></>;
}
