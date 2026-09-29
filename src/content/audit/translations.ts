import type { Lang } from "./checks";

const fr = {
  appName: "Check-up SEO & visibilité locale",
  tagline: "Gratuit, en moins d’une minute.",
  title: "Check-up site web gratuit en Suisse | Audit SEO & visibilité locale",
  description:
    "Analysez gratuitement les principaux points techniques et locaux de votre site en moins d’une minute.",
  heroTitle: "Votre site est-il vraiment prêt à attirer des clients ?",
  heroIntro:
    "Un check-up automatique des points techniques et locaux les plus importants, adapté au contexte suisse. Vous obtenez un score clair et vos 3 priorités d’action.",
  urlPlaceholder: "https://www.votre-site.ch",
  analyseButton: "Analyser mon site gratuitement",
  langLabel: "Langue du rapport",
  progress: {
    connect: "Connexion au site…",
    tech: "Analyse technique…",
    local: "Analyse locale…",
    score: "Calcul du score…",
    priorities: "Préparation des priorités…",
  },
  resultTitle: "Votre score : {score}/100",
  resultGrade: (g: string) => `Résultat : ${g}`,
  grades: { bad: "À améliorer", fair: "Correct", good: "Bon", excellent: "Excellent" },
  moduleA: "Technique",
  moduleB: "Informations locales sur le site",
  comingSoon: "Bientôt disponible",
  comingSoonModules: ["Confidentialité & nDSG", "Multilinguisme", "Visibilité IA"],
  prioritiesTitle: "Vos 3 priorités",
  prioritiesSubtitle:
    "Les points les plus importants à corriger, classés par impact et par effort de mise en œuvre.",
  priority: {
    why: "Pourquoi c’est important",
    howToFix: "Comment corriger",
  },
  allOk: "Excellent, aucun point bloquant détecté sur ces critères de base.",
  emailGateTitle: "Recevez le rapport complet par e-mail",
  emailGateIntro:
    "Toutes les recommandations détaillées, vos scores et le récapitulatif — directement dans votre boîte mail.",
  emailLabel: "Votre e-mail",
  consentLabel:
    "J’accepte d’être contacté(e) par SebWebSwiss au sujet de mon rapport. Je peux me désinscrire à tout moment.",
  sendReport: "Recevoir le rapport complet",
  reportSent: "Merci. Votre rapport vous a été envoyé par e-mail.",
  disclaimer:
    "Cet outil fournit des indications automatisées et ne constitue pas un avis juridique.",
  ctaTitle: "Besoin d’aide pour corriger ces points ?",
  ctaSubtitle:
    "Réservez un appel gratuit de 15 minutes pour discuter de votre situation et des actions à mener.",
  ctaButton: "Réserver un appel gratuit",
  shareTitle: "Partager mon score",
  shareCopy: "Copier le lien",
  shareCopied: "Lien copié !",
  errorUrl: "Veuillez indiquer une adresse de site valide (ex. https://exemple.ch).",
  errorRate: "Trop de demandes. Réessayez dans une heure.",
  errorGeneric: "Le site n’a pas pu être analysé. Vérifiez l’adresse et réessayez.",
  labelOk: "OK",
  labelWarn: "À vérifier",
  labelFail: "À corriger",
  checkedBy: "Analyse automatique",
  rawHtmlNote:
    "L’analyse porte sur le code source HTML de la page. Les sites qui s’affichent entièrement en JavaScript peuvent donner des résultats partiels.",
};

const de: typeof fr = {
  ...fr,
  appName: "Check-up SEO & lokale Sichtbarkeit",
  title: "Gratis Website-Check-up in der Schweiz | SEO & lokale Sichtbarkeit",
  description:
    "Analysieren Sie kostenlos die wichtigsten technischen und lokalen Punkte Ihrer Website in unter einer Minute.",
  heroTitle: "Ist Ihre Website wirklich bereit, Kunden anzuziehen?",
};

const it: typeof fr = {
  ...fr,
  appName: "Check-up SEO e visibilità locale",
  title: "Check-up sito web gratuito in Svizzera | SEO e visibilità locale",
  description:
    "Analizza gratuitamente i punti tecnici e locali principali del tuo sito in meno di un minuto.",
  heroTitle: "Il tuo sito è davvero pronto ad attirare clienti?",
};

const en: typeof fr = {
  ...fr,
  appName: "SEO & local visibility check-up",
  title: "Free website check-up in Switzerland | SEO & local visibility",
  description:
    "Analyze the key technical and local points of your website for free in under a minute.",
  heroTitle: "Is your website really ready to attract clients?",
};

const dict: Record<Lang, typeof fr> = { fr, de, it, en };

export function t(lang: Lang) {
  return dict[lang] ?? fr;
}

export const uiLangs: { value: Lang; label: string }[] = [
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "en", label: "English" },
];

export { fr as frStrings };