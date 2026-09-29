import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Hexa Power Solutions — Projet web international",
  description: "Création du site web pour Hexa Power Solutions, entreprise technique en Croatie : présentation claire, structure et base SEO.",
  alternates: { canonical: "/realisations/hexapower-solutions" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/realisations/hexapower-solutions" },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Hexa Power Solutions — Projet web international",
    author: { "@id": "https://sebwebswiss.ch/a-propos#person" },
    publisher: { "@id": "https://sebwebswiss.ch/#organization" },
    mainEntityOfPage: "https://sebwebswiss.ch/realisations/hexapower-solutions",
  };

  return <><Header/><main>
    <JsonLd data={articleSchema} />
    <PageHero
      kicker="CASE STUDY · CROATIE"
      crumbs={[{label:"Réalisations",href:"/realisations"},{label:"Hexa Power Solutions"}]}
      title={<>Hexa Power Solutions<br/><em>un site pour une entreprise technique.</em></>}
      intro="Hexa Power Solutions est une entreprise technique qui vend des produits et solutions électriques. Le site devait présenter clairement ses domaines d’expertise et inspirer une confiance professionnelle immédiate."
      secondary={{label:"Voir le site",href:"https://hexapowersolutions.com"}}
    />

    <section className="content-section"><div className="content-label">CONTEXTE</div><div>
      <h2>Le besoin<br/><em>du client.</em></h2>
      <p>Une entreprise technique a souvent une offre dense et technique. Le risque est d’embrouiller le visiteur avec trop de détails. Hexa Power Solutions souhaitait un site clair, structuré et facile à parcourir, qui rassure les clients professionnels dès la première page.</p>
    </div></section>

    <section className="content-section"><div className="content-label">MA SOLUTION</div><div>
      <h2>Une structure<br/><em>qui met l’offre en avant.</em></h2>
      <ul className="check-list"><li>Une architecture de pages logique pour présenter l’entreprise, ses produits et ses domaines d’expertise</li><li>Un contenu rédigé pour être compris, avec des priorités claires par page</li><li>Des bases SEO solides : titres, métadonnées, maillage interne et sitemap</li><li>Une optimisation de la performance et de l’expérience sur mobile</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">PROJET WEB</div><div>
      <h2>Une création de site<br/><em>pensée pour durer.</em></h2>
      <p>Ce projet relève de la <a className="text-link" href="/services/creation-site-internet-lausanne">création de site internet à Lausanne</a>, appliquée ici à une entreprise internationale. Les mêmes exigences s’appliquent : clarté, rapidité et une base qui permet d’évoluer.</p>
    </div></section>

    <section className="soft-cta"><p>Vous avez un projet similaire ?</p><a className="button primary" href="/contact">Parler de votre projet <span>↗</span></a></section>
  </main></>;
}
