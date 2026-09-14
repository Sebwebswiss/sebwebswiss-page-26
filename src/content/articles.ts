import { business } from "@/content/business";

/** An inline content segment: plain text, or text wrapped in an internal link. */
export type Inline = { text: string; link?: string };

/** Typed content block. Keeps article layouts data-driven instead of duplicating page code. */
export type ArticleBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; content: Inline[] }
  | { kind: "list"; items: string[] }
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
];

export const getArticle = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const getArticleSlugs = (): string[] => articles.map((a) => a.slug);

export const articleUrl = (slug: string): string => `${business.url}/blog/${slug}`;

export const defaultAuthor = {
  name: "Sébastien",
  url: `${business.url}/a-propos`,
} as const;