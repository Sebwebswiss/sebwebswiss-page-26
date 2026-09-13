import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { realisations } from "@/content/realisations";

export const metadata: Metadata = {
  title: "Réalisations web et SEO — SebWebSwiss",
  description: "Découvrez les sites web créés et optimisés par SebWebSwiss, en Suisse romande comme à l’international.",
  alternates: { canonical: "/realisations" },
};

const projets = realisations;

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
        {projets.map(([n,name,,desc,href])=><a className="service-card" key={n} href={href}><span>{n}</span><div><h3>{name}</h3><p>{desc}</p></div><b>↗</b></a>)}
      </div>
    </div></section>
    <section className="soft-cta"><p>Un projet similaire au vôtre ?</p><a className="button primary" href="/contact">Discuter de votre idée <span>↗</span></a></section>
  </main></>;
}
