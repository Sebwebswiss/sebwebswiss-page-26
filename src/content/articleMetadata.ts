import type { Article } from "./articles";

// Search snippets have their own concise copy, separate from editorial headlines.
const snippets: Record<string, { title: string; description?: string }> = {
  "etre-visible-chatgpt-gemini-moteurs-ia": {
    title: "Visibilité sur ChatGPT et les moteurs IA",
    description: "Comprenez comment ChatGPT, Gemini et Perplexity citent les entreprises, puis vérifiez les bases utiles pour rendre votre site lisible et crédible.",
  },
  "combien-coute-un-site-internet-lausanne": {
    title: "Prix d’un site internet à Lausanne en 2026",
    description: "Découvrez ce qui fait varier le prix d’un site à Lausanne : pages, design, rédaction, SEO et maintenance, avec les questions à poser avant un devis.",
  },
  "google-remunere-les-sites-cites-par-l-ia": {
    title: "Google rémunère des éditeurs pour l’IA",
  },
  "deux-experiences-reelles-sur-la-visibilite-ia": {
    title: "Citations IA : deux expériences GEO",
    description: "Deux expériences GEO sur 775 citations IA : résultats, rôle des sources tierces et limites à connaître avant de bâtir votre stratégie de visibilité.",
  },
  "google-admet-position-ia-peu-fiable": {
    title: "Position dans les réponses IA : une limite",
    description: "Pourquoi la position des liens dans les réponses IA peut tromper vos rapports Search Console, et quels indicateurs suivre pour mesurer les résultats.",
  },
  "optimiser-fiche-google-business-profile-lausanne": {
    title: "Google Business Profile : 8 actions locales",
    description: "Huit actions pour votre fiche Google Business Profile à Lausanne : coordonnées, avis, photos et suivi des modifications, avec les évolutions de 2026.",
  },
  "etude-kmu-digital-pulse-2026-pme-ia": {
    title: "PME suisses et IA : l’étude KMU 2026",
    description: "L’étude KMU Digital Pulse 2026 analyse les PME suisses face à l’IA : visibilité, pratiques de contrôle et actions concrètes pour votre entreprise.",
  },
  "recherche-ia-suisse-romande-moins-de-firmes": {
    title: "Recherche IA en Suisse romande : l’étude",
    description: "Ce que 65 000 citations IA révèlent en Suisse romande : sources, entreprises citées et pistes concrètes pour améliorer votre présence locale.",
  },
  "site-internet-pas-visible-google": {
    title: "Site absent de Google : 10 causes à vérifier",
    description: "Site absent de Google ? Vérifiez 10 causes fréquentes : indexation, noindex, robots.txt, technique et contenu, avec un test guidé en deux minutes.",
  },
  "delais-resultats-seo-2026": {
    title: "Délais SEO : quand voir les résultats ?",
    description: "Délais du SEO : premiers signaux, progression des positions et résultats durables. Découvrez les facteurs clés et un plan d’action sur 90 jours.",
  },
  "consultant-seo-ou-agence-seo-lausanne": {
    title: "Consultant SEO ou agence à Lausanne ?",
    description: "Différences concrètes entre consultant et agence SEO : quand choisir l’un ou l’autre, impact sur le budget et les points à vérifier avant de signer un devis.",
  },
  "combien-coute-referencement-seo-suisse": {
    title: "Prix du SEO en Suisse en 2026",
    description: "Prix du référencement en Suisse : fourchettes pour un audit ponctuel, du SEO local, un accompagnement mensuel ou une refonte, et ce qui fait varier les devis.",
  },
};

export function getArticleMetadata(article: Article) {
  const snippet = snippets[article.slug];
  return {
    title: snippet?.title ?? article.title,
    description: snippet?.description ?? article.description,
  };
}
