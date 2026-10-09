import { business } from "@/content/business";

/** An inline content segment: plain text, or text wrapped in an internal link. */
export type Inline = { text: string; link?: string };

/** Typed content block. Keeps article layouts data-driven instead of duplicating page code. */
export type ArticleBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; content: Inline[] }
  | { kind: "list"; items: string[] }
  | { kind: "callout"; title: string; content: Inline[] }
  | { kind: "faq"; items: readonly [string, string | Inline[]][] };

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
    datePublished: "2026-09-13",
    dateModified: "2026-09-13",
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
    datePublished: "2026-09-13",
    dateModified: "2026-09-13",
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
  {
    slug: "etre-visible-chatgpt-gemini-moteurs-ia",
    kicker: "MOTEURS IA",
    title: "Comment être visible sur ChatGPT, Gemini et les moteurs IA ?",
    description: "Pourquoi une entreprise bien classée sur Google peut rester invisible dans ChatGPT, Gemini ou Perplexity — et ce qu’une PME peut réellement faire pour être citée.",
    intro: "De plus en plus de personnes posent aujourd’hui leurs questions à ChatGPT, Gemini ou Perplexity avant de choisir un prestataire. Voici comment fonctionnent ces réponses et ce qu’une entreprise peut réellement faire pour y être visible.",
    excerpt: "Comprendre comment fonctionnent les réponses IA, ce qui aide une entreprise à être citée, et pourquoi personne ne peut garantir une recommandation.",
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-visible-ia.png",
    sections: [
      {
        kind: "h2",
        text: "Ce que sont vraiment les réponses IA",
      },
      {
        kind: "p",
        content: [
          { text: "Quand quelqu’un pose une question à ChatGPT, Gemini ou Perplexity, le moteur ne renvoie pas une liste de liens : il compose une réponse, en s’appuyant sur des sources qu’il a récupérées et jugées pertinentes pour la question. Votre site peut figurer parmi ces sources. Ou pas." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ces systèmes ne s’appuient pas tous sur les mêmes données. L’un s’appuie sur l’index de recherche de son éditeur, un autre sur des données locales ou des pages publiques, un troisième sur les contenus trouvés en direct au moment de la question. Résultat : une entreprise peut être bien classée sur Google et rester absente d’une réponse IA — et l’inverse est possible." },
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi une entreprise peut rester invisible",
      },
      {
        kind: "p",
        content: [
          { text: "Les moteurs IA sont sélectifs et s’appuient souvent sur quelques sources seulement pour composer une réponse. Une page peu claire, difficile à lire, ou qui ne contient aucune information précise sur l’entreprise, a peu de chances d’être retenue. À l’inverse, une page qui répond directement à une question concrète, avec des faits vérifiables, est un bien meilleur candidat." },
        ],
      },
      {
        kind: "list",
        items: [
          "la page n’est pas indexée, ou bloque les robots d’exploration",
          "l’identité de l’entreprise est floue : nom, localisation, zone d’action",
          "les contenus restent vagues et ne répondent à aucune question précise",
          "rien ne prouve l’activité réelle : projets, références, résultats",
        ],
      },
      {
        kind: "h2",
        text: "Ce qu’une entreprise peut réellement faire",
      },
      {
        kind: "p",
        content: [
          { text: "Il n’existe pas de case à cocher pour « apparaître dans ChatGPT ». Mais il existe des bases claires qui, cumulées, augmentent vos chances d’être cité. Les voici, du plus simple au plus structurant." },
        ],
      },
      {
        kind: "h3",
        text: "Être accessible aux moteurs et aux IA",
      },
{
        kind: "p",
        content: [
          { text: "Une entreprise invisible pour les systèmes qui explorent le web ne peut pas être citée. Les fondations sont bien connues : des pages indexables, un sitemap à jour, des règles claires dans le fichier robots.txt et un site qui reste lisible. Mais l’accès se contrôle différemment d’une plateforme à l’autre." },
        ],
      },
      {
        kind: "list",
        items: [
          "ChatGPT Search : vérifier que OAI-SearchBot n’est pas bloqué dans robots.txt. OpenAI indique qu’une page publique du web peut être affichée dans ChatGPT Search, et que le trafic de renvoi arrive avec utm_source=chatgpt.com, lisible dans vos statistiques.",
          "Google AI Overviews et AI Mode : vérifier dans Google Search Console (Settings → Search generative AI) que le site est autorisé à apparaître dans les fonctionnalités génératives de Google Search, un réglage que Google a généralisé le 31 août 2026. Cet interrupteur ne doit pas être confondu avec Google-Extended dans robots.txt, qui concerne d’autres usages liés aux modèles et non le classement classique.",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ces vérifications sont des prérequis de découvrabilité, pas des garanties de citation. Comme le rappellent les consignes publiées par Google en 2026 pour ses fonctions de recherche génératives, les bases du référencement — contenu utile, pages lisibles, identité cohérente — restent ce qui compte le plus." },
        ],
      },
      {
        kind: "h3",
        text: "Dire précisément qui vous êtes",
      },
      {
        kind: "p",
        content: [
          { text: "Une réponse IA qui cite une entreprise doit pouvoir la décrire sans ambiguïté : nom, activité, localisation, zone d’action. Sur le site, cela passe par une " },
          { text: "page à propos", link: "/a-propos" },
          { text: " claire, des coordonnées cohérentes sur toutes les pages (nom, adresse, téléphone), et une description précise de ce que vous faites. Si vous servez Lausanne et le canton de Vaud, dites-le partout de la même façon." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Cette identité doit être la même sur votre site, sur votre fiche Google Business Profile et sur vos autres mentions. Une divergence entre deux sources suffit à semer le doute chez un moteur qui doit choisir ce qu’il répète." },
        ],
      },
      {
        kind: "h3",
        text: "Produire des contenus utiles et documentés",
      },
      {
        kind: "p",
        content: [
          { text: "Les moteurs IA citent plus volontiers une page qui répond à une question réelle qu’une page commerciale vague. Un article qui explique comment choisir une agence, une " },
          { text: "réalisation qui montre un résultat concret", link: "/realisations" },
          { text: ", une page qui précise votre zone d’intervention : voilà le terreau des citations." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "La première phrase d’un paragraphe compte beaucoup : si elle répond directement à la question, elle a une chance d’être reprise telle quelle dans une réponse. Écrivez pour quelqu’un qui cherche une réponse, pas pour quelqu’un qui lit un prospectus." },
        ],
      },
      {
        kind: "h3",
        text: "Structurer l’information pour être lu",
      },
      {
        kind: "p",
        content: [
          { text: "Les moteurs IA lisent le web en lecteurs rapides : titres clairs, questions visibles, paragraphes courts, langue simple. Une page qui organise l’information est plus facile à comprendre — et donc plus facile à citer. Les données structurées (schema.org) aident à décrire une activité, une zone desservie ou un prix, mais elles ne remplacent ni un contenu utile ni une identité cohérente." },
        ],
      },
      {
        kind: "h3",
        text: "Laisser des preuves : projets, avis, résultats",
      },
      {
        kind: "p",
        content: [
          { text: "Une entreprise recommandable est une entreprise que l’on peut décrire avec des faits. Des réalisations présentées avec du concret, des avis récents et honnêtes, des mentions par d’autres sites : ces signaux disent « cette entreprise existe, travaille et tient ses engagements ». C’est exactement le rôle de la page " },
          { text: "réalisations", link: "/realisations" },
          { text: " de ce site." },
        ],
      },
      {
        kind: "h2",
        text: "Le poids de l’autorité locale",
      },
      {
        kind: "p",
        content: [
          { text: "Pour une recherche comme « création de site internet Lausanne », être visible dans une réponse IA, c’est aussi être reconnu dans sa zone. La cohérence de vos informations sur Lausanne, le canton de Vaud et la Suisse romande, vos échanges avec des acteurs locaux et une présence de terrain crédible pèsent autant que le contenu de vos pages. Ce travail de fond est précisément ce que couvre une stratégie de " },
          { text: "référencement SEO à Lausanne", link: "/services/referencement-seo-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi personne ne peut garantir une recommandation",
      },
      {
        kind: "p",
        content: [
          { text: "Soyons honnêtes : aucun prestataire ne peut garantir qu’une IA vous recommandera un jour. Chaque moteur combine des sources différentes, met à jour ses priorités, et la mention de votre entreprise reste sa propre décision. Méfiez-vous de toute promesse de « position garantie dans les IA » : c’est le signe d’une méthode qu’on vous vend, pas d’une réalité qu’on vous explique." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ce que vous pouvez faire, c’est poser des fondations saines, vérifier régulièrement ce qui change, et mesurer ce qui se passe. C’est exactement la démarche que je détaille dans " },
          { text: "ma méthode de travail", link: "/methode" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Comment mesurer les progrès ?",
      },
      {
        kind: "list",
        items: [
          "tester vous-même les questions que posent vos clients dans ChatGPT, Gemini et Perplexity, et noter si votre entreprise est citée",
          "surveiller les visites qui arrivent depuis ces outils (une visite qui vient d’une réponse IA reste une visite utile)",
          "repérer quelles pages de votre site sont les plus reprises ou les plus visitées",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Il n’existe pas encore de tableau de bord officiel commun aux moteurs IA. La régularité vaut mieux que la technique : les changements se mesurent sur des mois, pas sur des heures." },
        ],
      },
      {
        kind: "h2",
        text: "Par où commencer ?",
      },
      {
        kind: "p",
        content: [
          { text: "Si vous partez de zéro, une " },
          { text: "création de site internet à Lausanne", link: "/services/creation-site-internet-lausanne" },
          { text: " sur de bonnes fondations est le premier pas. Si votre site existe déjà, un " },
          { text: "audit SEO", link: "/services/audit-seo" },
          { text: " permet de vérifier ce qui peut être lu, compris et repris par les moteurs de recherche classiques comme par les IA." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Sur ce blog, le " },
          { text: "guide du SEO local à Lausanne", link: "/blog/seo-local-lausanne" },
          { text: " complète cette approche par les leviers de visibilité dans votre zone, avec Google Business Profile et les avis." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["ChatGPT peut-il vraiment citer mon site ?", "Oui, si votre page est accessible, lisible et retenue lors de la composition d’une réponse. Il s’agit d’une citation de source, pas d’une position dans un classement : votre entreprise peut apparaître sans être « première »."],
          ["Être bien classé sur Google garantit-il d’être cité par les IA ?", "Non. Les moteurs IA combinent leurs propres sources et leurs propres critères. Une bonne visibilité sur Google reste utile, mais elle ne se traduit pas mécaniquement en citations dans les réponses IA."],
          ["Faut-il payer pour apparaître dans ChatGPT ou Gemini ?", "Non. Dans les réponses publiques, aucune place n’est vendue. La prudence s’impose face à des prestataires qui promettent une « position garantie » : une garantie de ce type n’existe pas."],
          ["Faut-il créer un fichier llms.txt ?", "Il peut servir à présenter de manière structurée les contenus importants d’un site à certains outils, mais il ne constitue ni un standard universellement pris en charge ni un facteur garantissant une présence dans ChatGPT, Gemini ou d’autres moteurs IA. Je le considère comme un complément éventuel, pas comme une priorité devant l’indexabilité, la qualité du contenu, l’autorité et la cohérence des informations sur l’entreprise."],
          ["Combien de temps avant de voir des résultats ?", "Des mois plutôt que des semaines, et le mouvement n’est jamais linéaire. La régularité — contenus utiles, informations cohérentes, preuves renouvelées — compte plus qu’un effort ponctuel."],
        ],
      },
    ],
  },
  {
    slug: "combien-coute-un-site-internet-lausanne",
    kicker: "BUDGET WEB",
    title: "Combien coûte un site internet à Lausanne en 2026 ?",
    description: "Ce qui fait réellement varier le prix d’un site web à Lausanne : type de projet, pages, rédaction, SEO, fonctionnalités, maintenance. Et les questions à poser avant tout devis.",
    intro: "Le prix d’un site internet se joue à plusieurs étages : projet, pages, contenus, techniques. Voici comment comprendre ce que vous payez vraiment pour un site à Lausanne, sans fourchettes magiques.",
    excerpt: "Site vitrine, boutique en ligne ou sur-mesure : ce que vous payez vraiment, ce qui fait varier la facture et les questions à poser avant de signer.",
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-prix-site.png",
    sections: [
      {
        kind: "h2",
        text: "Un prix par projet, pas un prix au site",
      },
      {
        kind: "p",
        content: [
          { text: "Le prix d’un site internet à Lausanne dépend de ce que vous commandez réellement : un site vitrine de présentation, une boutique en ligne ou un développement sur mesure n’ont ni le même contenu ni la même charge de travail. Il n’existe donc pas de « prix du site web » — il existe un prix par projet, et c’est normal." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Une chose est sûre : un prix « à partir de » quelques centaines de francs cache presque toujours un périmètre minimaliste, qui ne répondra pas à vos besoins une fois complété. Mieux vaut comprendre le contenu du devis avant de comparer des montants." },
        ],
      },
      {
        kind: "h2",
        text: "Ce qui fait réellement varier la facture",
      },
      {
        kind: "h3",
        text: "Le type de projet",
      },
      {
        kind: "p",
        content: [
          { text: "Site vitrine, e-commerce ou développement sur mesure : la charge de travail n’a rien à voir. Une boutique exige un catalogue, la gestion des commandes et un paiement sécurisé. Un projet sur mesure demande de la conception, des développements de fonctionnalités et des tests. C’est le projet, pas la page, qui décide du prix." },
        ],
      },
      {
        kind: "h3",
        text: "Le nombre de pages et la structure",
      },
      {
        kind: "p",
        content: [
          { text: "Un site de 5 pages ne mobilise pas les mêmes efforts qu’un site de 25 pages. Chaque page demande une structure, des contenus, des choix visuels et une optimisation. Les pages utiles à vos clients apportent de la valeur ; les pages vides coûtent de l’argent sans rien apporter." },
        ],
      },
      {
        kind: "h3",
        text: "Le design et la mise en page",
      },
      {
        kind: "p",
        content: [
          { text: "La direction visuelle, l’interface sur mobile, les déclinaisons selon les écrans : tout cela représente un travail de conception réel. Un site qui ressemble à tous les autres est moins coûteux à produire, mais il vous ressemble aussi moins — et vos visiteurs le remarquent." },
        ],
      },
      {
        kind: "h3",
        text: "La rédaction des contenus",
      },
      {
        kind: "p",
        content: [
          { text: "Qui écrit vos textes ? Si c’est vous, votre temps doit compter. Si c’est le prestataire, la rédaction est un poste à part entière — souvent le plus rentable pour votre référencement. Un contenu qui aide réellement vos clients ne s’écrit pas en une heure." },
        ],
      },
      {
        kind: "h3",
        text: "Le référencement de départ",
      },
      {
        kind: "p",
        content: [
          { text: "Un site construit avec de bonnes bases SEO — structure des pages, titres, performances, indexation, maillage interne — coûte plus cher qu’un site monté sans réflexion. C’est aussi ce qui explique une bonne partie des écarts entre prestataires. Pour un travail de visibilité continue, découvrez " },
          { text: "mon service de référencement SEO à Lausanne", link: "/services/referencement-seo-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "h3",
        text: "Les fonctionnalités",
      },
      {
        kind: "p",
        content: [
          { text: "Formulaire simple, espace client, automatisation, intégration avec vos outils : chaque fonctionnalité demande de la conception, du développement et des tests. Il ne faut payer ni pour des options inutiles, ni pour découvrir à la fin que l’essentiel manquait." },
        ],
      },
      {
        kind: "h3",
        text: "Maintenance, hébergement et domaine",
      },
      {
        kind: "p",
        content: [
          { text: "Un site ne vit pas seul : domaine à renouveler, hébergement, sauvegardes, mises à jour de sécurité, petites corrections. Ces coûts récurrents font partie du budget global — il faut les prévoir dès le départ, pas seulement la première facture. C’est l’objet de " },
          { text: "mon offre d’hébergement et de maintenance", link: "/services/hebergement-maintenance-web" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi je ne publie pas de prix fixes ici",
      },
      {
        kind: "p",
        content: [
          { text: "Pour rester cohérent avec ma manière de travailler, je ne publie pas de fourchettes de prix sur ce site : chaque projet mérite un premier échange avant de devenir un devis précis. Publier des chiffres sans connaître votre besoin vous donnerait une impression de précision qui n’existe pas." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "En revanche, une offre est réellement chiffrée : le " },
          { text: "Programme Fondateur", link: "/offre-lancement" },
          { text: " propose la création d’un site vitrine de 5 à 7 pages, l’hébergement, la maintenance et la mise en place SEO à CHF 0 pendant la première année, pour dix entreprises sélectionnées. Cette offre est ponctuelle et soumise à conditions et à disponibilité : la page du programme fait foi pour les conditions actuelles, et elle ne représente pas le tarif standard d’un site web. Si votre projet est concret, c’est le moyen le plus simple d’obtenir un site sérieux sans ambiguïté sur le prix." },
        ],
      },
      {
        kind: "h2",
        text: "Le piège des devis « à partir de »",
      },
      {
        kind: "p",
        content: [
          { text: "Un prix « à partir de » annoncé sur le site d’une agence signifie souvent que plusieurs postes essentiels ne sont pas dans le devis : rédaction, SEO, pages supplémentaires, maintenance. Avant de comparer deux propositions, vérifiez le contenu de chacune." },
        ],
      },
      {
        kind: "list",
        items: [
          "la rédaction des contenus est-elle incluse ?",
          "les pages supplémentaires sont-elles facturées à part ?",
          "le référencement de départ est-il prévu ?",
          "l’hébergement et le domaine sont-ils compris ?",
          "que coûte la maintenance une fois le site en ligne ?",
        ],
      },
      {
        kind: "h2",
        text: "Les questions à poser avant toute proposition",
      },
      {
        kind: "list",
        items: [
          "qui travaille réellement sur le projet et comment le joindre ?",
          "que contient exactement le devis : pages, fonctionnalités, contenus, SEO ?",
          "le domaine, l’hébergement et le code resteront-ils à mon nom ?",
          "quels sont les délais et les étapes intermédiaires ?",
          "que se passe-t-il un an après la mise en ligne ?",
          "le site sera-t-il pensé pour être trouvé sur Google dès le départ ?",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ces questions figurent aussi, de façon plus détaillée, dans mon guide pour " },
          { text: "choisir une agence web à Lausanne", link: "/blog/comment-choisir-agence-web-lausanne" },
          { text: ". Les réponses que vous obtenez en disent plus long qu’un montant." },
        ],
      },
      {
        kind: "h2",
        text: "À retenir",
      },
      {
        kind: "p",
        content: [
          { text: "Le prix d’un site internet à Lausanne se comprend poste par poste, pas par un tarif unique. Un bon devis détaille le périmètre ; un bon prestataire répond à vos questions avant d’envoyer son prix. C’est la logique que je suis dans " },
          { text: "ma méthode de travail", link: "/methode" },
          { text: "." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour voir le niveau de travail que je vise, parcourez " },
          { text: "mes réalisations", link: "/realisations" },
          { text: " — puis parlons directement de votre projet, sans intermédiaire, via " },
          { text: "la page de contact", link: "/contact" },
          { text: "." },
        ],
      },
      {
        kind: "faq",
        items: [
          [
            "Combien coûte un site vitrine à Lausanne ?",
            [
              { text: "Le prix dépend notamment du nombre de pages, du niveau de personnalisation, de la rédaction, des fonctionnalités et de l’accompagnement prévu après la mise en ligne. C’est pourquoi je préfère établir une proposition à partir du besoin réel plutôt qu’annoncer un tarif unique qui ne correspondrait pas à tous les projets. SebWebSwiss propose également ponctuellement des offres spécifiques, comme le " },
              { text: "Programme Fondateur", link: "/offre-lancement" },
              { text: ", avec des conditions distinctes : elles ne représentent pas le tarif standard d’un projet web." },
            ],
          ],
          ["Combien coûte une boutique en ligne ?", "Une boutique en ligne exige un travail nettement plus important : catalogue, gestion des commandes, paiement, expédition, sécurité. Un échange direct est nécessaire pour cadrer le besoin avant toute estimation."],
          ["Pourquoi les prix varient-ils autant entre agences ?", "Parce que le contenu des devis varie autant que leur montant. Deux propositions au même prix peuvent inclure des choses totalement différentes. Comparez le périmètre, pas seulement le chiffre."],
          ["L’hébergement coûte-t-il cher ?", "Le coût de l’hébergement, du domaine et de la maintenance est un poste récurrent à prévoir chaque année. Ce n’est pas un détail du budget total, mais un engagement qui doit être explicite avant la signature."],
          ["Le référencement est-il inclus dans le prix du site ?", "Les bases SEO peuvent l’être : structure, titres, vitesse, indexation. La visibilité durable, elle, est un accompagnement séparé et suivi dans le temps. Posez la question avant de signer."],
        ],
      },
    ],
  },
  {
    slug: "google-remunere-les-sites-cites-par-l-ia",
    kicker: "NOUVELLE GOOGLE",
    title: "Google commence à rémunérer certains éditeurs pour l’IA : ce que cela change vraiment",
    description: "Google teste un programme qui rémunère certains éditeurs lorsque leurs contenus contribuent aux réponses IA. Ce que cela signifie vraiment pour les entreprises.",
    intro: "Le 14 septembre 2026, Digiday a détaillé un programme encore discret : Google rémunère certains éditeurs dont le contenu contribue à ses réponses IA. Voici les faits vérifiés, et ce qu’ils signifient vraiment pour une PME.",
    excerpt: "Un programme pilote, un paiement lié à la valeur plutôt qu’au simple usage, et beaucoup de malentendus possibles. Ce que l’enquête de Digiday du 14 septembre révèle vraiment.",
    datePublished: "2026-09-23",
    dateModified: "2026-09-23",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-google-remunere-ia.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Ce programme est actuellement un test limité à certains éditeurs. Une PME, un indépendant ou un site local ne peut pas simplement s’inscrire pour être rémunéré par Google." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que l’enquête révèle",
      },
      {
        kind: "p",
        content: [
          { text: "Le 14 septembre 2026, l’enquête de Digiday, relayée par Search Engine Roundtable, a rendu publique l’existence du programme d’essai appelé « AI contribution pilot », repéré dès avril 2026 mais dont les conditions n’étaient pas connues." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Google expérimente actuellement un programme pilote baptisé AI Contribution Pilot. Il concerne un nombre limité d’éditeurs dont les contenus peuvent contribuer de manière significative à certaines réponses générées dans Gemini, AI Overviews ou AI Mode." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Il ne s’agit pas d’un système ouvert à tous les sites web, ni d’une rémunération automatique dès qu’une page est citée. Le principe tient en une phrase, publiée par Google sur l’écran d’accueil des éditeurs concernés : « Accumulez des gains lorsque votre contenu contribue de manière significative aux réponses génératives dans les produits participants. » Les éditeurs concernés suivent leurs gains mensuels dans Search Console et peuvent se retirer à tout moment." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que cela ne change pas (et c’est l’essentiel)",
      },
      {
        kind: "p",
        content: [
          { text: "Une citation ne signifie pas automatiquement une rémunération. Être utilisé comme source, apparaître dans une réponse générée et être rémunéré sont trois choses différentes. Le programme annoncé par Google reste sélectif et expérimental." },
        ],
      },
      {
        kind: "list",
        items: [
          "ce n’est pas une rémunération de trafic : un simple lien après une réponse ne compte pas, Google ne paie que si le contenu a participé à la génération de la réponse",
          "ce n’est pas une rémunération à l’usage : selon Digiday, le paiement dépend de la valeur jugée par Google, pas du volume de consultations",
          "ce n’est pas ouvert à tous : Google parle d’un pilote d’apprentissage au stade précoce. Digiday indique qu’au moins plusieurs dizaines d’éditeurs ont été approchés. Le programme semble, jusqu’ici, susciter davantage d’intérêt auprès de petits et moyens éditeurs que des grands groupes",
        ],
      },
      {
        kind: "h2",
        text: "Un signal, pas une promesse",
      },
      {
        kind: "p",
        content: [
          { text: "Ce programme est surtout un signal : Google cherche à récompenser les contenus qui nourrissent vraiment ses réponses IA, au-delà des liens. Un dirigeant d’éditeur participant au pilote y voit même un premier test de ce qui pourrait devenir un « marché de données d’inférence » — un moyen de comprendre ce que les IA valorisent en observant ce qui est rémunéré." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour autant, ce n’est pas une raison de changer de stratégie. Le sujet d’une PME reste d’être trouvée, comprise et recommandée — ce que je décris en détail dans l’article sur la " },
          { text: "visibilité dans ChatGPT, Gemini et les moteurs IA", link: "/blog/etre-visible-chatgpt-gemini-moteurs-ia" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Pour une entreprise à Lausanne, qu’est-ce que cela change ?",
      },
      {
        kind: "p",
        content: [
          { text: "À court terme, probablement rien sur le plan financier. Le véritable signal est ailleurs : les moteurs IA accordent de plus en plus de valeur aux contenus capables d’apporter une information claire, originale et identifiable." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour une PME, l’objectif ne devrait donc pas être de « se faire payer par Google », mais de devenir une source crédible : site accessible, identité claire, expertise démontrée, " },
          { text: "réalisations réelles", link: "/realisations" },
          { text: " et informations cohérentes sur l’entreprise." },
        ],
      },
      {
        kind: "h2",
        text: "Et en pratique ?",
      },
      {
        kind: "list",
        items: [
          "vérifier dans Search Console → Settings → Search generative AI que le site est configuré pour être inclus dans les fonctionnalités génératives de Google",
          "suivre dans Search Console les impressions générées par les fonctionnalités IA de Google, surveiller manuellement les citations dans les autres moteurs IA et analyser le trafic referral dans son outil analytics",
          "se méfier de toute promesse d’une « place dans les IA » : aucune place n’est vendue, et ce pilote n’est ni une inscription ni un produit",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Cette option rend le contenu éligible ; elle ne garantit ni une citation ni une visibilité. La commande est disponible pour tous les sites depuis fin août 2026." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Google paie-t-il tous les sites cités dans ses réponses IA ?", "Non. Le programme est un pilote : seuls des éditeurs sélectionnés ont été approchés, et Google le présente comme un apprentissage au stade précoce, pas comme un dispositif généralisé."],
          ["Faut-il s’inscrire quelque part ?", "Non. Les éditeurs concernés sont contactés par Google. Il n’existe aucune procédure d’inscription publique, et aucun intermédiaire n’est nécessaire."],
          ["Cela remplace-t-il le trafic vers mon site ?", "Non. Google distingue le lien vers votre site (non rémunéré) de la contribution à la réponse elle-même (potentiellement rémunérée). Le trafic reste le premier indicateur à suivre."],
          ["Faut-il exclure son site des réponses IA ?", "C’est un choix d’entreprise. Le réglage Search generative AI dans Search Console permet de retirer son contenu de ces fonctionnalités ; il supprime alors les impressions dans les réponses génératives. Ce n’est pas une décision à prendre à la légère."],
          ["Est-ce le début d’un « SEO pour être payé par Google » ?", "Pas à ce stade. Le programme est trop récent et trop restreint pour en faire une stratégie. Les fondations — contenu utile, informations cohérentes, preuves — restent ce qui décide de vos citations."],
        ],
      },
      {
        kind: "h2",
        text: "Sources",
      },
      {
        kind: "list",
        items: [
          "Digiday — « Google rolls out pay-per-value AI licensing program to publishers », 14 septembre 2026",
          "Google Search Console Help — « Search generative AI control »",
          "Search Engine Roundtable — « Google AI Contribution Pilot »",
        ],
      },
    ],
  },
  {
    slug: "deux-experiences-reelles-sur-la-visibilite-ia",
    kicker: "VISIBILITÉ IA",
    title: "Citations IA : deux expériences GEO bousculent les conseils habituels",
    description: "Deux expériences GEO ont généré 775 citations IA et révèlent des résultats surprenants sur les sources tierces, les contenus propriétaires et la visibilité dans les moteurs IA.",
    intro: "Le 14 septembre 2026, Search Engine Land a publié deux expériences GEO mesurées, portant sur 775 citations dans les réponses IA. L’une de leurs conclusions contredit une partie des conseils habituels.",
    excerpt: "Sources qui vous mentionnent, plates-formes qui citent, contenus que vous contrôlez : ce que les mesures publiées le 14 septembre disent vraiment.",
    datePublished: "2026-09-23",
    dateModified: "2026-09-23",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-experiences-visibilite-ia.png",
    sections: [
      {
        kind: "h2",
        text: "Ce que les deux expériences ont testé",
      },
      {
        kind: "p",
        content: [
          { text: "La première expérience a été menée pour une marque existante, sur plusieurs mois et quatre plates-formes. La seconde a démarré de zéro : une entreprise sans aucune présence IA mesurable, suivie pendant trente jours sur six plates-formes — Gemini, Google AI Mode, Claude, ChatGPT, Grok et Perplexity — avec quinze mots-clés commerciaux vérifiés à la main. Au total, 775 citations ont été enregistrées (Search Engine Land, 14 septembre 2026)." },
        ],
      },
      {
        kind: "h2",
        text: "Les chiffres de l’expérience de démarrage à froid",
      },
      {
        kind: "list",
        items: [
          "298 apparitions en trente jours, sans aucune présence au départ",
          "Gemini : 104 citations, Google AI Mode : 95, Claude : 59, ChatGPT : 32",
          "Grok et Perplexity : les volumes les plus faibles (4 citations chacun) — et pourtant, dans cette expérience, l’une des rares citations Perplexity a conduit à un prospect devenu ensuite client",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pendant la période observée, 18,5 % des nouveaux utilisateurs sont arrivés via du trafic referral, tandis que 3,25 % ont été attribués au canal AI Assistant dans GA4. Ensemble, ces deux catégories représentaient un peu plus d’un cinquième des nouveaux utilisateurs. Cela ne signifie toutefois pas que l’ensemble des 21,75 % provenait directement de moteurs IA." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Un referral provenant de Perplexity a également conduit à un prospect qui est ensuite devenu client. C’est le résultat de cette expérience, pas une promesse de ce qui se produira pour tous les sites." },
        ],
      },
      {
        kind: "h2",
        text: "Le résultat qui contredit les conseils habituels",
      },
      {
        kind: "p",
        content: [
          { text: "Dans ces expériences, les sources tierces ont parfois joué un rôle plus important que les contenus publiés directement par la marque. Cela ne permet pas de conclure que les sources externes seront toujours supérieures. Ces résultats montrent surtout qu’une stratégie de visibilité IA ne doit pas se limiter au contenu publié sur son propre site." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Dans l’un des tests, le listicle publié directement par la marque représentait environ 14 % des mentions de sources observées. Les sources tierces étaient nettement plus présentes dans cette expérience." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "La première expérience tirait une conclusion opposée sur le rôle du contenu maîtrisé. Que cette conclusion n’ait pas survécu à la deuxième mesure est une leçon d’humilité : ce qui vaut pour une marque établie ne vaut pas pour une entreprise qui démarre." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que cela signifie pour une petite entreprise",
      },
      {
        kind: "list",
        items: [
          "l’autorité locale compte : si des sources que les IA lisent déjà (annuaires, presse locale, associations) parlent de vous, vos chances de citation augmentent",
          "votre propre contenu reste un prérequis plus qu’un moteur : il pose l’identité et factuellement votre activité, mais il ne crée pas la citation à lui seul",
          "les plates-formes ne se ressemblent pas : Gemini, AI Mode, Claude, ChatGPT, Grok et Perplexity citent différemment — et toutes ne génèrent pas du clic",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "C’est cohérent avec l’importance que je donne à une " },
          { text: "identité cohérente et à des preuves de votre activité", link: "/realisations" },
          { text: ". Les mentions extérieures se construisent comme les avis : par un travail de terrain régulier, pas par une case à cocher." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que ces expériences ne prouvent pas",
      },
      {
        kind: "p",
        content: [
          { text: "Ces résultats sont intéressants, mais ils ne constituent pas une formule universelle pour apparaître dans ChatGPT, Gemini ou Google AI Mode. Il s’agit de deux expériences menées dans des contextes précis, sur un nombre limité de requêtes commerciales et avec plusieurs actions réalisées en parallèle. Je les considère comme des signaux utiles à tester, pas comme des règles de classement garanties." },
        ],
      },
      {
        kind: "h2",
        text: "Conclusions honnêtes",
      },
      {
        kind: "p",
        content: [
          { text: "Aucune garantie n’existe, et aucune méthode ne promet une citation. Ce que ces expériences suggèrent, c’est un ordre des priorités : être mentionné là où les IA lisent, garder des " },
          { text: "fondations techniques propres", link: "/services/audit-seo" },
          { text: ", et mesurer ce qui arrive réellement — citations, clics, demandes. C’est la logique que je propose aux entreprises de Lausanne et de Suisse romande, dans le cadre d’un accompagnement et pas d’une promesse." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Faut-il publier des articles sur des sites externes pour être cité par les IA ?", "Pas automatiquement. Ces expériences montrent que des sources tierces peuvent jouer un rôle important, mais cela ne signifie pas qu’il faut multiplier les publications artificielles ou acheter des mentions. La pertinence, la crédibilité et le contexte restent essentiels."],
          ["La visibilité IA dépend-elle de mon contenu ?", "Pas seulement. Les deux expériences montrent que les sources extérieures qui vous mentionnent jouent le rôle principal. Votre contenu reste essentiel pour être décrit correctement, mais il n’est pas le moteur principal des citations."],
          ["Par quoi commencer si mon entreprise est invisible dans les IA ?", "Vérifier les fondations — indexabilité, identité, cohérence des informations — puis chercher les sources locales que les IA citent déjà et qui pourraient vous mentionner. Le reste se mesure sur des mois."],
          ["Les plates-formes se valent-elles ?", "Non. L’expérience de démarrage à froid montre des écarts très importants entre Gemini, AI Mode, Claude, ChatGPT, Grok et Perplexity. Mieux vaut observer là où vos clients posent réellement leurs questions."],
          ["Une citation dans une IA génère-t-elle des clients ?", "Rarement directement, mais elle peut. Dans l’expérience, une des rares citations Perplexity a conduit à un client payant. C’est une probabilité que l’on augmente en multipliant les zones de présence, pas en espérant un classement unique."],
          ["Faut-il créer un fichier ou une page spéciale pour les IA ?", "Non. Google ne demande aucun format particulier. Les citations se construisent par la clarté, la cohérence et les mentions extérieures — pas par un réglage spécial."],
        ],
      },
    ],
  },
  {
    slug: "google-admet-position-ia-peu-fiable",
    kicker: "NOUVELLE GOOGLE",
    title: "Google le confirme : la « position » dans les réponses IA devient une métrique trompeuse",
    description: "Search Console enregistre n’importe quel lien d’un encadré IA en position 1. Google le reconnaît et invite à regarder les résultats réels. Ce que cela change pour mesurer votre visibilité.",
    intro: "Le 24 septembre 2026, Google reconnaît publiquement que la « position » n’est plus mesurable comme avant dans ses réponses IA : Search Console traite chaque encadré généré comme un seul bloc. Voici ce que cela change, et ce que vous pouvez suivre à la place.",
    excerpt: "« Block flattening » : pourquoi Search Console affiche chaque lien d’un encadré IA en position 1 — et les 4 indicateurs qu’une PME devrait suivre à la place.",
    datePublished: "2026-09-26",
    dateModified: "2026-09-26",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-position-ia-peu-fiable.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "La position moyenne de Search Console ne dit presque plus rien pour les réponses IA : Google compte tout l’encadré comme un seul bloc. Ce qui reste mesurable : être cité (oui ou non), les visites réelles et les demandes." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que Google a reconnu le 24 septembre",
      },
      {
        kind: "p",
        content: [
          { text: "Le 24 septembre 2026, Search Engine Journal rapporte les précisions de John Mueller, porte-parole de Google. Questionné sur Reddit sur la fiabilité des rapports de recherche IA, il l’admet sans détour : pour ces fonctionnalités, la position est « difficile à rendre utile », car Search Console traite l’ensemble d’un encadré IA comme un seul bloc. Des propos similaires étaient déjà apparus à la mi-septembre." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Cette approche porte un nom chez les observateurs : le « block flattening ». Concrètement, Google ne regarde pas où se trouve votre lien à l’intérieur de la réponse générée : il prend la position du bloc entier — en général la première, puisque l’encadré s’affiche au-dessus des résultats classiques — et l’attribue à chaque lien qu’il contient." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Résultat : un lien bien visible sous la première phrase et un lien enfoui derrière « Show more » sont enregistrés à l’identique, comme position 1. Vos rapports peuvent donc afficher une visibilité « parfaite » sans qu’un visiteur vous ait jamais vu." },
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi la position moyenne vous trompe",
      },
      {
        kind: "p",
        content: [
          { text: "Ce constat n’est pas théorique. Une étude de terrain randomisée, relayée par Search Engine Journal, a mesuré ce qui se passe sur les requêtes où un encadré IA apparaît : environ 38 % de clics organiques en moins vers les sites externes sur ces requêtes-là — pas une baisse de 38 % de votre trafic global. Une version plus récente de l’étude ramène ce chiffre aux alentours de 39,8 %. D’autres analyses observent une chute des taux de clic des sites cités, en partie parce que les impressions enregistrées n’ont plus aucun rapport avec ce que l’utilisateur voit. Je vous laisse lire ces chiffres avec prudence : ce qui compte ici, c’est la leçon, le « rang » n’est plus un proxy fiable du trafic." },
        ],
      },
      {
        kind: "h2",
        text: "De la position à la question : ce qu’il faut suivre à la place",
      },
      {
        kind: "list",
        items: [
          "être cité ou pas — la question binaire. Le rapport Generative AI de Search Console (impressions, pages, pays, appareils) est disponible pour tous les sites depuis le 31 août 2026 ; regardez s’il indique une présence, pas où elle se situe",
          "les visites réelles — clics, sessions et trafic referral dans votre outil d’analyse. Des métriques difficiles à distordre par les impressions fantômes",
          "les demandes — appels, formulaires, messages. C’est ce qu’une impression ne dira jamais",
          "regarder de vos propres yeux — ouvrez une recherche en navigation privée : où votre lien apparaît dans l’encadré ne se lit dans aucun rapport",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Et une nouveauté bienvenue : depuis le 24 septembre, Search Console ajoute aussi les impressions de recherche multimodale (Lens, Circle to Search, recherche par image). C’est un signal à isoler — pas à fondre dans une « position moyenne » qui n’a plus de sens." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que cela ne change pas pour une PME à Lausanne",
      },
      {
        kind: "p",
        content: [
          { text: "Rien de nouveau à « optimiser » : la conséquence est logique. Si vos rapports affichent une position apparente de 1 ou 2 dans les encadrés IA, ne la comptez pas comme une promesse de trafic. Ce qui reste utile est exactement ce que je conseille depuis le début — des fondations techniques propres (" },
          { text: "audit SEO", link: "/services/audit-seo" },
          { text: "), des informations cohérentes, des contenus utiles — puis vérifier si vous êtes cité, oui ou non, dans ChatGPT, Gemini et les autres moteurs (" },
          { text: "comment mesurer sa visibilité IA", link: "/blog/etre-visible-chatgpt-gemini-moteurs-ia" },
          { text: ")." },
        ],
      },
      {
        kind: "h2",
        text: "Et en pratique ?",
      },
      {
        kind: "list",
        items: [
          "ouvrir le rapport Generative AI de Search Console et noter vos pages les plus présentes — sans lire la colonne position",
          "comparer avec vos indicateurs de résultat : sessions, demandes via le formulaire, appels",
          "vérifier en navigation privée ce qu’affichent réellement deux ou trois de vos recherches cibles",
          "enregistrer dans votre outil d’analyse l’éventuel trafic referral en provenance des moteurs IA",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "C’est une habitude de cinq minutes par semaine. Elle coûte moins cher qu’une obsession de la position, et elle donne enfin des chiffres qui correspondent au terrain. Ce travail d’analyse fait partie de l’" },
          { text: "accompagnement", link: "/methode" },
          { text: " que je propose aux entreprises de Suisse romande." },
        ],
      },
      {
        kind: "h2",
        text: "Sources",
      },
      {
        kind: "list",
        items: [
          "Search Engine Journal — « Search Console Uses Block Flattening For AIOs: Forget Position & Focus On Outcomes », 24 septembre 2026",
          "Google Search Central Blog — « Announcing web multimodal Search performance reporting in Search Console », 24 septembre 2026",
          "Google Search Central Blog — « Introducing Search Generative AI performance reports in Search Console », 3 juin 2026",
        ],
      },
      {
        kind: "faq",
        items: [
          ["Si mon site est en position 1 dans Search Console pour les IA, suis-je réellement premier ?", "Pas nécessairement. Search Console attribue la position du bloc entier à chaque lien qu’il contient. Votre lien peut être replié derrière « Show more » et apparaître quand même en position 1."],
          ["Le rapport Generative AI remplace-t-il le rapport de performance classique ?", "Non, il s’y ajoute. Les impressions des encadrés IA restent incluses dans le rapport de performance classique, avec une vue séparée pour les fonctionnalités génératives."],
          ["Que faire de ma « position moyenne 1,2 » affichée pour les IA ?", "La lire comme un indice de présence, pas comme un rang. Google lui-même le dit : la position par bloc n’est « pas utile » pour piloter la recherche IA."],
          ["Dois-je arrêter de vérifier Search Console ?", "Non — juste changer ce que vous y regardez : la présence (cité ou non), les pages, les pays, les impressions. Complétez avec vos mesures de résultat au lieu de la position."],
          ["Ces limites concernent-elles ChatGPT ou Perplexity ?", "Non. Ce rapport couvre uniquement les fonctionnalités IA de Google. Pour les autres moteurs, il n’existe aucun rapport officiel : il faut vérifier manuellement ou passer par des outils tiers."],
        ],
      },
    ],
  },
  {
    slug: "optimiser-fiche-google-business-profile-lausanne",
    kicker: "SEO LOCAL",
    title: "Fiche Google Business Profile : les actions concrètes de septembre 2026",
    description: "Depuis mars 2026, la complétude de votre fiche influence le classement local. En septembre : un délai de 4 jours pour contester une modification, Ask Maps, Collected Info. 8 actions concrètes pour une PME à Lausanne.",
    intro: "Le 23 septembre 2026, Google précise les règles : vous avez quatre jours pour refuser une modification proposée par un utilisateur sur votre fiche Google Business Profile, sinon elle peut être publiée automatiquement. C’est l’occasion de ressortir votre fiche du placard — voici pourquoi, et en 8 actions concrètes.",
    excerpt: "Délai de 4 jours pour contester une modification, complétude devenue facteur de classement, Ask Maps qui répond à votre place : les changements de septembre 2026 et 8 actions concrètes pour une PME à Lausanne.",
    datePublished: "2026-09-26",
    dateModified: "2026-09-26",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-fiche-google-business-profile.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Une fiche incomplète ou laissée sans réponse est aujourd’hui un désavantage mesurable. Le délai de 4 jours pour contester les modifications suggérées n’en est qu’un symptôme : Google veut des fiches vivantes, pas des cartes de visite oubliées." },
        ],
      },
      {
        kind: "h2",
        text: "Le changement de septembre : 4 jours pour dire non",
      },
      {
        kind: "p",
        content: [
          { text: "Le 23 septembre 2026, Google a clarifié son aide en ligne : pour certaines modifications suggérées par des utilisateurs, Google vous envoie une notification et demande votre révision. Dès cette notification, vous avez quatre jours pour accepter ou refuser la suggestion. Sans réponse, Google peut publier la modification si elle est cohérente avec d’autres informations publiques — par exemple votre site web. Google précise aussi que certaines modifications conformes aux règles peuvent être appliquées sans passer par ce réexamen." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pour une PME, c’est un rappel simple : relire vos notifications (e-mails et dans l’interface) au moins une fois par semaine, et garder un site dont les informations correspondent en toutes lettres à la fiche. Plus vos coordonnées sont cohérentes partout, moins une suggestion erronée a de chances d’être « soutenue » par d’autres sources — c’est le cœur du " },
          { text: "SEO local", link: "/blog/seo-local-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Une fiche complète peut soutenir la visibilité locale",
      },
      {
        kind: "p",
        content: [
          { text: "Restons précis. Google ne présente pas la fiche Business Profile comme un « facteur de classement » : officiellement, le classement local repose surtout sur la pertinence, la distance et la notoriété. Ce que Google dit explicitement, c’est qu’un profil complet et exact peut aider la visibilité locale." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "En pratique, les analyses de praticiens publiées depuis mars 2026 constatent un effet bien réel de cette complétude : un écart moyen d’environ 18 % pour les fiches incomplètes, un impact important de la présence de photos et un poids accru des avis récents plutôt que de leur simple nombre. Ces chiffres proviennent d’analyses de terrain, pas d’annonces officielles de Google — je les prends pour ce qu’ils sont : une direction, pas une loi. Et une fiche soignée alimente aussi Gemini (Ask Maps), ce qui dépasse le classement traditionnel." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que Gemini fait désormais de votre fiche",
      },
      {
        kind: "list",
        items: [
          "Ask Maps : le Q&A public est démantelé (l’API a été dépréciée fin 2025). Google répond maintenant instantanément aux questions des clients avec un contenu généré à partir de votre fiche, de votre site et de vos avis — le principe est le même que pour les moteurs IA en général",
          "Collected Info (disponible depuis la mi-septembre) : Google rassemble des informations sur votre entreprise par appels, SMS automatisés et données publiques, et les affiche dans un onglet dédié avec la source et la date — vous pouvez supprimer tout ce qui est faux",
          "Résumé IA et statistiques : Google génère un résumé de votre activité depuis vos avis les plus positifs, et compte désormais les vues de vos publications. Vérifiez ce résumé : s’il est faux, c’est lui qui « répond » à votre place",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ce changement de logique est cohérent avec ce que j’explique dans l’article sur la " },
          { text: "visibilité dans les moteurs IA", link: "/blog/etre-visible-chatgpt-gemini-moteurs-ia" },
          { text: " : ce qui compte, c’est la matière première. Gemini répond avec ce qu’il trouve, pas avec ce que vous espériez qu’on lise." },
        ],
      },
      {
        kind: "h2",
        text: "8 actions concrètes cette semaine",
      },
      {
        kind: "list",
        items: [
          "choisir la catégorie principale la plus précise (ex. « Graphiste indépendant » plutôt que « Agence ») — c’est le levier le plus fort de la fiche",
          "remplir tous les attributs utiles : accessibilité, modes de paiement, services proposés — Google les utilise pour les recherches précises",
          "déclarer chaque service par son nom exact, et le même que sur votre site",
          "vérifier la cohérence NAP (nom, adresse, téléphone) entre le site, la fiche et les annuaires",
          "répondre à tous les avis sous 48 h, y compris les négatifs, et viser 3 à 5 avis récents par mois — la régularité pèse plus que le stock",
          "ajouter plus de 10 photos réelles et en renouveler régulièrement",
          "ouvrir Collected Info et supprimer toute donnée fausse ; corriger le résumé IA si besoin",
          "publier un post par semaine et vérifier les notifications de modifications suggérées (délai de 4 jours)",
        ],
      },
      {
        kind: "h2",
        text: "Et en pratique ?",
      },
      {
        kind: "p",
        content: [
          { text: "Trente minutes par semaine suffisent pour entretenir une fiche. Et si le choix de la catégorie, la cohérence NAP ou un processus d’avis vous bloquent, c’est exactement le genre de travail que je prends en charge dans un " },
          { text: "audit SEO local", link: "/services/audit-seo" },
          { text: " — pas une promesse de position, mais un chantier de fond, avec des " },
          { text: "exemples concrets", link: "/realisations" },
          { text: " derrière." },
        ],
      },
      {
        kind: "h2",
        text: "Sources",
      },
      {
        kind: "list",
        items: [
          "Search Engine Roundtable — « Google Business Profiles Gives You Four Days To Reject User Suggested Edits », 23 septembre 2026",
          "Google Business Profile Help — « Understand notifications about suggested edits »",
          "Analyses de praticiens du SEO local, septembre 2026 (complétude, attributs, avis)",
        ],
      },
      {
        kind: "faq",
        items: [
          ["Si je ne réponds pas à une modification proposée dans les 4 jours, que se passe-t-il ?", "Google peut la publier automatiquement si elle est soutenue par d’autres informations publiques cohérentes. Vérifier vos notifications au moins une fois par semaine est le minimum."],
          ["La fiche Google Business Profile est-elle un facteur de classement ?", "Google ne le présente pas comme tel : officiellement, le classement local repose sur la pertinence, la distance et la notoriété. Ce que Google affirme, c’est qu’un profil complet et exact peu aider la visibilité locale — et les analyses de praticiens depuis mars 2026 constatent un effet réel de cette complétude."],
          ["Ask Maps remplace-t-il vraiment le Q&A ?", "Oui. Le Q&A public a été démantelé fin 2025 ; Google répond désormais aux questions par du contenu généré à partir de votre fiche, de votre site et de vos avis."],
          ["Combien d’avis faut-il viser ?", "Plutôt 3 à 5 avis récents chaque mois, auxquels vous répondez sous 48 h, que de grands volumes anciens. La régularité pèse plus que le stock."],
          ["Dois-je payer pour apparaître dans le pack local ?", "Non. La fiche est gratuite ; les annonces vers une fiche sont une option payante distincte qui n’influence pas le classement organique local."],
        ],
      },
    ],
  },
  {
    slug: "etude-kmu-digital-pulse-2026-pme-ia",
    kicker: "ÉTUDE SUISSE",
    title: "58 % des PME suisses n’ont jamais vérifié comment les IA les présentent",
    description: "Une étude suisse représentative (localsearch + Hochschule Luzern) mesure la visibilité des PME dans les réponses IA : 58 % n’ont jamais vérifié, et 8 % seulement contrôlent systématiquement.",
    intro: "Le 24 septembre 2026, localsearch et la Hochschule Luzern publient « KMU Digital Pulse 2026 », une étude suisse représentative sur le rapport des PME à l’IA. Le chiffre qui ressort : plus d’une PME sur deux n’a jamais vérifié comment les IA la présentent. Voici ce que l’étude révèle, et ce que j’en retiens pour une entreprise.",
    excerpt: "58 % des PME suisses n’ont jamais vérifié comment les IA les présentent, alors que 45 % estiment que leurs clients utilisent de plus en plus l’IA pour rechercher des offres. Les chiffres clés d’une étude inédite, et ce que cela change.",
    datePublished: "2026-09-29",
    dateModified: "2026-09-29",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-kmu-digital-pulse-ia.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Une PME sur deux ne sait pas ce qu’une IA dit d’elle — mais presque toutes considèrent qu’il est important que ce soit correct. C’est un angle mort : on ne peut corriger que ce que l’on voit." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que mesure l’étude « KMU Digital Pulse 2026 »",
      },
      {
        kind: "p",
        content: [
          { text: "Réalisée par localsearch (Swisscom Directories AG) et l’Institut de communication et marketing de la Hochschule Luzern, l’étude a interrogé 504 personnes responsables ou associées aux décisions marketing de PME suisses, du 13 au 21 mai 2026. L’échantillon est pondéré par région linguistique et par classe d’effectifs : il est représentatif de la structure des PME suisses. Pour la première fois dans la série KMU Digital Pulse, les microentreprises de 1 à 9 employés ont été intégrées systématiquement ; elles représentent environ 90 % des PME du pays." },
        ],
      },
      {
        kind: "h2",
        text: "58 % : un angle mort à l’échelle du pays",
      },
      {
        kind: "p",
        content: [
          { text: "Près de six PME suisses sur dix (58 %) n’ont jamais vérifié ce qu’un outil d’IA — ChatGPT, Google AI Overview, Gemini ou un autre — raconte à propos de leur entreprise. Le contraste est encore plus net dans les petites structures : 60 % des micro-entreprises n’ont jamais contrôlé, contre 45 % des petites et 36 % des moyennes entreprises." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "C’est d’autant plus frappant que 76 % des PME jugent important que les informations renvoyées par les IA à leur sujet soient correctes. L’importance est reconnue ; le contrôle, lui, reste l’exception. Le résultat : des informations fausses, datées ou absentes dans les réponses IA passent inaperçues, alors qu’elles peuvent peser sur une décision d’achat." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que font réellement les PME (et ce qu’elles ne font pas)",
      },
      {
        kind: "p",
        content: [
          { text: "La gestion de la visibilité IA est aujourd’hui l’affaire d’une minorité : à peine plus d’une PME sur dix la traite sérieusement. Plus précisément, 8 % des entreprises vérifient régulièrement ce que les IA disent d’elles, et 2 % prennent des mesures ciblées pour être mieux trouvées et mieux présentées. Tout le reste — neuf PME sur dix — n’a pas de suivi." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Un paradoxe ressort en miroir : 45 % des PME estiment que leurs clients utilisent de plus en plus l’IA pour rechercher des offres, et la moitié perçoit déjà des changements dans les comportements de recherche. L’usage par les clients est donc connu — mais l’image que l’IA renvoie de sa propre entreprise reste largement ignorée." },
        ],
      },
      {
        kind: "h2",
        text: "Le site web : la matière première que personne ne surveille",
      },
      {
        kind: "p",
        content: [
          { text: "L’étude apporte un deuxième chiffre révélateur : le site web reste la mesure marketing la plus répandue des PME suisses (69 %). Or c’est précisément ce site — sa structure, son contenu, ses informations — qui sert de matière première aux réponses IA lorsqu’elles décrivent une entreprise." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Le vrai frein, selon les répondants, n’est pas technique : 44 % des PME disent ne pas voir de bénéfice ou de besoin clair pour leur entreprise. C’est compréhensible — tant qu’on n’a pas regardé ce qu’une IA dit de son activité, difficile d’imaginer pourquoi cela compterait. C’est le même constat que celui qui guide mon article sur la " },
          { text: "visibilité dans les moteurs IA", link: "/blog/etre-visible-chatgpt-gemini-moteurs-ia" },
          { text: " : il n’existe aucune case à cocher, mais des fondations qui, cumulées, changent le résultat." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que j’en retiens pour une entreprise à Lausanne ou en Suisse romande",
      },
      {
        kind: "list",
        items: [
          "regarder une fois par mois : tapez votre nom et votre activité dans deux ou trois outils (ChatGPT, Perplexity, une recherche Google). Ce que vous voyez est ce que vos clients potentiels voient",
          "garder un site clair et exhaustif : métier, zone d’intervention, coordonnées cohérentes, réalisations. C’est la matière première que les IA vont relire",
          "entretenir les sources que les IA consultent déjà : fiche Google Business Profile, avis, annuaires, mentions dans la presse locale",
          "suivre son évolution plutôt que chercher la perfection : les résultats se mesurent sur des mois, pas sur une semaine",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "La liste complète et paramétrée pour votre situation fait partie du travail que je réalise dans un " },
          { text: "audit SEO", link: "/services/audit-seo" },
          { text: " — avec, cette fois, un volet dédié à ce que les IA répondent à votre sujet." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que cette étude ne dit pas",
      },
      {
        kind: "p",
        content: [
          { text: "L’étude mesure des pratiques, pas des performances : elle ne dit pas que les entreprises qui contrôlent leur visibilité IA gagnent plus de clients. Elle dit que neuf PME sur dix n’ont aucun suivi, dans un pays où la moitié des décideurs constatent que la recherche évolue vers l’IA. C’est une invitation à regarder, pas une promesse de résultat." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Cette étude est-elle représentative des PME suisses ?", "Oui : 504 décideurs marketing interrogés en mai 2026, échantillon pondéré par région linguistique et par taille d’entreprise. Elle couvre notamment les micro-entreprises, qui représentent environ 90 % des PME suisses."],
          ["Dois-je modifier mon site pour être mieux cité par les IA ?", "Pas de réglage magique, mais un site clair, précis et à jour est la base. Les IA citent ce qu’elles trouvent : des informations cohérentes, une activité décrite sans ambiguïté, des preuves comme des réalisations."],
          ["Ne pas utiliser l’IA en interne m’empêche-t-il d’être visible dans les IA ?", "Non. La visibilité côté clients ne dépend pas de votre usage interne, mais de ce que les IA trouvent à votre sujet : site, fiche Google Business Profile, mentions extérieures."],
          ["Par où commencer si je n’ai jamais vérifié ?", "Cinq minutes suffisent pour un premier constat : tapez votre nom et votre activité dans deux outils IA et notez ce qui est correct, faux ou absent. Un contrôle mensuel suffit ensuite."],
          ["Combien de temps faut-il pour voir un changement ?", "Des mois plutôt que des heures. L’étude ne promet aucun délai ; elle montre simplement que la plupart des entreprises n’ont même pas commencé à regarder. La régularité compte plus que l’intensité."],
        ],
      },
      {
        kind: "h2",
        text: "Sources",
      },
      {
        kind: "list",
        items: [
          "localsearch (Swisscom Directories AG) & Hochschule Luzern (IKM) — « KMU Digital Pulse 2026 », publié le 24 septembre 2026 (localsearch.ch, version publique sur Zenodo)",
          "Communiqué de presse localsearch / HSLU, 24 septembre 2026 (presseportal.ch)",
          "Bilanz — couverture de l’étude, septembre 2026",
        ],
      },
    ],
  },
  {
    slug: "recherche-ia-suisse-romande-moins-de-firmes",
    kicker: "RECHERCHE IA",
    title: "Recherche IA en Suisse romande : ce que 65 000 citations révèlent sur la visibilité des entreprises",
    description: "Depuis avril, Repliq Research interroge ChatGPT, Google AI Overview, Google AI Mode et Perplexity en Suisse romande. Constat de septembre : Google nomme moins d’entreprises, ChatGPT affiche moins de sources, et la moitié des citations échappe aux entreprises elles-mêmes.",
    intro: "Depuis avril 2026, Repliq Research mesure deux fois par mois ce que les assistants IA répondent à près de 200 questions identiques, en français, sur le marché suisse romand. En septembre, le constat précis est net : Google nomme moins d’entreprises dans ses réponses locales, ChatGPT affiche nettement moins de sources — et environ la moitié des citations échappe aux entreprises elles-mêmes. Voici ce que cela change pour vous.",
    excerpt: "Moins d’entreprises citées, des fiches d’établissement qui gagnent du terrain, des sources que vous ne contrôlez pas : le relevé de septembre de l’observatoire romand des citations IA, décrypté.",
    datePublished: "2026-09-29",
    dateModified: "2026-09-29",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-recherche-ia-suisse-romande.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Google nomme aujourd’hui nettement moins d’entreprises dans ses réponses, ChatGPT affiche beaucoup moins de sources — et environ une citation sur deux renvoie vers un site que vous ne possédez pas. Votre fiche, votre site et vos mentions extérieures comptent donc plus que jamais — mais seuls, ni l’un ni l’autre ne suffisent." },
        ],
      },
      {
        kind: "h2",
        text: "D’où viennent ces 65 000 citations ?",
      },
      {
        kind: "p",
        content: [
          { text: "Chaque quinzaine depuis avril, Repliq pose près de 200 questions fixes à quatre assistants — ChatGPT, Google AI Overview, Google AI Mode et Perplexity — directement dans leurs interfaces publiques, pas via des API. Les questions couvrent dix secteurs de l’économie suisse et sont posées en français, pour le marché romand. Le relevé d’août totalise environ 65 000 citations, près de 8 000 domaines et 25 000 pages distinctes. La méthode est publiée et rejouable, ce qui en fait l’une des seules mesures continues de ce type en Suisse." },
        ],
      },
      {
        kind: "h2",
        text: "Google nomme environ un quart d’entreprises en moins",
      },
      {
        kind: "p",
        content: [
          { text: "Le constat le plus net concerne Google : là où une réponse nommait environ 5 entreprises en avril, elle en nomme 3,8 début septembre — plus d’un quart de moins. Sur 44 questions suivies, 36 sont en baisse, et les réponses qui ne nomment aucune entreprise sont passées de 4 % à 10 %. Moins de noms cités, c’est mécaniquement moins de place pour vous." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Deux évolutions techniques accompagnent ce mouvement. L’Aperçu IA de Google s’affiche désormais sur 83 % des questions suivies (contre 75 % au printemps), et 88 % quand la question porte sur le nom même d’une entreprise. Parallèlement, Google AI Mode répond de plus en plus aux recherches locales avec des fiches d’établissement issues de Google Maps : aucune en juillet, une réponse sur neuf depuis la mi-août. La catégorie, l’adresse et les horaires de votre fiche deviennent alors directement la réponse — c’est exactement le terrain de la " },
          { text: "fiche Google Business Profile", link: "/blog/optimiser-fiche-google-business-profile-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "ChatGPT affiche trois fois moins de sources",
      },
      {
        kind: "p",
        content: [
          { text: "En l’espace de trois semaines, ChatGPT est passé d’environ 9 sites affichés comme sources par réponse à 3,3. Google AI Mode est passé dans le même temps de 8,5 à 2,7 sources — pendant que les réponses de ChatGPT s’allongeaient de 22 %. Le phénomène est spectaculaire : l’assistant écrit plus long, mais affiche beaucoup moins de sources." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Le cas le plus parlant relevé par Repliq : une question sur la meilleure assurance maladie pour un frontalier employé à Genève citait 28 domaines le 15 août. Dix-sept jours plus tard, la même question n’en citait plus que deux — ge.ch et priminfo.admin.ch. Et Reddit, présent dans 15 % des réponses ChatGPT début août, est tombé sous 1 % au 1er septembre." },
        ],
      },
      {
        kind: "h2",
        text: "La moitié des citations échappe aux entreprises",
      },
      {
        kind: "p",
        content: [
          { text: "Le chiffre le plus intéressant n’a, lui, presque pas bougé : 50,4 % des citations renvoient vers des sites que l’entreprise concernée ne possède pas. En haut du classement des sources : les sites d’entreprises (28,6 % des citations), puis les comparateurs et annuaires (16,2 %), les sites officiels (14,2 %), les blogs indépendants (10 %), la presse suisse (6 %) et les forums (5,1 %)." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Conséquence directe : se contenter d’optimiser son propre site suffit d’autant moins que les citations dépendent aussi de tiers. Cela rejoint le constat des deux expériences GEO publiées en septembre : " },
          { text: "l’essentiel des citations vient souvent de l’extérieur", link: "/blog/deux-experiences-reelles-sur-la-visibilite-ia" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Aucun site ne domine : c’est une autre logique que Google",
      },
      {
        kind: "p",
        content: [
          { text: "Contrairement à un moteur de recherche classique, aucun domaine ne domine réseau : les dix premiers domaines ne pèsent ensemble que 10,4 % des citations, et il faut cumuler 500 domaines pour atteindre 59,7 % d’entre elles. Deux entreprises sur trois citées ne le sont que par un seul des quatre assistants. Être bien placé sur l’un ne garantit rien sur l’autre." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Autre enseignement pour les secteurs concurrentiels : sur les questions de choix de banque suisse, la page la plus citée du corpus est un blog personnel (mustachianpost.com) — pas un site bancaire. La présence dans une réponse IA ne suit pas la notoriété : elle suit ce que les assistants jugent utile pour répondre, ce qui se travaille." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que cela change pour une PME",
      },
      {
        kind: "list",
        items: [
          "soigner sa fiche Google Business Profile : catégorie, adresse, horaires — c’est elle qui répond directement dans les recherches locales",
          "publier du contenu qui répond aux questions, chiffré et daté — le type de pages que Repliq voit le plus cité",
          "chercher des mentions extérieures : presse, annuaires, comparateurs, associations — la moitié du terrain vous échappe sinon",
          "mesurer assistant par assistant : aucune visibilité globale n’existe, et les classements ne se transmettent pas d’un outil à l’autre",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ces quatre axes correspondent aux bases que je pose dans un " },
          { text: "audit SEO", link: "/services/audit-seo" },
          { text: " : fondations techniques, contenus utiles, cohérence des informations, mentions extérieures. Rien de magique, mais une méthode qui réponde au terrain." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que ces chiffres ne prouvent pas",
      },
      {
        kind: "p",
        content: [
          { text: "Ces relevés mesurent des citations, pas des ventes : une citation n’est ni un clic ni un client. Les réponses IA sont aussi mouvantes par nature — Repliq le rappelle, Reddit est passé de 15 % à moins de 1 % des citations ChatGPT en un mois. Le sérieux de la méthode ne change rien au fait qu’il faut lire ces chiffres comme des tendances, pas des lois." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Ces mesures concernent-elles toute la Suisse ?", "Les questions sont posées en français et ciblent le marché suisse romand. Les tendances sur le nombre de sources citées concernent les assistants interrogés ; elles peuvent différer en Suisse alémanique."],
          ["Quelle différence entre ce relevé et un classement Google classique ?", "Un moteur de recherche renvoie une liste ordonnée de liens ; un assistant compose une réponse en citant quelques sources, sans « premier de la liste ». Les deux logiques coexistent, mais la seconde ne se pilote plus par la seule position."],
          ["Faut-il être présent sur les comparateurs pour être cité ?", "Pour certains secteurs, c’est un levier réel, car ils figurent parmi les sources les plus citées. Mais la présence doit rester cohérente : une représentation fausse ou datée y est aussi une réponse IA qui se trompe sur vous."],
          ["Comment savoir si mon entreprise est citée ?", "En posant les questions que vos clients posent, dans l’interface publique de chaque assistant, régulièrement. Sans rapport officiel pour ces outils, la vérification manuelle mensuelle reste la méthode la plus fiable."],
          ["Ces assistants citent-ils de plus en plus de sources ?", "Non, la tendance de septembre est inverse sur les quatre assistants suivis : moins de sources affichées par réponse, des réponses plus longues. C’est précisément pourquoi la qualité de chaque citation compte plus que leur nombre."],
        ],
      },
      {
        kind: "h2",
        text: "Sources",
      },
      {
        kind: "list",
        items: [
          "Repliq Research — « Recherche IA en Suisse romande : ce qui a changé cet été », Xavier Mercier, publié le 3 septembre 2026 (gorepliq.com)",
          "Repliq Research — Observatoire des sources IA, Suisse romande (méthodologie publiée, données ouvertes)",
          "ICTjournal — « Les assistants IA créent un nouveau défi de visibilité pour les entreprises suisses », juin 2026",
        ],
      },
    ],
  },
  {
    slug: "site-internet-pas-visible-google",
    kicker: "VISIBILITÉ GOOGLE",
    title: "Pourquoi mon site n’apparaît pas sur Google ? 10 causes et le test en 2 minutes",
    description: "Votre site n’apparaît pas sur Google : les 10 causes les plus fréquentes — indexation, réglages, technique, contenu — et un test en 2 minutes pour identifier la vôtre.",
    intro: "Réponse courte : si votre site n’apparaît pas, c’est presque toujours parce que Google ne l’a pas encore indexé, parce qu’un réglage l’en empêche (noindex, robots.txt), ou parce qu’il est indexé sans être assez pertinent pour vos requêtes. Les trois cas se distinguent en deux minutes avec le test ci-dessous.",
    excerpt: "Indexation manquante, noindex, JavaScript, contenu mince ou position trop basse : les 10 causes, et un test en 2 minutes pour savoir laquelle vous concerne.",
    datePublished: "2026-10-06",
    dateModified: "2026-10-06",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-site-pas-visible-google.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Google ne classe pas un site qu’il n’a pas indexé. Avant de chercher un coupable dans le contenu, vérifiez trois choses : la page est-elle indexée, un réglage l’interdit-il, apparaît-elle sous votre nom de domaine ? Ce sont les trois cas qui reviennent le plus, et le test de deux minutes ci-dessous les départage." },
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi Google ne connaît pas encore mon site ?",
      },
      {
        kind: "p",
        content: [
          { text: "C’est la cause la plus fréquente, et la plus bénigne : une page n’apparaît dans les résultats qu’après trois étapes — Google découvre l’URL, il l’explore, puis il l’indexe. Un site récent, sans lien entrant et sans sitemap soumis, peut attendre de quelques jours à plusieurs semaines avant la dernière étape. Si votre site a moins d’un mois, c’est probablement simplement cela." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Le signe qui ne trompe pas : taper site:votredomaine.ch dans Google. Si aucune URL n’apparaît, le site n’est pas indexé du tout, et le reste de cet article n’a pas encore d’intérêt — passez au test." },
        ],
      },
      {
        kind: "h2",
        text: "Qu’est-ce qui bloque l’indexation sans que je le sache ?",
      },
      {
        kind: "p",
        content: [
          { text: "Un site peut être parfaitement en ligne et volontairement invisible. Trois réglages causent l’essentiel des cas : la balise meta robots noindex (invitée par erreur après une mise en ligne), le fichier robots.txt qui interdit l’accès à tout ou partie du site, et une redirection ou une protection d’accès qui empêche le robot d’Google de voir la page." },
        ],
      },
      {
        kind: "list",
        items: [
          "meta name=\"robots\" content=\"noindex\" présent dans le code de la page",
          "Disallow: / dans le fichier à la racine du domaine",
          "page protégée par mot de passe ou en construction (code 401/503)",
          "HTML vide côté serveur pour les robots (contenu chargé uniquement après coup)",
        ],
      },
      {
        kind: "h2",
        text: "Un site neuf peut-il mettre des semaines à apparaître ?",
      },
      {
        kind: "p",
        content: [
          { text: "Oui, et c’est normal. Un domaine sans historique, sans mentions extérieures et sans données d’utilisation convient moins vite un moteur qui doit faire confiance à sa source. Ce n’est pas une pénalisation : c’est le temps que Google accumule des signaux. Les sites déjà connus indexent leurs nouvelles pages en quelques heures ; un domaine réellement neuf met davantage." },
        ],
      },
      {
        kind: "h2",
        text: "Est-ce que le JavaScript peut empêcher mon site d’être trouvé ?",
      },
      {
        kind: "p",
        content: [
          { text: "Dans certains cas, oui. Googlebot rend les pages, mais si votre contenu n’apparaît qu’après un chargement lourd, ou si des composants essentiels (titres, liens, textes) ne sont produits que par le navigateur, la version indexée peut être incomplète — ou vide. Un site construit entièrement en JavaScript sans prérendu est le cas typique." },
        ],
      },
      {
        kind: "h2",
        text: "Que faire si mon contenu est trop mince ou dupliqué ?",
      },
      {
        kind: "p",
        content: [
          { text: "Google indexe souvent ces pages, mais leur retire toute visibilité : pages avec trois phrases, descriptions copiées sur d’autres sites, versions FR/DE/IT quasi identiques, fiche produit reprise du fournisseur. Le diagnostic est simple — si votre site est indexé mais que seules quelques pages reçoivent des impressions, c’est le contenu qui manque de substance ou d’originalité." },
        ],
      },
      {
        kind: "h2",
        text: "Comment des erreurs techniques font-elles disparaître un site ?",
      },
      {
        kind: "p",
        content: [
          { text: "Un passage en HTTP sans redirection propre, des certificats HTTPS expirés, des erreurs serveur récurrentes (5xx) ou une durée de chargement excessive réduisent la confiance et le budget d’exploration accordé à votre domaine. Google ne pénalise pas la lenteur pour elle-même : il explore moins, et ce qu’il explore moins se classe moins." },
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi mon site apparaît sous son nom mais pas sous mes mots-clés ?",
      },
      {
        kind: "p",
        content: [
          { text: "C’est le cas le plus courant des PME, et il change complètement le diagnostic : votre site est indexé, il est juste mal positionné. Taper le nom du domaine renvoie le site, la requête métier non. Le problème se joue alors sur la pertinence de la page, la concurrence et les signaux d’autorité — pas sur l’indexation. C’est le terrain du " },
          { text: "référencement local à Lausanne", link: "/blog/seo-local-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Piratage ou sanction manuelle : est-ce que Google m’a puni ?",
      },
      {
        kind: "p",
        content: [
          { text: "C’est rare, mais à vérifier : des redirections parasites vers des sites tiers, du contenu de casinos ou de viagra injecté en fin de page, ou un message dans Google Search Console concernant une action manuelle. Si votre position s’effondre du jour au lendemain sans modification de votre part, commencez par cette vérification." },
        ],
      },
      {
        kind: "h2",
        text: "Cas fréquent chez les PME à Lausanne et dans le canton de Vaud",
      },
      {
        kind: "p",
        content: [
          { text: "Le scénario que nous retrouvons le plus : un site refait récemment, avec de nouvelles adresses d’URL et sans redirections depuis les anciennes ; une fiche Google Business Profile dont l’adresse ou la catégorie n’a jamais été mise à jour ; ou un site bilingue dont une version est quasi vide. Dans les trois cas, l’entreprise n’a rien vu venir, car le site — lui — fonctionne parfaitement." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Le bon réflexe est le même que celui décrit dans la " },
          { text: "fiche Google Business Profile", link: "/blog/optimiser-fiche-google-business-profile-lausanne" },
          { text: " : aligner site, fiche et mentions locales sur les mêmes informations. Un écart entre les trois suffit à faire disparaître une partie de votre visibilité locale." },
        ],
      },
      {
        kind: "h2",
        text: "Le test en 2 minutes : cinq vérifications dans l’ordre",
      },
      {
        kind: "list",
        items: [
          "Tapez site:votredomaine.ch — aucune ligne : le site n’est pas indexé, tout le reste est secondaire",
          "Reprenez votre titre exact entre guillemets — trouvé : vous êtes indexé, c’est un problème de position",
          "Ouvrez Google Search Console > Inspection d’URL : la page est-elle « disponible pour Google » ?",
          "Vérifiez le robots.txt et la balise noindex de la page concernée — les deux se corrigent en quelques minutes",
          "Lancez le check-up gratuit : il contrôle en une passe titres, description, indexation, canonical et données structurées",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ces cinq étapes répondent à la question posée en titre. Si les cinq sont vertes et que vous restez invisible sur vos mots-clés métier, le sujet n’est plus la technique : c’est le contenu, la concurrence et les mentions extérieures. Dans ce cas, un " },
          { text: "audit SEO", link: "/services/audit-seo" },
          { text: " commence exactement là où ce test s’arrête." },
        ],
      },
      {
        kind: "h2",
        text: "Que faire aujourd’hui si vous n’êtes pas indexé ?",
      },
      {
        kind: "list",
        items: [
          "supprimer le noindex et ouvrir le robots.txt, puis demander l’indexation dans Search Console",
          "soumettre un sitemap et corriger les redirections depuis les anciennes URLs",
          "publier du contenu utile et spécifique — une page par offre, par service et par ville visée",
          "obtenir les premières mentions locales : annuaires, partenaires, presse, associations",
          "mesurer chaque mois les impressions dans Search Console plutôt que votre position à un instant donné",
        ],
      },
      {
        kind: "faq",
        items: [
          ["Combien de temps faut-il pour apparaître sur Google ?", "Quelques heures à quelques jours pour une page déjà explorée d’un site connu, et plusieurs semaines pour un domaine neuf sans lien. Au-delà d’un mois sans indexation, un blocage est presque toujours en cause."],
          ["Mon site apparaît quand je tape son nom, pas sinon, pourquoi ?", "Cela signifie que l’indexation fonctionne : c’est un problème de position sur vos mots-clés métier, pas d’indexation. Le travail porte sur le contenu, les mentions et la concurrence locale."],
          ["Est-ce que Google Ads fait apparaître mon site dans les résultats naturels ?", "Non. Les annonces et le référencement naturel sont deux systèmes distincts : payer ne fait pas remonter une page en résultats naturels, et arrêter les annonces n’a aucun effet non plus."],
          ["Comment forcer Google à indexer une page plus vite ?", "Dans Google Search Console, ouvrez l’inspection d’URL et lancez une demande d’indexation. Cela accélère la prise en compte, mais ne remplace ni l’ouverture du robots.txt ni l’absence de noindex."],
          ["Est-ce que changer de domaine fait tout recommencer ?", "Oui, partiellement : les redirections 301 transmettent une partie de la valeur, mais un nouveau domaine repart avec un historique vierge. C’est l’une des raisons pour lesquelles une refonte sans redirections fait chuter le trafic."],
          ["Le contenu dupliqué fait-il disparaître un site de Google ?", "Rarement entièrement : Google fusionne ou déclasse les versions. Le symptôme le plus fréquent est qu’une seule version des pages apparaît, souvent pas la vôtre — d’où l’importance des balises canoniques."],
        ],
      },
    ],
  },
  {
    slug: "delais-resultats-seo-2026",
    kicker: "SEO · DÉLAIS",
    title: "Combien de temps faut-il pour voir les résultats du SEO en 2026 ?",
    description: "Les délais réels du référencement : premiers signaux en quelques jours, positions utiles en 3 à 6 mois, site neuf plus longtemps. Ce qui accélère, ce qui ralentit, et comment mesurer l’avancement.",
    intro: "Réponse courte : comptez 3 à 6 mois pour les premières positions utiles, 6 à 12 mois pour des résultats stables sur un marché concurrentiel, et un site tout neuf démarre avec quelques semaines supplémentaires. Les premiers signaux — indexation et impressions — apparaissent en revanche en quelques jours.",
    excerpt: "3 à 6 mois pour les premières positions, 6 à 12 mois pour un site neuf : les délais réels du SEO, les indicateurs à suivre dès la première semaine et le plan à 90 jours.",
    datePublished: "2026-10-06",
    dateModified: "2026-10-06",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-delais-seo.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Le SEO ne produit pas les effets au même rythme : les premiers signaux arrivent en jours, les premières positions utiles en mois, la stabilité sur un marché concurrentiel en année. Attendez-vous à 3 à 6 mois pour les premiers résultats concrets, et jugez l’avancement sur les impressions, pas sur votre position d’un jour." },
        ],
      },
      {
        kind: "h2",
        text: "Combien de temps pour les premiers signaux ?",
      },
      {
        kind: "p",
        content: [
          { text: "Quelques jours. Une nouvelle page est découverte et explorée en 24 heures à une semaine sur un site déjà connu ; les premières impressions — moments où votre page s’affiche dans les résultats sans encore générer de clic — apparaissent généralement dans Google Search Console dans les jours qui suivent l’indexation. Ce sont ces signaux-là qu’il faut regarder en premier." },
        ],
      },
      {
        kind: "h2",
        text: "Combien de temps pour les premières positions utiles ?",
      },
      {
        kind: "p",
        content: [
          { text: "Trois à six mois est la fourchette la plus honnête pour une entreprise locale sur des requêtes de difficulté modérée : assez de temps pour que le contenu soit exploré, que les premiers liens et signaux locaux soient pris en compte, et que Google teste votre page face à d’autres. Les requêtes très concurrentielles demandent davantage ; les requêtes très ciblées, moins." },
        ],
      },
      {
        kind: "h2",
        text: "Combien de temps pour un site qui vient d’être lancé ?",
      },
      {
        kind: "p",
        content: [
          { text: "Comptez plus longtemps — souvent 6 à 12 mois pour des positions stables. Un domaine sans historique doit d’abord prouver sa fiabilité : pages utiles, mentions extérieures, signaux d’utilisation. Ce délai n’est pas une fatalité commerciale : les requêtes locales et longue traîne, moins disputées, tombent généralement en premier." },
        ],
      },
      {
        kind: "h2",
        text: "Qu’est-ce qui fait varier le délai ?",
      },
      {
        kind: "list",
        items: [
          "la concurrence sur vos requêtes cibles — un métier très disputé à Lausanne ne se gagne pas comme un service de niche",
          "la santé technique du site : indexation, vitesse, HTTPS, structure",
          "le fond : une page par offre et par intention, avec des réponses concrètes",
          "les mentions extérieures : annuaires sérieux, presse, partenaires, associations",
          "la régularité : quelques pages solides par mois battent une grosse mise à jour annuelle",
        ],
      },
      {
        kind: "h2",
        text: "Comment savoir que ça marche avant d’y être ?",
      },
      {
        kind: "p",
        content: [
          { text: "Sur les impressions et la position moyenne, pas sur les premiers clics. Dans Search Console, une page qui passe de 0 à 80 impressions par semaine est en bonne voie, même si elle n’est qu’à la neuvième place. Les clics arrivent ensuite, mécaniquement, quand la position s’améliore et que l’URL gagne en confiance." },
        ],
      },
      {
        kind: "list",
        items: [
          "pages indexées : la courbe doit monter, jamais stagner",
          "impressions par semaine : le premier indicateur réel d’avancement",
          "position moyenne des requêtes cibles : elle descend avant que les clics montent",
          "clics : l’effet retardé des trois points précédents",
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi les promesses « première page en un mois » sont souvent fausses ?",
      },
      {
        kind: "p",
        content: [
          { text: "Parce qu’elles mélangent deux situations très différentes. Se positionner sur le nom de votre entreprise prend quelques jours — cela n’a aucune valeur concurrentielle. Gagner une requête disputée demande des mois de contenu, de technique et de signaux extérieurs : aucune méthode sérieuse ne raccourcit ce cycle, seule une méthode douteuse prétend le faire." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que nous observons sur les sites de PME suisses",
      },
      {
        kind: "p",
        content: [
          { text: "Sur les sites vitrines que nous accompagnons en Suisse romande, le schéma est régulier : les premiers résultats utiles arrivent sur la longue traîne et la recherche locale — les requêtes avec une ville, un quartier, un besoin précis — puis les pages services suivent, et seulement ensuite les requêtes génériques les plus disputées. La fiche Google Business Profile, elle, peut produire des contacts avant même le site." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Concrètement, une PME à Lutry ou à Lausanne voit souvent des demandes locales apparaître avant que le site remonte sur « agence web » ou « référencement ». C’est logique, et c’est pour cela qu’un " },
          { text: "référencement local", link: "/blog/seo-local-lausanne" },
          { text: " bien conduit donne des résultats plus tôt qu’un travail uniquement national." },
        ],
      },
      {
        kind: "h2",
        text: "Un plan réaliste sur 90 jours",
      },
      {
        kind: "list",
        items: [
          "Jours 1 à 30 : corrections techniques, Search Console installée, sitemap, base de mesure — les impressions commencent",
          "Jours 31 à 60 : une page par offre et par ville, réponses directes en tête de page, données structurées propres",
          "Jours 61 à 90 : premières mentions locales et partenaires, optimisation des pages qui gagnent déjà des impressions",
          "Au-delà : publication régulière, mesure mensuelle, ajustement des pages qui montent — c’est là que le levier devient cumulatif",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ce calendrier correspond au déroulé d’un " },
          { text: "audit SEO", link: "/services/audit-seo" },
          { text: " puis de son suivi. L’objectif n’est pas d’accélérer artificiellement le délai, mais d’empêcher qu’un blocage technique ne vous coûte les trois premiers mois." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Combien de temps avant la première page de Google ?", "Entre 3 et 6 mois pour une requête de difficulté modérée, plus sur un marché concurrentiel. Les requêtes locales et de niche y arrivent généralement plus vite que les requêtes génériques."],
          ["Est-ce que le SEO est devenu plus lent qu’il y a cinq ans ?", "Non, mais le terrain a changé : les réponses IA captent une partie des clics, ce qui rend l’impression plus précieuse qu’avant. Le délai d’obtention d’une position reste comparable ; l’importance des premières positions, elle, a augmenté."],
          ["Faut-il publier chaque semaine pour avancer ?", "La régularité compte plus que la fréquence. Un contenu solide et mis à jour bat un article pressé : ce qui fait avancer une page, c’est sa capacité à répondre complètement à la question posée."],
          ["Combien de temps avant d’être cité par ChatGPT ou Gemini ?", [
            { text: "Les assistants s’appuient sur des pages déjà indexées et sur des sources qu’ils citent déjà : les semaines plutôt que les jours, une fois le contenu en ligne et les mentions en place. Voir " },
            { text: "la visibilité sur les moteurs IA", link: "/blog/etre-visible-chatgpt-gemini-moteurs-ia" },
            { text: "." },
          ]],
          ["Que faire si rien ne bouge après six mois ?", "Revenir aux fondations : pages indexées, impressions dans Search Console, contenu aligné sur l’intention, mentions extérieures. Un site dont les impressions stagnent a presque toujours l’un des quatre manque — c’est le sujet d’un check-up puis d’un audit."],
          ["Les résultats SEO s’arrêtent-ils une fois la première position atteinte ?", "Non, mais ils deviennent fragiles : la position se défend, les concurrents aussi. Le travail passe de l’acquisition à la consolidation — mise à jour, signaux de confiance, nouveaux contenus connexes."],
        ],
      },
    ],
  },
  {
    slug: "consultant-seo-ou-agence-seo-lausanne",
    kicker: "CONSULTANT VS AGENCE",
    title: "Consultant SEO ou agence SEO : que choisir à Lausanne en 2026 ?",
    description: "Consultant ou agence SEO à Lausanne : différences concrètes, budgets, quand l’un est préférable à l’autre et les points à vérifier avant de signer un devis.",
    intro: "Réponse courte : choisissez un consultant SEO indépendant si vous voulez un interlocuteur unique, un budget maîtrisé et des décisions rapides ; choisissez une agence si vous devez mener de front plusieurs chantiers — développement, contenu, netlinking — avec une équipe complète. Le reste du choix, et il compte, se joue sur vos objectifs et l’état de votre site.",
    excerpt: "Interlocuteur unique et budget maîtrisé contre capacité de traitement d’une équipe : les différences concrètes entre consultant et agence SEO, et comment trancher pour une PME de Lausanne.",
    datePublished: "2026-10-09",
    dateModified: "2026-10-09",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-consultant-vs-agence-seo.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Un consultant est une personne, une agence est une équipe. Le premier gagne en proximité, en réactivité et en coût ; la seconde en capacité de traitement simultané. Pour une PME locale, le consultant couvre la majorité des besoins ; l’agence devient pertinente quand le volume de travail dépasse ce qu’une personne peut suivre seule." },
        ],
      },
      {
        kind: "h2",
        text: "Quelle est la différence concrète entre un consultant et une agence ?",
      },
      {
        kind: "p",
        content: [
          { text: "Un consultant SEO indépendant, c’est une seule et même personne qui analyse votre site, décide des actions et les réalise — ou vous explique exactement pourquoi elle délègue une pièce précise du travail. Une agence, c’est une équipe : un chef de projet qui coordonne, un profil technique, un rédacteur, parfois un profil netlinking et un analyste." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "La conséquence n’est ni théorique ni anecdotique : chez un consultant, la personne qui vous parle est celle qui travaille ; dans une agence, la personne qui vous parle coordonne celles qui travaillent. Les deux modèles peuvent très bien faire le travail — mais pas pour les mêmes besoins." },
        ],
      },
      {
        kind: "h2",
        text: "Quand un consultant SEO est-il le meilleur choix ?",
      },
      {
        kind: "p",
        content: [
          { text: "Dans la majorité des situations d’une PME de Suisse romande : un site vitrine ou un petit catalogue, un budget à maîtriser et un besoin de résultats mesurés plutôt que massifs. Le consultant est le bon niveau d’accompagnement quand :" },
        ],
      },
      {
        kind: "list",
        items: [
          "vous voulez un interlocuteur unique : la même personne du premier audit au suivi, sans transmission de dossier",
          "votre budget doit rester lisible : pas de couche de coordination à financer en plus du travail lui-même",
          "vos priorités bougent : le plan s’ajuste dans la foulée, sans réunion d’équipe",
          "vous voulez comprendre ce qui est fait : un consultant explique ses choix directement, sans intermédiaire",
          "votre site est un site vitrine ou un petit e-commerce — le cœur du besoin est la technique et le contenu, pas le volume",
        ],
      },
      {
        kind: "h2",
        text: "Quand une agence SEO est-elle préférable ?",
      },
      {
        kind: "p",
        content: [
          { text: "L’agence reprend l’avantage quand le volume ou la simultanéité dépasse une personne. Pensez agence quand :" },
        ],
      },
      {
        kind: "list",
        items: [
          "un e-commerce de plusieurs centaines ou milliers de pages doit être traité en profondeur et en parallèle",
          "vous visez plusieurs marchés ou plusieurs langues en même temps, avec des contenus distincts",
          "les mentions extérieures doivent être produites en volume — campagnes, partenariats, relations presse",
          "vous avez déjà une équipe interne : il faut coordonner développeurs, marketing et prestataires",
          "vous sortez d’une pénalité ou d’une chute de trafic qui demande plusieurs spécialistes mobilisés en même temps",
        ],
      },
      {
        kind: "h2",
        text: "Et le prix : qui coûte moins cher, le consultant ou l’agence ?",
      },
      {
        kind: "p",
        content: [
          { text: "À périmètre égal, le consultant est généralement moins cher — il n’a pas de structure d’équipe à couvrir. Mais attention à la comparaison : un devis d’agence couvre parfois un périmètre plus large que un devis de consultant, et un périmètre plus large coûte plus, quel que soit le modèle. Comparez des devis ligne par ligne, jamais des étiquettes." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Les fourchettes détaillées — audit ponctuel, SEO local, accompagnement mensuel, refonte — sont dans l’article " },
          { text: "Combien coûte le référencement SEO en Suisse en 2026 ?", link: "/blog/combien-coute-referencement-seo-suisse" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Ce que je constate chez les PME de Lausanne et du canton de Vaud",
      },
      {
        kind: "p",
        content: [
          { text: "La plupart des entreprises que je rencontre dans la région n’ont pas un problème de volume : elles ont un problème de base. Un site techniquement propre, des pages qui répondent aux vraies questions des clients, une fiche Google Business Profile tenue à jour — et les demandes arrivent déjà davantage. C’est le cœur du travail d’un " },
          { text: "consultant SEO à Lausanne", link: "/services/consultant-seo-lausanne" },
          { text: " : des fondations solides et un suivi régulier, pas une usine à contenu." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "C’est aussi pour cela que la question « consultant ou agence » se répond mal à froid. La vraie question est : qu’est-ce qui bloque aujourd’hui ? Un " },
          { text: "check-up gratuit", link: "/check-up-site-web" },
          { text: " donne cette réponse en quelques minutes, bien avant de comparer des devis." },
        ],
      },
      {
        kind: "h2",
        text: "Comment vérifier un prestataire avant de signer, consultant ou agence ?",
      },
      {
        kind: "p",
        content: [
          { text: "Le modèle compte moins que la méthode. Quel que soit l’interlocuteur, vérifiez ces points avant de vous engager — ils séparent le travail sérieux de la prestation standardisée." },
        ],
      },
      {
        kind: "list",
        items: [
          "des livrables nommés : ce que vous recevez, en combien de temps, écrit noir sur blanc",
          "une méthode de mesure : Search Console, impressions, positions — et un point de suivi régulier",
          "des exemples de situations comparables à la vôtre, avec ce qui a été fait concrètement",
          "des réponses claires à vos questions techniques — la transparence sur les limites vaut mieux qu’une assurance totale",
          "un audit initial avant tout engagement de fond : personne ne peut promettre un plan sérieux sans avoir regardé votre site",
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Si vous hésitez encore entre les deux formules, " },
          { text: "posez-moi la question directement", link: "/contact" },
          { text: " — avec votre site sous les yeux, la réponse tient en dix minutes." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Un consultant SEO seul peut-il rivaliser avec une agence ?", "Sur le périmètre d’une PME locale — technique, contenu, recherche locale — oui : une personne expérimentée couvre l’essentiel. L’écart se joue sur le volume simultané : sur un gros e-commerce multi-marchés, l’équipe garde l’avantage."],
          ["Une agence est-elle forcément plus chère qu’un consultant ?", "Pas forcément, mais à périmètre égal, une structure d’équipe se paie. Comparez toujours les devis ligne par ligne : le moins cher n’est pas un problème si les livrables sont nommés ; le plus cher doit se justifier par un périmètre plus large."],
          ["Que se passe-t-il si mon consultant SEO arrête son activité ?", "Un prestataire sérieux documente son travail : accès aux outils, historique des actions, plan écrit. Avant de signer, demandez ce qui vous reste si la collaboration s’arrête — la réponse doit être « tout » : vos comptes, vos données, votre plan."],
          ["Comment savoir si mon prestataire travaille vraiment ?", "Par la mesure et par la transparence : impressions dans Search Console, positions sur les requêtes cibles, actions listées à chaque point. Une prestation sans indicateur suivi ni compte-rendu n’est pas mesurable — donc pas vérifiable."],
          ["Faut-il un prestataire à Lausanne ou à distance ?", "Le travail technique se fait très bien à distance ; la connaissance du marché romand, elle, se sent dans le contenu et dans les recommandations locales. L’idéal est un interlocuteur qui connaît la région et mesure aussi proprement qu’un prestataire à distance."],
          ["Un petit budget exclut-il le SEO ?", "Non. Un audit ponctuel suivi de corrections ciblées est souvent le meilleur premier pas, bien avant un accompagnement mensuel. Commencez par savoir où vous en êtes — le reste se planifie avec un budget juste."],
        ],
      },
    ],
  },
  {
    slug: "combien-coute-referencement-seo-suisse",
    kicker: "BUDGET SEO",
    title: "Combien coûte le référencement SEO en Suisse en 2026 ? Prix, budgets et exemples",
    description: "Les fourchettes réelles du SEO en Suisse : audit ponctuel, SEO local, accompagnement mensuel, refonte optimisée, ce qui fait varier les devis et comment les comparer.",
    intro: "Réponse courte : comptez environ 500 à 2 500 CHF pour un audit SEO ponctuel, 300 à 800 CHF par mois pour un SEO local, 800 à 3 000 CHF par mois pour un accompagnement complet et à partir de 3 000 CHF pour une refonte optimisée SEO. L’écart dans chaque fourchette ne vient pas d’un mystère : il vient de l’état de votre site, de vos objectifs et du volume de travail.",
    excerpt: "Audit ponctuel, SEO local, accompagnement mensuel, refonte : les fourchettes de prix du référencement en Suisse, ce qui fait varier les devis et comment les lire.",
    datePublished: "2026-10-09",
    dateModified: "2026-10-09",
    author: {
      name: "Sébastien",
      url: `${business.url}/a-propos`,
    },
    image: "https://sebwebswiss.ch/og-blog-prix-seo-suisse.png",
    sections: [
      {
        kind: "callout",
        title: "À retenir",
        content: [
          { text: "Audit ponctuel : environ 500 à 2 500 CHF. SEO local : 300 à 800 CHF par mois. Accompagnement mensuel complet : 800 à 3 000 CHF par mois. Refonte optimisée SEO : à partir de 3 000 CHF. Ces fourchettes sont indicatives et observées sur le marché suisse — un devis sérieux se construit sur votre site, pas sur une grille toute faite." },
        ],
      },
      {
        kind: "h2",
        text: "Que payez-vous exactement quand vous achetez du référencement ?",
      },
      {
        kind: "p",
        content: [
          { text: "Derrière le mot « SEO » se cachent des prestations très différentes. Un devis sérieux les décompose : le diagnostic — où en êtes-vous réellement —, la technique — indexation, vitesse, structure —, le contenu — des pages qui répondent aux recherches réelles —, la réputation — mentions, annuaires sérieux, partenaires — et la mesure — positions, impressions, suivi." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "C’est la première chose à comprendre : vous n’achetez pas « du SEO », vous achetez une combinaison de ces cinq briques. C’est leur dosage qui explique presque tous les écarts de prix entre deux devis." },
        ],
      },
      {
        kind: "h2",
        text: "Combien coûte un audit SEO ponctuel en Suisse ?",
      },
      {
        kind: "p",
        content: [
          { text: "Comptez généralement entre 500 et 2 500 CHF pour un audit digne de ce nom. En dessous, vous achetez presque toujours un rapport automatique — des dizaines de pages générées par un outil, sans analyse ni plan. Au-dessus, c’est soit un très grand site, soit un périmètre élargi, par exemple une stratégie complète livrée avec l’audit." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Un audit sérieux contient : l’analyse technique complète — indexation, vitesse, HTTPS, structure, balisage —, l’examen du contenu face à la concurrence, la lecture des signaux locaux et, surtout, un plan d’action priorisé : ce que vous corrigez d’abord, et pourquoi. C’est ce plan qui fait la valeur — sans lui, l’audit est une liste, pas une décision." },
        ],
      },
      {
        kind: "h2",
        text: "Combien coûte un SEO local à Lausanne ou en Suisse romande ?",
      },
      {
        kind: "p",
        content: [
          { text: "Le travail local — fiche Google Business Profile, citations locales, pages par localité — se situe typiquement entre 300 et 800 CHF par mois. La fourchette dépend surtout de l’état de départ : une base saine demande de l’entretien, un site négligé demande d’abord des corrections." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Pourquoi ce budget se justifie : la recherche locale convertit plus vite que la requête générique pour une PME régionale. Le parcours détaillé est dans " },
          { text: "le guide du SEO local à Lausanne", link: "/blog/seo-local-lausanne" },
          { text: ", et les actions concrètes sur la fiche dans " },
          { text: "l’article dédié à Google Business Profile", link: "/blog/optimiser-fiche-google-business-profile-lausanne" },
          { text: "." },
        ],
      },
      {
        kind: "h2",
        text: "Combien coûte un accompagnement SEO mensuel ?",
      },
      {
        kind: "p",
        content: [
          { text: "Entre 800 et 3 000 CHF par mois pour une PME, au-delà pour les sites importants. Ce qui fait monter la note : le volume de contenu produit, le nombre de marchés ou de langues, la production de mentions extérieures et la taille technique du site." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Ce qu’un accompagnement sérieux doit contenir, quel que soit son prix : un plan écrit, des actions listées chaque mois, une mesure suivie — positions, impressions, Search Console — et un point régulier. Un accompagnement sans compte-rendu ni indicateurs n’est pas un accompagnement : c’est un prélèvement." },
        ],
      },
      {
        kind: "h2",
        text: "Combien coûte une refonte de site avec SEO intégré ?",
      },
      {
        kind: "p",
        content: [
          { text: "À partir de 3 000 CHF pour un site vitrine, couramment jusqu’à 15 000 CHF et au-delà pour un catalogue ou un e-commerce. Intégrer le SEO à la refonte coûte moins cher que de le rattraper après : redirections, conservation du contenu qui fonctionne, structure pensée pour les recherches dès le départ." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Le détail des budgets de création est dans l’article " },
          { text: "Combien coûte un site internet à Lausanne en 2026 ?", link: "/blog/combien-coute-un-site-internet-lausanne" },
          { text: " — la ligne SEO d’une refonte s’y lit mieux une fois le reste du budget posé." },
        ],
      },
      {
        kind: "h2",
        text: "Pourquoi les devis varient autant d’un prestataire à l’autre ?",
      },
      {
        kind: "p",
        content: [
          { text: "Six facteurs expliquent l’essentiel des écarts — les mêmes qui expliquent pourquoi « ça dépend » est à la fois vrai et inutile comme réponse :" },
        ],
      },
      {
        kind: "list",
        items: [
          "l’état de votre site : reprendre une base saine et rattraper trois ans de négligence ne se paie pas pareil",
          "la concurrence visée : un marché local et un marché national ne demandent ni le même contenu ni le même volume",
          "le volume de contenu : deux pages par mois ou dix, c’est la ligne qui change le plus le total",
          "les mentions extérieures : quelques annuaires solides ou une campagne complète, l’écart est net",
          "le type de prestataire : un consultant indépendant et une agence n’ont pas la même structure de coûts — voir l’article sur le choix entre consultant et agence",
          "le niveau de mesure : un suivi sérieux prend du temps, et ce temps se retrouve forcément quelque part dans le devis",
        ],
      },
      {
        kind: "h2",
        text: "Comment repérer un devis SEO douteux ?",
      },
      {
        kind: "p",
        content: [
          { text: "Avant de comparer les prix, éliminez les devis qui portent ces signaux — ils coûtent plus cher que leur facture, en temps perdu :" },
        ],
      },
      {
        kind: "list",
        items: [
          "une garantie de première place sur Google : personne de sérieux ne la donne",
          "la « soumission » à des centaines d’annuaires : en 2026, c’est au mieux inutile, au pire nuisible",
          "des livrables non nommés : si vous ne savez pas ce que vous recevez, vous ne recevrez rien de vérifiable",
          "un prix anormalement bas sur plusieurs mois : le travail existe, mais il est ailleurs — souvent automatisé",
          "aucune mention de mesure ni de Search Console : sans mesure, aucune prestation ne peut prouver quoi que ce soit",
        ],
      },
      {
        kind: "h2",
        text: "Quel budget pour une PME de Suisse romande en 2026 ?",
      },
      {
        kind: "p",
        content: [
          { text: "La séquence la plus rentable est presque toujours la même : d’abord savoir où vous en êtes, ensuite corriger la base, puis accompagner. Concrètement : un audit — ou un " },
          { text: "check-up gratuit", link: "/check-up-site-web" },
          { text: " pour la base technique et locale —, puis quelques corrections ciblées, puis un accompagnement mensuel proportionné aux résultats." },
        ],
      },
      {
        kind: "p",
        content: [
          { text: "Une précision utile pour les jeunes entreprises : dans le cadre du " },
          { text: "Programme Fondateur", link: "/offre-lancement" },
          { text: ", dix entreprises retenues obtiennent site et référencement à CHF 0 la première année. Le budget SEO peut donc attendre que le business le justifie — pas que la base technique traîne." },
        ],
      },
      {
        kind: "faq",
        items: [
          ["Pourquoi le SEO coûte-t-il plus cher en Suisse qu’à l’étranger ?", "Pour les mêmes raisons que tous les services : les coûts de structure et de vie y sont plus élevés, et l’expertise locale — langue, marché, usages — se paie. Un prestataire à distance peut être moins cher ; il est rarement aussi pertinent sur le contenu romand."],
          ["Un accompagnement à 200 CHF par mois, c’est sérieux ?", "À ce prix, personne ne peut consacrer à votre site le temps d’un travail réel. Ce qui existe à ce niveau : des outils automatisés avec un peu de supervision. Ça aide à ne rien casser ; ça ne fait pas avancer un site."],
          ["Combien de temps dois-je m’engager ?", "Un engagement de 3 à 6 mois est raisonnable : le SEO a des délais physiques. Au-delà de 12 mois d’engagement imposé, restez vigilant — un prestataire confiant accepte des points réguliers et des sorties propres."],
          ["Le SEO est-il moins cher que Google Ads ?", "Ce n’est pas le même objet. Les Ads sont un flux : vous payez, ça marche ; vous arrêtez, ça s’arrête. Le SEO est un actif : le travail s’arrête, les positions restent un temps. Sur deux ans, le SEO coûte presque toujours moins cher par contact obtenu."],
          ["Que contient concrètement un accompagnement mensuel ?", "En principe : le suivi de mesure, les corrections techniques au fil de l’eau, la production ou l’optimisation de contenu, les actions locales et externes, et un point mensuel avec le plan du mois suivant. Le dosage varie d’un site à l’autre — la transparence sur ce dosage, non."],
          ["Puis-je commencer petit puis augmenter ?", "Oui, et c’est souvent la meilleure approche : un audit ponctuel, les corrections prioritaires, puis un accompagnement quand la base est saine. Investir gros sur une base cassée revient à payer deux fois le même travail."],
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