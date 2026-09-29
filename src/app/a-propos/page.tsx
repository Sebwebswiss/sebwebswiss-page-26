import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "À propos de SebWebSwiss — Sébastien, créateur de sites web",
  description: "SebWebSwiss, c’est Sébastien : cinq années de projets web, une expertise technique, un accès direct et des explications claires pour les entreprises de Suisse romande.",
  alternates: { canonical: "/a-propos" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/a-propos" },
};

export default function About() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://sebwebswiss.ch/a-propos#person",
    name: "Sébastien",
    jobTitle: "Créateur de sites web et consultant SEO",
    worksFor: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/a-propos",
    image: "https://sebwebswiss.ch/og-image.png",
  };

  return <><Header/><main>
    <JsonLd data={personSchema} />
    <PageHero
      kicker="À PROPOS · SUISSE ROMANDE"
      crumbs={[{label:"À propos"}]}
      title={<>Sébastien — un expert web<br/><em>qui vous accompagne en direct.</em></>}
      intro="SebWebSwiss, c’est une personne : je crée des sites web, j’optimise le référencement et j’explique chaque étape avec clarté. Un seul interlocuteur, de la première idée à la mise en ligne."
      primary={{label:"Me contacter",href:"/contact"}}
    />

    <section className="content-section"><div className="content-label">MON APPROCHE</div><div>
      <h2>Moins de promesses.<br/><em>Plus de méthode.</em></h2>
      <p>Je privilégie une relation directe, des explications compréhensibles et des solutions adaptées à la réalité de chaque entreprise. Un projet web ou SEO doit être utile à vos clients avant d’être visible sur un écran.</p>
      <p>Avant de parler de couleurs ou de maquettes, je vous explique ce qui vaut la peine — et ce qui ne vaut pas votre argent dans un site internet. C’est cette honnêteté qui vous permet de décider avec clarté.</p>
    </div></section>

    <section className="content-section"><div className="content-label">MON EXPÉRIENCE</div><div>
      <h2>Une expertise technique<br/><em>construite sur des projets réels.</em></h2>
      <p>Mon parcours s’appuie sur cinq années de projets web, notamment à l’international : sites vitrines, refontes, référencement et accompagnement technique. Aujourd’hui basé près de Lausanne, je mets cette expérience au service des entreprises de Suisse romande.</p>
      <ul className="check-list"><li>Cinq années de projets web</li><li>Expérience internationale</li><li>Création de sites et optimisation SEO</li><li>Un interlocuteur direct, de A à Z</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">VOS RÉALISATIONS</div><div>
      <h2>Des projets<br/><em>que je mène de bout en bout.</em></h2>
      <p>Je travaille sur les projets en direct, sans intermédiaire ni sous-traitance. Vous savez toujours qui travaille sur votre site et pourquoi chaque décision est prise.</p>
      <a className="text-link" href="/realisations">Voir mes réalisations ↗</a>
    </div></section>

    <section className="soft-cta"><p>Vous souhaitez échanger sur votre projet ?</p><a className="button primary" href="/contact">Me contacter <span>↗</span></a></section>
  </main></>;
}
