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
];

export const getArticle = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const getArticleSlugs = (): string[] => articles.map((a) => a.slug);

export const articleUrl = (slug: string): string => `${business.url}/blog/${slug}`;

export const defaultAuthor = {
  name: "Sébastien",
  url: `${business.url}/a-propos`,
} as const;