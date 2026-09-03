import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Réalisations web et SEO — SebWebSwiss",
  description: "Découvrez les sites web créés et optimisés par SebWebSwiss, en Suisse romande comme à l’international.",
  alternates: { canonical: "/realisations" },
};

const projets = [
  ["01", "Hexa Power Solutions", "Croatie · Projet international", "Site professionnel pour une entreprise technique.", "/realisations/hexapower-solutions"],
  ["02", "Metropolis", "Croatie · Projet international", "Site pour un café-bar urbain à Rijeka.", "/realisations/metropolis-grad-rijeka"],
  ["03", "Base-Line", "Croatie · Projet international", "Site pour une entreprise de chapes et finitions.", "/realisations/base-line"],
];

export default function Page() {
  return <><Header/><main>
    <PageHero
      kicker="RÉALISATIONS · INTERNATIONAL"
      crumbs={[{label:"Réalisations"}]}
      title={<>Des projets web menés<br/><em>en Suisse romande et à l’international.</em></>}
      intro="Chaque projet est l’occasion d’appliquer une méthode concrète : comprendre le besoin, concevoir une solution claire, la développer avec soin et la faire évoluer. Voici quelques réalisations récentes."
      primary={{label:"Parler de votre projet",href:"/contact"}}
    />
    <section className="content-section"><div className="content-label">PORTFOLIO</div><div>
      <h2>Une expérience<br/><em>au-delà des frontières.</em></h2>
      <p>Ces projets ont été menés en Croatie. Ils illustrent la façon dont je travaille : un interlocuteur direct, des décisions expliquées et des solutions techniques adaptées à chaque activité.</p>
      <div className="service-list">
        {projets.map(([n,name,tag,desc,href])=><a className="service-card" key={n} href={href}><span>{n}</span><div><h3>{name}</h3><p>{desc}</p></div><b>↗</b></a>)}
      </div>
    </div></section>
    <section className="soft-cta"><p>Un projet similaire au vôtre ?</p><a className="button primary" href="/contact">Discuter de votre idée <span>↗</span></a></section>
  </main></>;
}
