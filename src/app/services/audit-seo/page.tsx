import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Audit SEO et plan d’action",
  description: "Audit SEO pour identifier les freins techniques, de contenu et de visibilité, puis prioriser les actions utiles pour votre site.",
  alternates: { canonical: "/services/audit-seo" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/services/audit-seo" },
};

const faqs = [
  ["Que contient l’audit livré ?", "Une analyse structurée par niveau de gravité, les priorités et un plan d’action concret. Vous savez précisément ce qui ne va pas, et par où commencer."],
  ["En combien de temps est-il livré ?", "Le délai dépend de la taille de votre site. Il est précisé dès le départ, avec un livrable clair à la fin."],
  ["Faut-il travailler avec vous ensuite ?", "Non. L’audit vous appartient. Vous pouvez l’exécuter vous-même ou me confier la mise en œuvre si vous le souhaitez."],
  ["Différence avec le consultant SEO ?", "L’audit est un livrable : un état des lieux précis. Le consultant est un accompagnement continu pour piloter vos actions."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Audit SEO et plan d’action",
    serviceType: "Audit SEO",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/services/audit-seo",
    areaServed: ["Lausanne", "Lutry", "Canton de Vaud", "Suisse romande"],
  };

  return <><Header/><main>
    <JsonLd data={serviceSchema} />
    <PageHero
      kicker="AUDIT SEO · SUISSE ROMANDE"
      crumbs={[{label:"Services",href:"/services"},{label:"Audit SEO et plan d’action"}]}
      title={<>Audit SEO et plan d’action<br/><em>pour votre entreprise.</em></>}
      intro="Un audit SEO complet permet de voir ce qui fonctionne, ce qui bloque et ce qui mérite réellement votre investissement. Vous repartez avec un état des lieux précis et des priorités claires."
      primary={{label:"Recevoir un plan d’action",href:"/contact"}}
    />

    <section className="content-section"><div className="content-label">LE LIVRABLE</div><div>
      <h2>Dites-moi précisément<br/><em>ce qui ne va pas.</em></h2>
      <p>L’objectif est de vous donner une réponse claire : une analyse de votre indexation, de votre technique et de vos pages, une lecture des requêtes et de vos intentions de recherche, et une liste priorisée des actions à mener.</p>
      <ul className="check-list"><li>Analyse de l’indexation, de la technique et des pages existantes</li><li>Lecture des requêtes, concurrents et intentions de recherche</li><li>Gravité et priorisation de chaque point identifié</li><li>Plan d’action SEO sur 90 jours</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">MESURE DE LA GRAVITÉ</div><div>
      <h2>Des priorités,<br/><em>pas une liste sans fin.</em></h2>
      <p>Un bon audit ne se contente pas d’énumérer des problèmes. Chaque point est évalué par son impact et son effort, afin de vous montrer ce qu’il faut corriger en premier et ce qui peut attendre.</p>
      <p>Vous repartez avec une feuille de route que vous — ou votre équipe — pouvez utiliser immédiatement.</p>
    </div></section>

    <section className="content-section"><div className="content-label">ET ENSUITE</div><div>
      <h2>À vous de jouer,<br/><em>ou je m’en occupe.</em></h2>
      <p>L’audit vous appartient. Vous pouvez mettre en œuvre le plan vous-même, ou me confier la correction et le suivi à travers le <a className="text-link" href="/services/referencement-seo-lausanne">service de référencement SEO à Lausanne</a>.</p>
    </div></section>

    <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un audit utile<br/><em>commence par de bonnes questions.</em></h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

    <section className="soft-cta"><p>Besoin d’un regard clair sur votre situation ?</p><a className="button primary" href="/contact">Parler de votre projet <span>↗</span></a></section>
  </main><Footer /></>;
}
