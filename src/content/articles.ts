import { business } from "@/content/business";

/** An inline content segment: plain text, or text wrapped in an internal link. */
export type Inline = { text: string; link?: string };

/** Typed content block. Keeps article layouts data-driven instead of duplicating page code. */
export type ArticleBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; content: Inline[] }
  | { kind: "list"; items: string[] }
  | { kind: "faq"; items: readonly [string, string][] };

export type Article = {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  intro: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; url: string };
  /** Absolute URL of the article image (Open Graph + BlogPosting). */
  image: string;
  sections: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "comment-choisir-agence-web-lausanne",
    kicker: "CRÉATION DE SITE WEB",
    title: "Comment choisir une agence web à Lausanne ?",
    description: "Guide pratique pour choisir une agence web à Lausanne : besoin, budget, portfolio, interlocuteur, expertise technique, SEO et questions à poser avant de signer.",
    intro: "Le bon prestataire fait la différence entre un site qui rapporte et un site qui dort. Voici les points concrets à vérifier avant de signer, sans jargon inutile.",
    excerpt: "Budget, portfolio, interlocuteur, SEO, propriété du site et support : les points concrets à vérifier avant de choisir une agence à Lausanne.",
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-choisir-agence-web.png",
    sections: [
      {
        kind: "h2",
        text: "Commencez par votre besoin, pas par le prix",
      },
      {
        kind: "p",
        content: [
          { text: "Avant de comparer des devis, posez une seule question : qu’est-ce que ce site doit apporter à votre entreprise ? Générer des demandes de devis, vendre en ligne, présenter votre savoir-faire, recruter… La réponse change presque tout, du design à la technique." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Si votre offre est claire, un site vitrine bien construit fait souvent le travail. Si vous vendez des produits, le besoin est plus lourd : catalogue, paiement, gestion des commandes. Un prestataire sérieux commence par vous écouter avant de vous montrer quoi que ce soit." },
        ],
      },
      {
        kind: "list",
        items: [
          "les services ou produits que vous vendez le mieux",
          "les personnes que vous voulez toucher en priorité",
          "le budget que vous pouvez investir sur trois ans",
          "l’objectif principal : notoriété, contacts ou ventes",
        ],
      },
      {
        kind: "h2",
        text: "Comprendre ce que contient réellement un devis",
      },
      {
        kind: "p",
        content: [
          { text: "Le prix d’un site varie du simple au triple : ce qui change, c’est ce qu’il y a dedans. Un devis sérieux détaille la structure, le nombre de pages, la rédaction, le design, le référencement, les tests et la mise en ligne. Un prix « à partir de » sans rien derrière est un signal d’alerte." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Demandez précisément ce qui est inclus : combien de pages, quelles fonctionnalités, quelle gestion mobile, et qui rédige vos textes. La rédaction coûte du temps, c’est souvent elle qui fait la différence sur le référencement." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour vous situer avant de discuter, " },
          { text: "mon service de création de site", link: "/services/creation-site-internet-lausanne" },
          { text: " vous aide à cadrer le projet, avec un échange direct pour clarifier le budget selon votre besoin." },
        ],
      },
      {
        kind: "h2",
        text: "Le portfolio : lisez-le comme une preuve",
      },
      {
        kind: "p",
        content: [
          { text: "Un beau site dans un portfolio ne prouve pas grand-chose. Ce qui compte : des projets récents, proches de votre type de besoin, et des sites qu’on a envie de visiter plutôt que d’admirer." },
        ],
      },
      {
        kind: "list",
        items: [
          "les sites présentés se chargent-ils rapidement ?",
          "le design est-il adapté au métier de chaque client ?",
          "les projets décrivent-ils des résultats concrets ?",
          "les références sont-elles vérifiables ?",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour voir comment j’aborde des besoins différents, je vous invite à parcourir " },
          { text: "mes réalisations récentes", link: "/realisations" },
          { text: " et à ouvrir les sites présentés sur votre téléphone." },
        ],
      },
      {
        kind: "h2",
        text: "Savoir qui travaillera réellement sur votre projet",
      },
      {
        kind: "p",
        content: [
          { text: "Dans une grande agence, le commercial qui vous reçoit n’est pas forcément la personne qui construit le site. Demandez simplement : qui dessine, qui développe, et qui répond après la mise en ligne ?" },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Aujourd’hui, " },
          { text: "je travaille en indépendant", link: "/" },
          { text: " près de Lausanne : sur un projet, je suis celui qui écoute, qui conçoit et qui développe. Si vous rencontrez une agence, posez la même question et retenez le prénom de la personne qui devra y répondre." },
        ],
      },
      {
        kind: "h2",
        text: "Repérer la qualité technique sans être informaticien",
      },
      {
        kind: "p",
        content: [
          { text: "Le code ne se voit pas sur une maquette, mais il se voit à l’usage. Trois signes accessibles à tous : la page se charge vite, elle reste propre sur un téléphone, et le site est simple à modifier sans repasser par l’agence à chaque mot." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Bon réflexe : demandez à ouvrir le site sur un vrai mobile, en 4G, plutôt que de regarder une démonstration sur grand écran. C’est là que les choix techniques se remarquent." },
        ],
      },
      {
        kind: "h2",
        text: "Le référencement se prévoit dès le départ",
      },
      {
        kind: "p",
        content: [
          { text: "Un site beau mais invisible sur Google ne sert à rien. Le référencement n’est pas une option qu’on ajoute à la fin : il dépend de la structure, de la vitesse et du contenu dès la conception." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Demandez ce qui est prévu dans le projet : textes optimisés, balises, vitesse, sitemap — et qui s’en occupe après la mise en ligne. Pour aller plus loin, j’ai écrit un " },
          { text: "guide sur le SEO local à Lausanne", link: "/blog/seo-local-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Si vous préférez une vision complète de la démarche, " },
          { text: "mon service de référencement SEO à Lausanne", link: "/services/referencement-seo-lausanne" },
          { text: " détaille ce qu’un accompagnement inclut." },
        ],
      },
      {
        kind: "h2",
        text: "Vérifier que votre site vous appartient",
      },
      {
        kind: "p",
        content: [
          { text: "Votre site repose sur trois éléments : le nom de domaine, l’hébergement et le code. S’ils sont au nom de l’agence, vous dépendez d’elle pour le moindre changement, y compris pour partir. Cette question de propriété doit être réglée avant la signature, pas après." },
        ],
      },
      {
        kind: "h2",
        text: "Prévoir la suite après la mise en ligne",
      },
      {
        kind: "p",
        content: [
          { text: "Un site n’est jamais totalement terminé : mises à jour de sécurité, sauvegardes, petites corrections, nouveaux contenus. Un prestataire fiable vous dit clairement ce qui se passe un mois et un an après le lancement, et ce que cela coûte." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Si vous préférez ne pas gérer la technique vous-même, mon offre " },
          { text: "d’hébergement et de maintenance", link: "/services/hebergement-maintenance-web" },
          { text: " couvre précisément ces points." },
        ],
      },
      {
        kind: "h2",
        text: "Les questions à poser avant de signer",
      },
      {
        kind: "list",
        items: [
          "qui travaille sur mon projet et comment vous joindre ?",
          "puis-je modifier le site moi-même et comment ?",
          "que se passe-t-il en cas de panne : sauvegardes, sécurité ?",
          "quels sont les délais et à quoi sont-ils dus ?",
          "le référencement est-il inclus dès le départ ?",
          "domaine, hébergement, code : à mon nom ou au vôtre ?",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Des réponses claires à ces questions valent mieux qu’un devis bas. C’est ainsi que vous reconnaîtrez une " },
          { text: "agence web à Lausanne", link: "/" },
          { text: " qui prend soin de ses clients sur la durée." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Combien coûte un site web pour une PME à Lausanne ?", "Tout dépend de la structure et des fonctionnalités : un site vitrine soigné ne se joue pas à quelques centaines de francs, et une boutique change beaucoup la facture. Un échange direct permet de clarifier le budget selon votre besoin."],
          ["Mieux vaut une agence ou un indépendant ?", "L’important n’est pas la taille du prestataire mais la personne qui travaille réellement sur votre projet. Posez à l’un et à l’autre les questions de cet article et comparez les réponses."],
          ["Combien de temps faut-il pour créer un site ?", "Pour un site vitrine, comptez en général quelques semaines entre le premier échange et la mise en ligne. Le délai dépend beaucoup de la rapidité de vos retours sur les maquettes et les textes."],
          ["Peut-on changer d’agence plus tard ?", "Oui, si le domaine, l’hébergement et le code sont à votre nom. C’est précisément pour cela que cette question figure dans la liste de cet article."],
        ],
      },
    ],
  },
  {
    slug: "seo-local-lausanne",
    kicker: "SEO LOCAL",
    title: "SEO local à Lausanne : le guide pour les PME",
    description: "Comment être trouvé sur Google par les clients près de chez vous : Google Business Profile, avis, contenus et technique, avec les pièges à éviter pour les PME.",
    intro: "Apparaître quand un prospect cherche un service près de chez lui ne doit rien au hasard. Voici les leviers concrets du référencement local, étape par étape.",
    excerpt: "Business Profile, avis clients, contenus et fondations techniques : les leviers concrets du référencement local à Lausanne, et les erreurs qui coûtent cher.",
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-seo-local.png",
    sections: [
      {
        kind: "h2",
        text: "Ce que le SEO local change pour une PME",
      },
      {
        kind: "p",
        content: [
          { text: "Quand quelqu’un cherche un plombier, un dentiste ou une agence web, il veut d’abord une réponse proche de chez lui. Le référencement local consiste à rendre votre entreprise visible dans ces recherches géographiques, sur le moteur comme sur Maps." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour une PME de Lausanne, l’objectif est simple : apparaître en face des recherches qui comptent pour vous, dans votre commune et dans la région. Le reste est une question de méthode, pas de budget publicitaire." },
        ],
      },
      {
        kind: "h2",
        text: "Google Business Profile : la base indispensable",
      },
      {
        kind: "p",
        content: [
          { text: "Votre fiche Google Business Profile est le premier levier du SEO local. Une fiche complète et tenue régulièrement pèse directement dans le classement local et dans la confiance des visiteurs." },
        ],
      },
      {
        kind: "list",
        items: [
          "une catégorie principale cohérente avec votre métier",
          "des horaires à jour, y compris les fermetures",
          "des photos récentes de vos locaux et de vos réalisations",
          "une zone de service définie sans l’étirer à l’excès",
        ],
      },
      {
        kind: "h2",
        text: "La cohérence de vos coordonnées (NAP)",
      },
      {
        kind: "p",
        content: [
          { text: "Nom, adresse, téléphone : ces informations doivent être identiques sur votre site, votre fiche Google et vos annuaires. Une adresse écrite de deux façons différentes sème le doute, chez Google comme chez vos clients." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "N’essayez pas non plus de créer des pages vides pour chaque commune des environs : ces pages portes ne servent pas les visiteurs et peuvent être pénalisées. Une fiche sérieuse vaut mieux que vingt pages creuses." },
        ],
      },
      {
        kind: "h2",
        text: "Des pages de service claires, pas des doublons",
      },
      {
        kind: "p",
        content: [
          { text: "Chaque service mérite une page dédiée qui dit ce que vous faites, pour qui et comment. Une page par service, rédigée pour vos clients, reste la meilleure base pour apparaître sur des recherches précises." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "La structure de ces pages, leurs titres, leur vitesse et leurs textes demandent des réglages précis. C’est le cœur de ce que je propose dans " },
          { text: "mon accompagnement en référencement SEO à Lausanne", link: "/services/referencement-seo-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Les avis clients : un levier à entretenir",
      },
      {
        kind: "p",
        content: [
          { text: "Les avis Google influencent la visibilité locale et la décision de vos clients. Ils ne se commandent pas : ils se demandent naturellement, après une prestation réussie, et méritent toujours une réponse, même quand ils sont négatifs." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Un flux d’avis régulier est aussi un signal de confiance pour les visiteurs qui vous comparent avec un concurrent du même quartier." },
        ],
      },
      {
        kind: "h2",
        text: "Un contenu qui répond aux vraies questions",
      },
      {
        kind: "p",
        content: [
          { text: "Publier sur votre site ou votre blog n’est pas une course à la quantité. C’est l’occasion de répondre aux vraies questions de vos clients : coûts, délais, choix à faire. Ce contenu nourrit vos pages et vous rend visible sur des recherches précises." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ce principe vaut pour tous les métiers. C’est la logique que je détaille " },
          { text: "pour choisir une agence web à Lausanne", link: "/blog/comment-choisir-agence-web-lausanne" },
          { text: " dans un autre guide de ce blog." },
        ],
      },
      {
        kind: "h2",
        text: "Les fondations techniques du site",
      },
      {
        kind: "p",
        content: [
          { text: "Vitesse, sécurité, lisibilité sur mobile : Google en tient compte pour tous les sites, y compris locaux. Un site lent et fragile plombe vos pages, quel que soit votre quartier." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Si votre site actuel repose sur des bases instables, mieux vaut parfois " },
          { text: "créer un nouveau site", link: "/services/creation-site-internet-lausanne" },
          { text: " sur de bonnes fondations que réparer sans fin l’existant." },
        ],
      },
      {
        kind: "h2",
        text: "Le maillage interne : relier vos pages entre elles",
      },
      {
        kind: "p",
        content: [
          { text: "Reliez vos pages entre elles avec des textes qui décrivent vraiment ce qu’on trouve derrière chaque lien. Un bon maillage aide Google à comprendre votre site et vos visiteurs à avancer vers un contact." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Chaque page de service devrait être pointée depuis la page d’accueil et depuis vos textes de présentation, avec un libellé naturel plutôt qu’un « cliquez ici »." },
        ],
      },
      {
        kind: "h2",
        text: "L’autorité : se faire citer, sans tricher",
      },
      {
        kind: "p",
        content: [
          { text: "Être cité par de vrais sites — presse locale, associations, partenaires, fournisseurs — renforce la crédibilité de votre nom d’entreprise et de votre domaine." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "En revanche, payer pour figurer sur cent annuaires le même jour ne sert à rien et peut même nuire. Quelques citations de qualité, cohérentes avec votre activité, suffisent largement." },
        ],
      },
      {
        kind: "h2",
        text: "Mesurer avec Google Search Console",
      },
      {
        kind: "p",
        content: [
          { text: "La Search Console montre les recherches pour lesquelles votre site apparaît, les pages concernées et ce qui peut être amélioré. C’est votre tableau de bord, gratuit et indispensable." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour aller plus loin qu’un simple constat, " },
          { text: "un audit SEO", link: "/services/audit-seo" },
          { text: " permet de faire le point sur les erreurs techniques, les opportunités de contenu et vos concurrents locaux." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Mesurer, corriger, recommencer : c’est la logique que je détaille dans " },
          { text: "ma méthode de travail", link: "/methode" },
          { text: "." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Combien de temps avant de voir des résultats ?", "Comptez des mois plutôt que des semaines pour des changements durables. En revanche, des améliorations visibles — fiche complète, pages optimisées, avis — se remarquent souvent au bout de quelques semaines."],
          ["Dois-je être présent sur tous les annuaires ?", "Non. Quelques annuaires de qualité, cohérents avec votre secteur et la région, suffisent. La cohérence de vos coordonnées compte plus que leur nombre."],
          ["Faut-il une page par commune ?", "Pas de pages vides. Concentrez-vous sur votre vraie zone de service et créez du contenu uniquement pour les communes où vous pouvez réellement intervenir."],
          ["Le SEO local suffit-il à faire vivre une PME ?", "Il apporte un trafic qualifié, mais il ne remplace ni un site crédible ni une offre solide. Il fonctionne le mieux en complément : fiche soignée, bonnes pages, avis et contenus réguliers."],
        ],
      },
    ],
  },
];

export const getArticle = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const getArticleSlugs = (): string[] => articles.map((a) => a.slug);

export const articleUrl = (slug: string): string => `${business.url}/blog/${slug}`;

export const defaultAuthor = {
  name: "Sébastien",
  url: `${business.url}/a-propos`,
} as const;