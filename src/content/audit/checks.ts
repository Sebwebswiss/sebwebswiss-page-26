export type CheckModule = "tech" | "local";
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

export const MAX_MODULE_POINTS = 50;

export const moduleMeta: Record<ModuleId, { title: string; short: string; available: boolean }> = {
  tech: { title: "Technique", short: "Technique", available: true },
  local: { title: "Informations locales sur le site", short: "Local", available: true },
  privacy: { title: "Confidentialité & nDSG", short: "nDSG", available: false },
  lang: { title: "Multilinguisme", short: "Langues", available: false },
  ai: { title: "Visibilité IA", short: "IA", available: false },
};