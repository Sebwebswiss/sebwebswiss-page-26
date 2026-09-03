import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Base-Line — Projet web international",
  description: "Site web pour Base-Line, entreprise de chapes et finitions : une présentation claire de ses services et de son savoir-faire.",
  alternates: { canonical: "/realisations/base-line" },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Base-Line — Projet web international",
    author: { "@id": "https://sebwebswiss.ch/a-propos#person" },
    publisher: { "@id": "https://sebwebswiss.ch/#organization" },
    mainEntityOfPage: "https://sebwebswiss.ch/realisations/base-line",
  };

  return <><Header/><main>
    <JsonLd data={articleSchema} />
    <PageHero
      kicker="CASE STUDY · CROATIE"
      crumbs={[{label:"Réalisations",href:"/realisations"},{label:"Base-Line"}]}
      title={<>Base-Line<br/><em>un site pour un savoir-faire technique.</em></>}
      intro="Base-Line est une entreprise spécialisée dans les chapes et finitions. Le site devait présenter clairement ses services et son savoir-faire pour inspirer confiance auprès de clients professionnels."
      secondary={{label:"Voir le site",href:"https://base-line.hr"}}
    />

    <section className="content-section"><div className="content-label">CONTEXTE</div><div>
      <h2>Le besoin<br/><em>du client.</em></h2>
      <p>Dans une activité technique de chantier, la confiance est essentielle. Base-Line avait besoin d’un site qui explique clairement ses prestations, son savoir-faire et la manière de le contacter, avec une présentation soignée et professionnelle.</p>
    </div></section>

    <section className="content-section"><div className="content-label">MA SOLUTION</div><div>
      <h2>Une présentation<br/><em>claire et professionnelle.</em></h2>
      <ul className="check-list"><li>Une structure de pages qui met en avant les services et le savoir-faire</li><li>Des contenus rédigés pour être compris par des clients professionnels</li><li>Des bases SEO solides : titres, métadonnées, maillage interne</li><li>Une expérience rapide et adaptée au mobile</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">PROJET WEB</div><div>
      <h2>Une création de site<br/><em>pensée pour la confiance.</em></h2>
      <p>Ce projet relève de la <a className="text-link" href="/services/creation-site-internet-lausanne">création de site internet à Lausanne</a>, appliquée ici à une entreprise internationale. Les mêmes exigences s’appliquent : clarté, sérieux et une base qui permet de faire évoluer le site.</p>
    </div></section>

    <section className="soft-cta"><p>Vous avez un projet similaire ?</p><a className="button primary" href="/contact">Parler de votre projet <span>↗</span></a></section>
  </main></>;
}
