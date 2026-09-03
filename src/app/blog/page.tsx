import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Conseils SEO, web et performance — Blog SebWebSwiss",
  description: "Guides pratiques sur le référencement SEO, la création de sites web et la performance, rédigés par Sébastien pour les entreprises de Suisse romande.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <><Header/><main>
    <PageHero
      kicker="BLOG · CONSEILS WEB & SEO"
      crumbs={[{label:"Blog"}]}
      title={<>Conseils web, SEO<br/><em>et performance.</em></>}
      intro="Des guides pratiques pour comprendre le référencement, créer un site qui fonctionne et éviter les pièges coûteux. Bientôt, de nouveaux articles ici."
      primary={{label:"Me contacter",href:"/contact"}}
    />
    <section className="content-section"><div className="content-label">À VENIR</div><div>
      <h2>Des réponses claires<br/><em>pour vos questions digitales.</em></h2>
      <p>Je publie ici des articles pour vous aider à décider avec clarté : combien coûte un site, pourquoi vous n’apparaissez pas sur Google, SEO ou Google Ads, et bien d’autres sujets pratiques.</p>
      <p>Les premiers guides arrivent prochainement. En attendant, posez-moi votre question directement.</p>
      <a className="text-link" href="/contact">Posez votre question ↗</a>
    </div></section>
    <section className="soft-cta"><p>Une question sur votre présence en ligne ?</p><a className="button primary" href="/contact">Me contacter <span>↗</span></a></section>
  </main></>;
}
