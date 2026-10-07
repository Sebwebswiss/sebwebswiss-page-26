import type { CheckResult } from "@/content/audit/checks";
import { aiChecks } from "@/content/audit/checks";
import type { ParsedPage } from "./parsers";
import type { SiteResponse } from "./fetchSite";

export type AiExtras = {
  robotsTxt: string | null;
  llmsTxt: string | null;
};

function statusFrom(ok: boolean, warn: boolean): "ok" | "warn" | "fail" {
  return ok ? "ok" : warn ? "warn" : "fail";
}

/**
 * Vraća skup user-agenta koji imaju `Disallow: /` (blokada cijelog sajta).
 * Pojednostavljeno: gledamo samo potpunu blokadu korijena, što je i najčešći slučaj.
 */
export function blockedAgents(robots: string): Set<string> {
  const blocked = new Set<string>();
  let groupAgents: string[] = [];
  let inRules = false;

  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (field === "user-agent") {
      if (inRules) {
        groupAgents = [];
        inRules = false;
      }
      groupAgents.push(value.toLowerCase());
    } else {
      inRules = true;
      if (field === "disallow" && value === "/") {
        for (const agent of groupAgents) blocked.add(agent);
      }
    }
  }

  return blocked;
}

export function assessAi(page: ParsedPage, site: SiteResponse, extras: AiExtras): CheckResult[] {
  const results: CheckResult[] = [];
  const byId = (id: string) => aiChecks.find((c) => c.id === id)!;

  const text = page.text;
  const lower = text.toLowerCase();
  const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;

  // 1. Accès de l'OAI-SearchBot (ChatGPT Search) — signal principal.
  const blocked = extras.robotsTxt ? blockedAgents(extras.robotsTxt) : new Set<string>();
  const searchBotBlocked = blocked.has("oai-searchbot") || blocked.has("*");
  const notes: string[] = [];
  if (blocked.has("gptbot")) notes.push("GPTBot bloqué (entraînement) — sans impact sur ChatGPT Search");
  if (blocked.has("google-extended")) notes.push("Google-Extended bloqué (Gemini) — sans impact sur la recherche Google");
  if (blocked.has("chatgpt-user")) notes.push("ChatGPT-User bloqué (navigation à la demande)");
  if (blocked.has("ccbot")) notes.push("CCBot bloqué (informationnel)");
  results.push({
    ...byId("ai-crawlers"),
    status: searchBotBlocked ? "fail" : "ok",
    detail: searchBotBlocked
      ? `OAI-SearchBot bloqué dans le robots.txt (Disallow: /) — risque d’absence dans ChatGPT Search.${notes.length ? " " + notes.join(" · ") : ""}`
      : extras.robotsTxt
        ? `robots.txt présent, OAI-SearchBot autorisé.${notes.length ? " " + notes.join(" · ") : ""}`
        : `Aucun robots.txt (accès autorisé par défaut).${notes.length ? " " + notes.join(" · ") : ""}`,
  });

  // 2. Contenu principal présent dans le HTML initial (jamais "fail").
  const htmlContentOk = text.length >= 600;
  results.push({
    ...byId("ai-html"),
    status: statusFrom(htmlContentOk, true),
    detail: htmlContentOk
      ? `Contenu principal présent dans le HTML initial (${text.length} caractères).`
      : `Peu de contenu dans le HTML initial (${text.length} caractères) — dépend peut-être du JavaScript.`,
  });

  // 3. Données structurées exploitables.
  const schemaAll = page.jsonLd.join(" ");
  const hasJsonLd = page.jsonLd.length > 0;
  const hasEntitySchema = /Organization|LocalBusiness|ProfessionalService|WebSite|Service/i.test(schemaAll);
  results.push({
    ...byId("ai-schema"),
    status: statusFrom(hasEntitySchema, hasJsonLd),
    detail: hasEntitySchema
      ? `Schéma d’entité détecté (${page.jsonLd.length} bloc(s) JSON-LD).`
      : hasJsonLd
        ? "JSON-LD présent mais sans entité Organization/LocalBusiness/WebSite."
        : "Aucune donnée structurée JSON-LD détectée.",
  });

  // 4. Signaux d'identité et de confiance.
  const signals: string[] = [];
  if (hasEntitySchema) signals.push("schéma d’entité");
  if (page.title) signals.push("nom de l’entreprise");
  if (page.links.some((l) => /a-propos|apropos|\babout\b/i.test(l))) signals.push("lien À propos");
  if (page.links.some((l) => /contact/i.test(l))) signals.push("lien Contact");
  if (/sameAs/i.test(schemaAll)) signals.push("sameAs (profils officiels)");
  if (page.links.some((l) => /confidentialite|privacy|mentions-legales|impressum|legal|cgu|cgv/i.test(l))) signals.push("page légale/confidentialité");
  results.push({
    ...byId("ai-identity"),
    status: statusFrom(signals.length >= 4, signals.length >= 2),
    detail: signals.length
      ? `Signaux détectés (${signals.length}) : ${signals.join(", ")}.`
      : "Peu de signaux d’identité (nom, À propos, Contact, page légale, profils).",
  });

  // 5. Contenu substantiel.
  const contentOk = wordCount >= 300;
  const contentWarn = wordCount >= 120;
  results.push({
    ...byId("ai-content"),
    status: statusFrom(contentOk, contentWarn),
    detail: `Contenu principal : environ ${wordCount} mot(s).`,
  });

  // 6. Hiérarchie sémantique (souple — jamais "fail").
  const headingCount = page.h2Count + page.h3Count;
  results.push({
    ...byId("ai-headings"),
    status: statusFrom(headingCount >= 3, true),
    detail: `Titres secondaires détectés : ${page.h2Count} H2, ${page.h3Count} H3.`,
  });

  // 7. Contenu questions-réponses (souple — jamais "fail").
  const hasDetails = /<details[\s>]/i.test(site.html);
  const questionCount = (site.html.match(/<h[1-3][^>]*>(?:(?!<\/h[1-3]>).)*\?/gi) ?? []).length;
  const qaOk = questionCount >= 2 || hasDetails || /questions? fr[eé]quentes|\bfaq\b/i.test(lower);
  results.push({
    ...byId("ai-qa"),
    status: statusFrom(qaOk, true),
    detail: qaOk
      ? `Éléments questions-réponses détectés${questionCount ? ` (${questionCount} titre(s) en question)` : hasDetails ? " (bloc dépliable)" : ""}.`
      : "Aucun bloc questions-réponses visible détecté.",
  });

  // 8. llms.txt — informationnel, aucun impact sur le score.
  results.push({
    ...byId("ai-llms-txt"),
    status: extras.llmsTxt ? "ok" : "warn",
    detail: extras.llmsTxt
      ? "Fichier /llms.txt présent."
      : "Aucun /llms.txt détecté (optionnel, convention sans gain garanti).",
  });

  return results;
}
