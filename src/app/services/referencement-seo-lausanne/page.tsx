import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Référencement SEO à Lausanne",
  description: "Consultant SEO à Lausanne : audit, stratégie de contenu, optimisation technique et accompagnement pour améliorer votre visibilité organique.",
  alternates: { canonical: "/services/referencement-seo-lausanne" },
  openGraph: { url: "https://sebwebswiss.ch/services/referencement-seo-lausanne" },
};

const faqs = [
  ["Combien de temps avant de voir des résultats ?", "Le SEO demande du temps. Les premiers signaux peuvent apparaître après quelques semaines, mais une progression durable se mesure généralement sur plusieurs mois."],
  ["SEO ou Google Ads ?", "Cela dépend de votre objectif. Le SEO construit une visibilité durable ; Google Ads donne des résultats rapides mais payants. Je vous aide à choisir selon votre situation."],
  ["Travaillez-vous avec une équipe ?", "J’interviens en direct : un seul interlocuteur, de l’analyse à la mise en place. Vous savez toujours qui travaille sur votre projet."],
  ["Puis-je voir ce que vous faites ?", "Oui. Je m’appuie sur des données réelles (Search Console), avec des priorités claires expliquées tout au long de l’accompagnement."],
  ["Combien coûte le SEO ?", "Chaque projet est différent. Après un premier échange, je propose une approche adaptée à vos objectifs et à votre budget."],
];

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Référencement SEO à Lausanne",
    serviceType: "Référencement SEO",
    provider: { "@id": "https://sebwebswiss.ch/#organization" },
    url: "https://sebwebswiss.ch/services/referencement-seo-lausanne",
    areaServed: ["Lausanne", "Lutry", "Canton de Vaud", "Suisse romande"],
  };

  return <><Header/><main>
    <JsonLd data={serviceSchema} />

    <PageHero
      kicker="RÉFÉRENCEMENT SEO · LAUSANNE"
      crumbs={[{label:"Services",href:"/services"},{label:"Référencement SEO à Lausanne"}]}
      title={<>Référencement SEO à Lausanne<br/><em>pour votre entreprise.</em></>}
      intro="Le référencement naturel demande une méthode, du temps et des décisions prioritaires. Je vous aide à comprendre ce qui freine votre visibilité et à avancer étape par étape."
      primary={{label:"Demander un diagnostic initial",href:"/contact"}}
    />

    <section className="trust-bar" aria-label="Points clés"><span><strong>Données réelles</strong>, pas de promesses</span><span className="dot">·</span><span><strong>5 ans</strong> de projets web</span><span className="dot">·</span><span>Basé <strong>près de Lausanne</strong></span><span className="dot">·</span><span><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phoneDisplay}</a></span></section>

    <section className="content-section"><div className="content-label">CE QUE JE FAIS</div><div>
      <h2>Une approche structurée,<br/><em>sans promesse irréaliste.</em></h2>
      <p>Chaque intervention commence par la compréhension de votre activité, de vos priorités et de votre situation actuelle. Je privilégie des recommandations utiles, réalisables et adaptées à votre contexte.</p>
      <ul className="check-list"><li>Audit technique et analyse de l’indexation</li><li>Recherche d’intentions et structure de contenu</li><li>Optimisation SEO on-page et maillage interne</li><li>Suivi des données Search Console et priorités adaptées</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">L’APPROCHE</div><div>
      <h2>Le SEO pour générer<br/><em>une visibilité durable.</em></h2>
      <p>Le référencement naturel ne se résume pas à une liste de mots-clés ou à un audit. C’est un travail continu qui demande une méthode, des priorités claires et un suivi régulier selon l’accompagnement choisi.</p>
      <p>Mon approche est directe : je construis, j’explique et j’optimise — sans intermédiaire. Vous savez toujours ce qui est fait, pourquoi, et ce que cela apporte à votre visibilité.</p>
      <a className="text-link" href="/realisations">Voir mes réalisations ↗</a>
    </div></section>

    <section className="content-section"><div className="content-label">L’ANALYSE</div><div>
      <h2>Ce que j’analyse<br/><em>avant d’agir.</em></h2>
      <p>Une stratégie commence par un état des lieux précis. Je regarde plusieurs dimensions pour identifier ce qui freine réellement votre visibilité.</p>
      <ul className="check-list"><li>Indexation — qualité du crawl, sitemap, pages réellement indexées dans Search Console</li><li>Technique — rapidité, mobile, Core Web Vitals</li><li>Contenu et intentions de recherche — ce que vos futurs clients cherchent réellement</li><li>SEO local — fiche Google Business Profile, NAP cohérent (nom, adresse, téléphone)</li><li>Maillage interne — liens entre vos pages pour structurer l’autorité</li><li>Expérience utilisateur — clarté, navigation, message</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">SEO TECHNIQUE</div><div>
      <h2>La technique,<br/><em>ce qui se passe sous le capot.</em></h2>
      <p>Une partie du travail se joue avant même les contenus : la structure des pages et de la navigation, la rapidité, l’expérience mobile, l’indexation, le sitemap et les données structurées. Sans une base technique saine, le meilleur contenu a du mal à porter ses fruits.</p>
      <p>Beaucoup de ces fondations dépendent de la façon dont un site est construit dès le départ. C’est précisément l’objet de la <a className="text-link" href="/services/creation-site-internet-lausanne">création de sites internet à Lausanne</a> : une structure propre, des pages rapides et des bases SEO posées pendant le développement, pas après.</p>
      <ul className="check-list"><li>Structure des URL et profondeur de navigation</li><li>Performance et expérience mobile (Core Web Vitals)</li><li>Indexation, sitemap et balises techniques</li><li>Données structurées cohérentes avec le contenu visible</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">CONTENU</div><div>
      <h2>Optimisation du contenu,<br/><em>répondre à l’intention de recherche.</em></h2>
      <p>Le contenu est le cœur du référencement : chaque page doit répondre clairement à la question que se pose votre futur client, avec une structure de titres logique, un maillage interne utile et une écriture humaine — pas une liste de mots-clés.</p>
      <p>Avant d’écrire, je regarde ce que vos visiteurs cherchent réellement et ce que les résultats actuels de Google proposent, puis je construis une page plus utile. C’est une des premières briques de l’<a className="text-link" href="/services/audit-seo">audit SEO</a>.</p>
      <ul className="check-list"><li>Titres et hiérarchie (H1, H2, H3) alignés sur l’intention</li><li>Des réponses utiles, pas de phrases bourrées de mots-clés</li><li>Maillage interne naturel vers les pages utiles</li><li>Mise à jour régulière selon les signalements réels</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">MA MÉTHODE</div><div>
      <h2>Une méthode simple.<br/><em>Des étapes claires.</em></h2>
      <p>Un projet avance mieux lorsque les décisions sont prises dans le bon ordre. Je vous accompagne avec des étapes compréhensibles et des échanges directs.</p>
      <ul className="check-list"><li>Audit — état des lieux technique, indexation et contenu</li><li>Priorisation — décider ce qui compte vraiment, sans dispersion</li><li>Implémentation — corrections et optimisations sur votre site</li><li>Mesure — suivi des données dans Search Console selon l’accompagnement choisi</li><li>Amélioration — ajustements réguliers en fonction des résultats</li></ul>
    </div></section>

    <section className="content-section"><div className="content-label">SEO LOCAL</div><div>
      <h2>Être visible<br/><em>à Lausanne et près de chez vous.</em></h2>
      <p>Le SEO local aide votre entreprise à être visible pour les recherches à Lausanne, Lutry, dans le canton de Vaud et en Suisse romande — les clients qui se trouvent à proximité de votre activité.</p>
      <p>Cela passe par une fiche Google Business Profile complète, des données NAP cohérentes (nom, adresse, téléphone) et un contenu qui répond aux intentions locales de recherche.</p>
    </div></section>

    <section className="content-section"><div className="content-label">MESURE</div><div>
      <h2>Search Console<br/><em>et mesure des résultats.</em></h2>
      <p>Je m’appuie sur les données réelles de Google Search Console : les pages, les requêtes et les positions. Plutôt que de deviner, je lis ce que Google montre.</p>
      <p>Un suivi régulier est prévu selon l’accompagnement choisi — avec des priorités définies en fonction de vos objectifs et de votre situation.</p>
    </div></section>

    <section className="content-section"><div className="content-label">TRANSPARENCE</div><div>
      <h2>Ce que le SEO peut —<br/><em>et ne peut pas — garantir.</em></h2>
      <p><strong>Oui, le SEO peut :</strong></p>
      <ul className="check-list"><li>améliorer durablement votre visibilité sur Google</li><li>vous apporter des demandes de contact qualifiées</li><li>faire grandir votre présence locale à Lausanne et en Suisse romande</li><li>construire une autorité solide au fil du temps</li></ul>
      <p><strong>Non, le SEO ne peut pas :</strong></p>
      <ul className="check-list"><li>garantir une position #1 (personne ne le peut honnêtement)</li><li>donner des résultats instantanés</li><li>remplacer un contenu et une offre de qualité</li></ul>
      <p>Je préfère une approche honnête à des promesses irréalistes. C’est précisément ce qui vous permet de décider avec clarté.</p>
    </div></section>

    <section className="content-section"><div className="content-label">MODÈLES D’ACCOMPAGNEMENT</div><div>
      <h2>Une collaboration<br/><em>adaptée à votre besoin.</em></h2>
      <ul className="check-list"><li>Audit initial — un état des lieux clair : ce qui freine votre visibilité, les priorités et les actions à mener</li><li>Mission SEO — mise en place et optimisation de votre référencement sur une durée définie</li><li>Accompagnement continu — un suivi régulier selon vos besoins, avec des priorités définies ensemble en fonction de l’accompagnement choisi</li></ul>
      <p>Chaque projet commence par un échange pour comprendre votre activité et vos objectifs. Les modalités et le budget sont définis avant tout engagement.</p>
    </div></section>

    <section className="content-section"><div className="content-label">EXPÉRIENCE</div><div>
      <h2>Une expérience<br/><em>construite sur des projets réels.</em></h2>
      <p>Mon expertise technique s’appuie sur cinq années de projets web, notamment à l’international. Aujourd’hui basé près de Lausanne, je mets cette expérience au service des entreprises de Suisse romande.</p>
      <a className="text-link" href="/realisations">Découvrir mes réalisations ↗</a>
    </div></section>

    <section className="faq"><div><p className="section-kicker">QUESTIONS FRÉQUENTES</p><h2>Un projet SEO<br/><em>commence par de bonnes questions.</em></h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

    <section className="soft-cta"><p>Besoin d’un regard clair sur votre situation ?</p><a className="button primary" href="/contact">Parler de votre projet <span>↗</span></a></section>
  </main></>;
}
