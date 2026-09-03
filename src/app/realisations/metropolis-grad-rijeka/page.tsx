import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Metropolis — Projet web international",
  description: "Site web pour le café-bar Metropolis à Rijeka : une présence en ligne claire, moderne et cohérente avec l’image du lieu.",
  alternates: { canonical: "/realisations/metropolis-grad-rijeka" },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Metropolis — Projet web international",
    author: { "@id": "https://sebwebswiss.ch/a-propos#person" },
    publisher: { "@id": "https://sebwebswiss.ch/#organization" },
    mainEntityOfPage: "https://sebwebswiss.ch/realisations/metropolis-grad-rijeka",
  };

  return <><Header/><main>
    <JsonLd data={articleSchema} />
    <PageHero
      kicker="CASE STUDY · CROATIE"
      crumbs={[{label:"Réalisations",href:"/realisations"},{label:"Metropolis"}]}
      title={<>Metropolis<br/><em>un site pour un café-bar urbain.</em></>}
      intro="Metropolis est un café-bar de Rijeka. Le site devait refléter l’ambiance du lieu, présenter l’espace et donner envie de venir — tout en étant simple à faire évoluer."
      secondary={{label:"Voir le site",href:"https://metropolis-grad-rijeka.hr"}}
    />

    <section className="content-section"><div className="content-label">CONTEXTE</div><div>
      <h2>Le besoin<br/><em>du client.</em></h2>
      <p>Un lieu de vie a besoin d’une présence en ligne qui transmet son atmosphère. Pour Metropolis, l’objectif était de présenter clairement le bar, ses horaires et son emplacement, avec un design moderne qui corresponde à l’image du lieu.</p>
    </div></section>

    <section className="content-section"><div className="content-label">MA SOLUTION</div><div>
      <h2>Une image claire<br/><em>et un site simple.</em></h2>
      <ul className="check-list"><li>Une page d’accueil soignée qui présente l’ambiance du café-bar</li><li>Les informations essentielles facilement accessibles : localisation, horaires, contact</li><li>Un design responsive, pensé avant tout pour le mobile</li><li>Des bases SEO solides pour être trouvé par une recherche locale</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">PROJET WEB</div><div>
      <h2>Une création de site<br/><em>pensée pour l’image du lieu.</em></h2>
      <p>Ce projet relève de la <a className="text-link" href="/services/creation-site-internet-lausanne">création de site internet à Lausanne</a>, appliquée ici à un établissement international. Les mêmes principes s’appliquent : un message clair et une expérience simple pour le visiteur.</p>
    </div></section>

    <section className="soft-cta"><p>Vous avez un projet similaire ?</p><a className="button primary" href="/contact">Parler de votre projet <span>↗</span></a></section>
  </main></>;
}
