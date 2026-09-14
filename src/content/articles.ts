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
          { text: " publie des budgets indicatifs pour les PME de Suisse romande." },
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
          ["Combien coûte un site web pour une PME à Lausanne ?", "Tout dépend de la structure et des fonctionnalités : un site vitrine soigné ne se joue pas à quelques centaines de francs, et une boutique change beaucoup la facture. Ma page sur la création de site publie des budgets indicatifs pour vous situer avant de discuter."],
          ["Mieux vaut une agence ou un indépendant ?", "L’important n’est pas la taille du prestataire mais la personne qui travaille réellement sur votre projet. Posez à l’un et à l’autre les questions de cet article et comparez les réponses."],
          ["Combien de temps faut-il pour créer un site ?", "Pour un site vitrine, comptez en général quelques semaines entre le premier échange et la mise en ligne. Le délai dépend beaucoup de la rapidité de vos retours sur les maquettes et les textes."],
          ["Peut-on changer d’agence plus tard ?", "Oui, si le domaine, l’hébergement et le code sont à votre nom. C’est précisément pour cela que cette question figure dans la liste de cet article."],
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