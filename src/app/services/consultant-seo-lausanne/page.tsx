import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Consultant SEO à Lausanne",
  description: "Consultant SEO à Lausanne pour un accompagnement stratégique : prioriser les actions, encadrer votre équipe et prendre les bonnes décisions.",
  alternates: { canonical: "/services/consultant-seo-lausanne" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/services/consultant-seo-lausanne" },
};

const faqs = [
  ["Cette formule convient-elle à mon équipe ?", "Oui. C’est précisément le rôle d’un consultant : vous aider à décider quoi faire et comment, tout en laissant l’exécution à votre équipe ou à votre prestataire."],
  ["Différence avec le service référencement ?", "Le service de référencement SEO consiste à faire le travail pour vous. La consultation vise à vous donner des conseils, une méthode et une roadmap pour piloter vous-même."],
  ["Comment se déroule un accompagnement ?", "Après un premier échange, nous définissons ensemble une cadence (ponctuelle ou régulière). Chaque session s’appuie sur des données réelles et des priorités claires."],
  ["Travaillez-vous avec une équipe ?", "J’interviens en direct : un seul interlocuteur, qui comprend votre activité et vos priorités. Vous savez toujours qui vous conseille."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Consultant SEO à Lausanne",
    serviceType: "Consultant SEO",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/services/consultant-seo-lausanne",
    areaServed: ["Lausanne", "Lutry", "Canton de Vaud", "Suisse romande"],
  };

  return <><Header/><main>
    <JsonLd data={serviceSchema} />
    <PageHero
      kicker="CONSEIL SEO · LAUSANNE"
      crumbs={[{label:"Services",href:"/services"},{label:"Consultant SEO à Lausanne"}]}
      title={<>Consultant SEO à Lausanne<br/><em>pour guider vos décisions.</em></>}
      intro="Vous avez déjà un site, une équipe ou un prestataire ? Je vous apporte un regard extérieur pour clarifier vos priorités et construire une stratégie SEO exploitable."
      primary={{label:"Demander un diagnostic initial",href:"/contact"}}
    />

    <section className="content-section"><div className="content-label">POUR QUI</div><div>
      <h2>Un accompagnement stratégique,<br/><em>lorsque vous pilotez.</em></h2>
      <p>Cette prestation est faite pour vous si vous avez déjà une équipe interne ou un prestataire, mais que vous manquez de clarté sur les priorités. Plutôt que de faire le travail à votre place, je vous aide à décider quoi faire et comment.</p>
      <ul className="check-list"><li>Conseil ponctuel ou accompagnement régulier</li><li>Lecture des données et définition d’indicateurs utiles</li><li>Plans d’action adaptés à vos ressources</li><li>Points de suivi et décisions documentées</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">MON RÔLE</div><div>
      <h2>Dites-moi ce que votre équipe<br/><em>doit faire.</em></h2>
      <p>En tant que consultant, je me concentre sur le conseil, la méthode et la priorisation : une road-map claire, un mentoring de votre équipe, une second opinion sur vos choix, et un accompagnement de votre développeur ou de votre responsable marketing.</p>
      <p>Vous gardez la main sur l’exécution, avec une direction plus claire à chaque étape.</p>
    </div></section>

    <section className="content-section"><div className="content-label">LA DIFFÉRENCE</div><div>
      <h2>Consultation ou référencement ?<br/><em>Deux besoins différents.</em></h2>
      <p>Si vous souhaitez que je réalise l’audit, l’optimisation et le suivi de votre référencement, je vous oriente vers le <a className="text-link" href="/services/referencement-seo-lausanne">service de référencement SEO à Lausanne</a>. Ici, je vous conseille et vous aide à piloter vos propres actions.</p>
      <p>Pour un état des lieux précis de votre visibilité, découvrez aussi l’<a className="text-link" href="/services/audit-seo">audit SEO</a>.</p>
    </div></section>

    <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un accompagnement clair<br/><em>commence par de bonnes questions.</em></h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

    <section className="soft-cta"><p>Besoin d’un regard clair sur votre situation ?</p><a className="button primary" href="/contact">Parler de votre projet <span>↗</span></a></section>
  </main><Footer /></>;
}
