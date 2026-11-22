import type { Metadata } from "next";
import Link from "next/link";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Agence web à Pully | Création de site & SEO",
  description:
    "Agence web pour les entreprises de Pully : création de site internet, refonte et SEO local. Basés à Lutry, à une dizaine de minutes, avec un contact direct.",
  alternates: { canonical: "/agence-web-pully" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/agence-web-pully" },
};

const faqs = [
  ["Combien coûte un site internet à Pully ?", "Un site vitrine de 5 à 7 pages démarre à 399 CHF. Le tarif dépend ensuite du nombre de pages, de la rédaction, des fonctionnalités et de l’accompagnement. Une boutique en ligne démarre à 1 290 CHF."],
  ["Où êtes-vous basés ?", "À La Croix-sur-Lutry, à une dizaine de minutes de Pully en voiture. Nous n’avons pas de bureau à Pully : nous venons sur place, ou nous travaillons en visio si c’est plus simple."],
  ["Travaillez-vous avec des professions libérales ?", "Oui. Avocats, thérapeutes, architectes, consultants : ces activités ont besoin d’un site clair, d’une prise de rendez-vous simple et d’une présence locale crédible, sans discours marketing excessif."],
  ["Faut-il un site en français et en anglais à Pully ?", "Cela dépend de votre clientèle. Une partie des habitants de Pully est internationale : si vous les visez, une version anglaise peut être utile. Elle doit être pensée comme une vraie version, pas comme une traduction automatique."],
  ["Pouvez-vous reprendre un site existant ?", "Oui. Nous commençons par un état des lieux technique et éditorial, puis nous décidons ensemble s’il faut optimiser l’existant ou repartir sur une base neuve."],
  ["Le site sera-t-il visible sur Google ?", "Nous travaillons les bases techniques, la fiche Google et les contenus locaux. Aucune position ne peut être garantie, mais une structure propre et des pages utiles donnent des résultats mesurables en quelques mois."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agence web à Pully",
    serviceType: "Création de site internet et référencement local",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/agence-web-pully",
    areaServed: ["Pully", "Paudex", "Belmont-sur-Lausanne", "Canton de Vaud", "Suisse romande"],
  };
  return (
    <>
      <Header />
      <main>
        <JsonLd data={serviceSchema} />
        <PageHero
          kicker="AGENCE WEB · PULLY"
          crumbs={[{ label: "Agence web à Pully" }]}
          title={<>Agence web à Pully<br /><em>pour votre présence en ligne.</em></>}
          intro="Nous accompagnons les entreprises de Pully qui veulent un site clair, utile et trouvable sur Google — avec un interlocuteur direct, basé à quelques minutes de la commune."
          primary={{ label: "Parler de votre projet", href: "/contact" }}
        />

        <section className="trust-bar" aria-label="Points clés">
          <span><strong>À 10 minutes de Pully</strong></span><span className="dot">·</span>
          <span>Un seul interlocuteur</span><span className="dot">·</span>
          <span>Devis détaillé avant démarrage</span><span className="dot">·</span>
          <span><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phoneDisplay}</a></span>
        </section>

        <section className="content-section"><div className="content-label">PROXIMITÉ</div><div>
          <h2>Une agence à côté de Pully,<br /><em>pas un prestataire anonyme.</em></h2>
          <p>Notre base est à La Croix-sur-Lutry, à une dizaine de minutes de Pully. Nous n’avons pas de bureau à Pully et nous ne prétendons pas le contraire. En revanche, nous venons sur place pour le cadrage, les photos et les points importants — ou nous travaillons en visio si vous préférez.</p>
          <p>Pully est une commune où cohabitent commerces de proximité, professions libérales, sociétés locales et entreprises tournées vers Lausanne. Un site doit refléter cette réalité, pas un modèle standard.</p>
        </div></section>

        <section className="content-section"><div className="content-label">PRIX</div><div>
          <h2>Combien coûte un site internet<br /><em>à Pully ?</em></h2>
          <p>Un site vitrine de 5 à 7 pages démarre à 399 CHF. Le tarif dépend ensuite du nombre de pages, de la rédaction, des fonctionnalités et de l’accompagnement. Une boutique en ligne démarre à 1 290 CHF.</p>
          <ul className="check-list">
            <li>Site vitrine : dès 399 CHF</li>
            <li>Refonte : dès 399 CHF</li>
            <li>Boutique en ligne : dès 1 290 CHF</li>
            <li>SEO local : dès 149 CHF par mois</li>
            <li>Accompagnement complet : dès 399 CHF par mois</li>
          </ul>
          <p>Le devis précise ce qui est inclus : pages, rédaction, intégration, bases SEO, mise en ligne et suivi. Vous savez ce que vous achetez avant de signer.</p>
        </div></section>

        <section className="content-section"><div className="content-label">DÉLAIS</div><div>
          <h2>Quel délai pour un site<br /><em>à Pully ?</em></h2>
          <p>Un site vitrine dont les contenus sont prêts demande quelques semaines. Une refonte ou une boutique prennent plus de temps, surtout si les textes et les photos doivent être produits.</p>
          <ul className="check-list">
            <li>Premier échange : 15 minutes pour cadrer le besoin</li>
            <li>Structure et contenus : une à deux semaines</li>
            <li>Conception et développement : deux à quatre semaines</li>
            <li>Tests, mise en ligne et suivi : quelques jours</li>
          </ul>
          <p>Le calendrier est posé avant le démarrage. Si un contenu manque, nous le signalons plutôt que de décaler la livraison en silence.</p>
        </div></section>

        <section className="content-section"><div className="content-label">VISIBILITÉ</div><div>
          <h2>Comment être visible<br /><em>à Pully et vers Lausanne ?</em></h2>
          <p>Pully est proche de Lausanne : la concurrence sur Google y est réelle. Une petite entreprise ne gagne pas en copiant les grandes agences, mais en étant claire sur ce qu’elle fait, pour qui, et dans quelle zone.</p>
          <ul className="check-list">
            <li>Fiche Google Business Profile complète et à jour</li>
            <li>Pages par service, avec une réponse claire à chaque intention</li>
            <li>Avis clients récents et visibles</li>
            <li>Cohérence du nom, de l’adresse et du téléphone sur le web</li>
            <li>Mesure des appels, des demandes et des positions</li>
          </ul>
          <p>Pour aller plus loin, voir le <Link className="text-link" href="/services/referencement-seo-lausanne">référencement SEO local</Link> et le <Link className="text-link" href="/check-up-site-web">check-up gratuit</Link>.</p>
        </div></section>

        <section className="content-section"><div className="content-label">DONNÉES LOCALES</div><div>
          <h2>Ce que nous observons<br /><em>sur les sites de Pully.</em></h2>
          <p>En novembre 2026, nous avons analysé les sites publics de 22 associations et clubs de Pully, à partir de l’annuaire local.</p>
          <ul className="check-list">
            <li>17 sur 22 (77 %) n’ont pas de page de confidentialité accessible</li>
            <li>7 sur 22 (32 %) n’ont pas de meta description</li>
            <li>1 sur 22 (5 %) n’a pas de balise viewport</li>
            <li>Note technique moyenne : 65/100</li>
          </ul>
          <p>Ces sites ne sont pas mauvais : ils sont souvent anciens et pensés pour informer les membres, pas pour être trouvés. C’est un angle d’amélioration simple, avant même de parler de design.</p>
          <p>Méthode : pages d’accueil publiques, outil automatique, novembre 2026. Ce n’est pas un audit juridique.</p>
        </div></section>

        <section className="content-section"><div className="content-label">ACTIVITÉS</div><div>
          <h2>Avec quels types d’activités<br /><em>travaillons-nous à Pully ?</em></h2>
          <p>Nous voyons surtout trois profils : des professions libérales qui ont besoin d’un site sobre et crédible, des commerces et restaurants qui doivent être trouvés localement, et des associations qui cherchent à informer et à recruter.</p>
          <p>À cela s’ajoute une clientèle internationale : si votre activité s’adresse aussi à des habitants non francophones, une version anglaise bien faite peut faire la différence. Elle ne doit pas être une traduction automatique.</p>
        </div></section>

        <section className="content-section"><div className="content-label">REFONTE</div><div>
          <h2>Faut-il refaire le site<br /><em>ou l’optimiser ?</em></h2>
          <p>Si votre site est rapide, lisible sur mobile et que vous pouvez modifier les contenus sans appeler un développeur, une optimisation suffit souvent. Si l’interface est datée, lente ou impossible à mettre à jour, la refonte devient plus rentable.</p>
          <ul className="check-list">
            <li>Vérifiez d’abord l’indexation et la vitesse</li>
            <li>Regardez ce que les visiteurs ne trouvent pas</li>
            <li>Décidez ensuite : optimisation ciblée ou nouvelle base</li>
          </ul>
          <p>La <Link className="text-link" href="/services/refonte-site-internet">refonte de site internet</Link> peut conserver les contenus et le référencement existants lorsqu’ils fonctionnent.</p>
        </div></section>

        <section className="content-section"><div className="content-label">PROJET</div><div>
          <h2>Comment se passe un projet<br /><em>quand on est à Pully ?</em></h2>
          <p>Le premier échange dure 15 minutes. Ensuite, nous fixons le périmètre, le prix et le calendrier. Les points importants se font sur place ou en visio, selon ce qui vous arrange.</p>
          <p>Vous gardez le même interlocuteur du premier appel à la mise en ligne. Pas de commercial qui disparaît après la signature.</p>
          <Link className="text-link" href="/contact">Demander un premier échange ↗</Link>
        </div></section>

        <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un projet à Pully<br /><em>commence par une question.</em></h2></div><div className="faq-list">
          {faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
        </div></section>

        <section className="soft-cta"><p>Vous avez un projet de site internet à Pully ?</p><a className="button primary" href="/contact">Demander un premier échange <span>↗</span></a></section>
      </main>
      <Footer />
    </>
  );
}
