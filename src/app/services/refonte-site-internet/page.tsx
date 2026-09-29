import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Refonte de site internet",
  description: "Refonte de site internet pour améliorer la clarté, la performance, le référencement et la capacité de conversion de votre présence digitale.",
  alternates: { canonical: "/services/refonte-site-internet" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/services/refonte-site-internet" },
};

const faqs = [
  ["Combien coûte une refonte ?", "Cela dépend de l’ampleur du projet : taille du site, fonctionnalités, contenus à réécrire et niveau d’accompagnement. Après un échange, je clarifie le périmètre et propose une solution."],
  ["Que devient mon référencement actuel ?", "C’est une priorité. Je préserve les URL utiles, je mets en place des redirections et je vérifie l’indexation après la mise en ligne pour protéger votre visibilité."],
  ["Puis-je garder mon hébergement actuel ?", "Oui. Vous restez libre. Si vous préférez déléguer, je peux gérer l’hébergement et le suivi technique après la refonte."],
  ["Refonte ou simple optimisation ?", "Si votre site fonctionne bien, une optimisation peut suffire. Je vous le dis honnêtement lors du premier échange, sans pousser une refonte inutile."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Refonte de site internet",
    serviceType: "Refonte de site internet",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/services/refonte-site-internet",
    areaServed: ["Lausanne", "Lutry", "Canton de Vaud", "Suisse romande"],
  };

  return <><Header/><main>
    <JsonLd data={serviceSchema} />
    <PageHero
      kicker="REFONTE WEB · SUISSE ROMANDE"
      crumbs={[{label:"Services",href:"/services"},{label:"Refonte de site internet"}]}
      title={<>Refonte de site internet<br/><em>pour votre entreprise.</em></>}
      intro="Une refonte ne doit pas seulement changer l’apparence. Elle doit préserver ce qui fonctionne, corriger les freins et améliorer la capacité du site à soutenir vos objectifs."
      primary={{label:"Parler de votre refonte",href:"/contact"}}
    />

    <section className="content-section"><div className="content-label">POURQUOI REFAIRE</div><div>
      <h2>Mieux, pas seulement<br/><em>différent.</em></h2>
      <p>Une refonte est un investissement. Elle a du sens lorsque votre site est lent, difficile à faire évoluer, peu clair pour vos visiteurs ou insuffisant pour vos objectifs. Elle n’est pas nécessaire lorsqu’une optimisation suffit.</p>
      <ul className="check-list"><li>Audit de l’existant avant toute modification</li><li>Identification des freins et de ce qui fonctionne déjà</li><li>Réécriture des contenus avec une intention claire</li><li>Nouvelle architecture, design et performance</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">PROTÉGER LE SEO</div><div>
      <h2>Migrer sans perdre<br/><em>votre visibilité.</em></h2>
      <p>Le risque principal d’une refonte est de perdre ce que vous avez déjà acquis. Aussi j’attache une attention particulière à la préservation de votre référencement : les URL utiles, les redirections et le suivi technique après la migration.</p>
      <ul className="check-list"><li>Préservation et redirection des URL utiles</li><li>Plan de migration contrôlé</li><li>Vérification de l’indexation après mise en ligne</li><li>Suivi post-migration pour corriger les écarts</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">LA MÉTHODE</div><div>
      <h2>Une refonte menée<br/><em>dans le bon ordre.</em></h2>
      <p>Audit de l’existant, définition de la nouvelle architecture, réécriture des contenus, conception du design, développement et mise en ligne contrôlée. Chaque étape est expliquée et validée ensemble.</p>
      <p>Cela permet d’éviter les surprises et de livrer un site plus clair, plus rapide et plus utile pour vos clients.</p>
    </div></section>

    <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Une refonte sereine<br/><em>commence par de bonnes questions.</em></h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

    <section className="soft-cta"><p>Besoin d’un regard clair sur votre situation ?</p><a className="button primary" href="/contact">Parler de votre projet <span>↗</span></a></section>
  </main></>;
}
