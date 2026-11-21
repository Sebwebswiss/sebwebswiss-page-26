export type CheckModule = "tech" | "local" | "ai" | "privacy" | "lang";
export type ModuleId = "tech" | "local" | "privacy" | "lang" | "ai";

export type CheckStatus = "ok" | "warn" | "fail";

export type Lang = "fr" | "de" | "it" | "en";

export type Check = {
  id: string;
  module: CheckModule;
  label: string;
  weight: number;
  impact: 1 | 2 | 3;
  effort: 1 | 2 | 3;
  howToFix: string;
};

export type CheckResult = Check & {
  status: CheckStatus;
  detail?: string;
  detailKey?: string;
  detailParams?: Record<string, string | number>;
  detailNotes?: string[];
  evidence?: string;
};

export const techChecks: Check[] = [
  {
    id: "https",
    module: "tech",
    label: "Connexion sécurisée (HTTPS)",
    weight: 6,
    impact: 3,
    effort: 2,
    howToFix: "Installez un certificat SSL et redirigez l’ensemble du trafic HTTP vers HTTPS. L’hébergement et le domaine le permettent généralement en quelques clics.",
  },
  {
    id: "title",
    module: "tech",
    label: "Balise <title> (30–60 caractères)",
    weight: 6,
    impact: 3,
    effort: 1,
    howToFix: "Complétez le <title> de chaque page avec une phrase unique de 30 à 60 caractères qui décrit la page et contient le mot-clé principal.",
  },
  {
    id: "meta-description",
    module: "tech",
    label: "Meta description présente",
    weight: 4,
    impact: 2,
    effort: 1,
    howToFix: "Ajoutez une meta description unique de 70 à 160 caractères par page. Elle apparaît dans les résultats de recherche et influence le clic.",
  },
  {
    id: "h1",
    module: "tech",
    label: "Un seul titre principal (H1)",
    weight: 6,
    impact: 2,
    effort: 1,
    howToFix: "Confiez chaque page à une hiérarchie claire : un seul <h1> décrivant la page, puis des <h2> et <h3> pour structurer le contenu.",
  },
  {
    id: "canonical",
    module: "tech",
    label: "Balise canonical",
    weight: 5,
    impact: 3,
    effort: 1,
    howToFix: "Ajoutez une balise <link rel=\"canonical\"> sur chaque page pour indiquer l’URL de référence et éviter les contenus dupliqués.",
  },
  {
    id: "robots",
    module: "tech",
    label: "Balises robots et indexation",
    weight: 5,
    impact: 3,
    effort: 1,
    howToFix: "Vérifiez vos balises meta robots et le robots.txt pour ne pas bloquer l’indexation des pages importantes.",
  },
  {
    id: "og",
    module: "tech",
    label: "Open Graph (partage réseaux sociaux)",
    weight: 4,
    impact: 1,
    effort: 1,
    howToFix: "Ajoutez les balises og:title, og:description et og:image. Elles déterminent l’apparence de votre lien lorsqu’il est partagé.",
  },
  {
    id: "viewport",
    module: "tech",
    label: "Compatibilité mobile (viewport)",
    weight: 5,
    impact: 2,
    effort: 1,
    howToFix: "Vérifiez que la balise meta viewport est présente afin que le site s’adapte correctement aux écrans mobiles.",
  },
  {
    id: "lang",
    module: "tech",
    label: "Langue de la page (lang)",
    weight: 4,
    impact: 1,
    effort: 1,
    howToFix: "Indiquez la langue dans l’attribut lang de la balise <html> afin que les moteurs de recherche associent la page à la bonne audience.",
  },
  {
    id: "schema",
    module: "tech",
    label: "Données structurées (schema.org)",
    weight: 3,
    impact: 2,
    effort: 2,
    howToFix: "Ajoutez un bloc JSON-LD qui décrit votre organisation ou activité, afin d’aider les moteurs de recherche à comprendre votre site.",
  },
  {
    id: "response",
    module: "tech",
    label: "Réponse serveur et délai",
    weight: 2,
    impact: 2,
    effort: 2,
    howToFix: "Une page lente ou invalide pénalise l’expérience et le classement. Mesurez le délai de chargement et optimisez le serveur et le poids de la page.",
  },
];

export const localChecks: Check[] = [
  {
    id: "business-name",
    module: "local",
    label: "Nom de l’entreprise visible",
    weight: 6,
    impact: 2,
    effort: 1,
    howToFix: "Indiquez clairement le nom de votre entreprise sur la page d’accueil et dans les informations du site.",
  },
  {
    id: "phone",
    module: "local",
    label: "Numéro de téléphone visible",
    weight: 6,
    impact: 2,
    effort: 1,
    howToFix: "Affichez votre numéro de téléphone (dans l’en-tête, le pied de page ou la page contact).",
  },
  {
    id: "tel-link",
    module: "local",
    label: "Téléphone cliquable (tel:)",
    weight: 6,
    impact: 2,
    effort: 1,
    howToFix: "Transformez votre numéro en lien cliquable (tel:) pour permettre l’appel direct depuis un mobile.",
  },
  {
    id: "address",
    module: "local",
    label: "Adresse et code postal",
    weight: 6,
    impact: 2,
    effort: 1,
    howToFix: "Indiquez votre adresse complète et votre code postal, de préférence dans le pied de page et la page contact.",
  },
  {
    id: "locality",
    module: "local",
    label: "Localité et région mentionnées",
    weight: 7,
    impact: 3,
    effort: 1,
    howToFix: "Mentionnez votre ville et votre région dans les titres ou les textes clés afin de renforcer la pertinence locale.",
  },
  {
    id: "schema-local",
    module: "local",
    label: "Schema local (LocalBusiness)",
    weight: 8,
    impact: 3,
    effort: 2,
    howToFix: "Ajoutez un schéma LocalBusiness (ou un sous-type) avec le nom, l’adresse, le téléphone et l’URL de l’entreprise.",
  },
  {
    id: "contact-link",
    module: "local",
    label: "Lien vers la page contact",
    weight: 6,
    impact: 2,
    effort: 1,
    howToFix: "Ajoutez un lien visible vers votre page contact depuis la navigation et le pied de page.",
  },
  {
    id: "opening-hours",
    module: "local",
    label: "Horaires d’ouverture",
    weight: 5,
    impact: 2,
    effort: 2,
    howToFix: "Indiquez vos horaires d’ouverture sur la page contact et idéalement dans le schéma LocalBusiness.",
  },
];

export const aiChecks: Check[] = [
  {
    id: "ai-crawlers",
    module: "ai",
    label: "Accès de l’OAI-SearchBot (ChatGPT Search)",
    weight: 10,
    impact: 3,
    effort: 1,
    howToFix: "Vérifiez le robots.txt : l’agent OAI-SearchBot (utilisé par ChatGPT Search) doit pouvoir explorer le site. Ne le bloquez pas avec un « Disallow: / ». Bloquer GPTBot (entraînement) n’a pas d’impact sur l’apparition dans ChatGPT Search.",
  },
  {
    id: "ai-html",
    module: "ai",
    label: "Contenu principal présent dans le HTML initial",
    weight: 8,
    impact: 3,
    effort: 2,
    howToFix: "Assurez-vous que le contenu principal est présent dans le HTML envoyé au navigateur (rendu serveur/statique), et non injecté uniquement par JavaScript. Un contenu accessible sans exécuter de script améliore la lecture par les moteurs et les assistants.",
  },
  {
    id: "ai-schema",
    module: "ai",
    label: "Données structurées exploitables",
    weight: 8,
    impact: 3,
    effort: 2,
    howToFix: "Ajoutez un bloc JSON-LD décrivant votre entité (Organization, LocalBusiness, ProfessionalService ou WebSite) afin d’aider les moteurs à comprendre votre entreprise.",
  },
  {
    id: "ai-identity",
    module: "ai",
    label: "Signaux d’identité et de confiance",
    weight: 8,
    impact: 2,
    effort: 2,
    howToFix: "Rendez votre identité explicite : schéma d’entité, nom d’entreprise visible, lien « À propos », lien « Contact », page légale/confidentialité et, si possible, des profils officiels (sameAs).",
  },
  {
    id: "ai-content",
    module: "ai",
    label: "Contenu substantiel",
    weight: 6,
    impact: 2,
    effort: 2,
    howToFix: "Étoffez le contenu principal pour répondre clairement aux questions de vos clients (activité, zone desservie, offres). Un contenu précis et complet est plus facilement réutilisé par les assistants.",
  },
  {
    id: "ai-headings",
    module: "ai",
    label: "Hiérarchie sémantique (H2/H3)",
    weight: 6,
    impact: 1,
    effort: 1,
    howToFix: "Structurez la page avec des titres H2/H3 clairs et descriptifs, qui reflètent les différentes parties de votre offre.",
  },
  {
    id: "ai-qa",
    module: "ai",
    label: "Contenu questions-réponses",
    weight: 4,
    impact: 1,
    effort: 2,
    howToFix: "Ajoutez un bloc de questions fréquentes visible (titres formulés comme des questions, ou questions dépliables) pour couvrir les intentions de recherche.",
  },
  {
    id: "ai-llms-txt",
    module: "ai",
    label: "Fichier llms.txt (informationnel)",
    weight: 0,
    impact: 1,
    effort: 2,
    howToFix: "Optionnel : vous pouvez proposer un fichier llms.txt qui résume votre site pour les assistants. Il s’agit encore d’une convention proposée, sans gain garanti — aucun impact sur le score.",
  },
];

export const privacyChecks: Check[] = [
  {
    id: "privacy-link",
    module: "privacy",
    label: "Lien vers la politique de confidentialité",
    weight: 10,
    impact: 3,
    effort: 1,
    howToFix: "Ajoutez un lien clairement identifiable vers votre politique de confidentialité dans le pied de page et, si possible, dans le menu principal.",
  },
  {
    id: "privacy-page",
    module: "privacy",
    label: "Page de confidentialité accessible",
    weight: 8,
    impact: 3,
    effort: 2,
    howToFix: "Publiez une page dédiée, accessible en HTTP 200 et lisible sans JavaScript. Une politique hébergée hors du site reste valable, mais elle ne peut pas être analysée automatiquement.",
  },
  {
    id: "privacy-content",
    module: "privacy",
    label: "Mentions essentielles dans la politique",
    weight: 14,
    impact: 3,
    effort: 2,
    howToFix: "Complétez la politique : responsable du traitement, finalités, données collectées, durée de conservation, droits, cookies, tiers, transferts et date de mise à jour.",
  },
  {
    id: "privacy-rights",
    module: "privacy",
    label: "Droits des personnes et contact",
    weight: 6,
    impact: 2,
    effort: 2,
    howToFix: "Indiquez comment exercer les droits d’accès, de rectification et d’effacement, avec une adresse e-mail ou un contact dédié à la protection des données.",
  },
  {
    id: "privacy-consent",
    module: "privacy",
    label: "Consentement et traceurs",
    weight: 8,
    impact: 3,
    effort: 3,
    howToFix: "Si vous utilisez des traceurs (analytics, publicité), affichez un mécanisme de consentement avant leur chargement et proposez un refus aussi simple que l’acceptation.",
  },
  {
    id: "privacy-forms",
    module: "privacy",
    label: "Formulaires et information sur les données",
    weight: 4,
    impact: 2,
    effort: 2,
    howToFix: "Pour chaque formulaire, ajoutez un lien vers la politique de confidentialité et, lorsque c’est requis, une case de consentement explicite.",
  },
  {
    id: "privacy-law",
    module: "privacy",
    label: "Référence à la loi suisse (informationnel)",
    weight: 0,
    impact: 1,
    effort: 1,
    howToFix: "Informationnel : mentionner la LPD/nLPD et la juridiction suisse clarifie le cadre, sans effet sur le score. Cela ne remplace pas un avis juridique.",
  },
];

export const langChecks: Check[] = [
  {
    id: "lang-html",
    module: "lang",
    label: "Langue déclarée dans le HTML",
    weight: 0,
    impact: 1,
    effort: 1,
    howToFix: "Déclarez une langue valide dans l’attribut lang de la balise <html>, par exemple fr-CH ou de-CH.",
  },
  {
    id: "lang-coherence",
    module: "lang",
    label: "Cohérence entre la langue déclarée et le contenu",
    weight: 0,
    impact: 1,
    effort: 2,
    howToFix: "Vérifiez que le titre et les contenus principaux sont bien rédigés dans la langue déclarée, sans mélange involontaire.",
  },
  {
    id: "lang-switcher",
    module: "lang",
    label: "Sélecteur de langue",
    weight: 0,
    impact: 1,
    effort: 2,
    howToFix: "Si le site existe en plusieurs langues, affichez un sélecteur clair et gardez la page équivalente d’une langue à l’autre.",
  },
  {
    id: "lang-hreflang",
    module: "lang",
    label: "Annotations hreflang",
    weight: 0,
    impact: 1,
    effort: 2,
    howToFix: "Pour un site multilingue, ajoutez des liens hreflang valides avec auto-référence et une version x-default.",
  },
  {
    id: "lang-og-locale",
    module: "lang",
    label: "Locale Open Graph",
    weight: 0,
    impact: 1,
    effort: 1,
    howToFix: "Ajoutez og:locale et, si nécessaire, og:locale:alternate pour indiquer la langue du contenu partagé.",
  },
  {
    id: "lang-header",
    module: "lang",
    label: "En-tête Content-Language",
    weight: 0,
    impact: 1,
    effort: 1,
    howToFix: "Facultatif : un en-tête Content-Language cohérent avec la langue de la page aide les outils qui ne lisent pas le HTML.",
  },
];

export const MAX_MODULE_POINTS = 50;

export const SCORED_MODULES: CheckModule[] = ["tech", "local", "ai", "privacy"];
/** Checks that inform without changing the score (e.g. multilingual setup). */
export const INFORMATIONAL_MODULES: CheckModule[] = ["lang"];

export const moduleMeta: Record<ModuleId, { title: string; short: string; available: boolean }> = {
  tech: { title: "Technique", short: "Technique", available: true },
  local: { title: "Informations locales sur le site", short: "Local", available: true },
  ai: { title: "Visibilité IA — préparation technique", short: "IA", available: true },
  privacy: { title: "Confidentialité & nDSG", short: "nDSG", available: true },
  lang: { title: "Multilinguisme", short: "Langues", available: true },
};
