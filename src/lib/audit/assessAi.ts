import type { CheckResult } from "@/content/audit/checks";
import { aiChecks } from "@/content/audit/checks";
import { describe, type DetailKey } from "@/content/audit/checkTranslations";
import { hasSchemaProperty, hasSchemaType, type ParsedPage } from "./parsers";
import type { SiteResponse } from "./fetchSite";

export type AiExtras = {
  robotsTxt: string | null;
  llmsTxt: string | null;
  robotsStatus?: number | null;
};

function statusFrom(ok: boolean, warn: boolean): "ok" | "warn" | "fail" {
  return ok ? "ok" : warn ? "warn" : "fail";
}

type RobotGroup = {
  agents: string[];
  rules: { allow: boolean; path: string }[];
};

function robotGroups(robots: string): RobotGroup[] {
  const groups: RobotGroup[] = [];
  let group: RobotGroup = { agents: [], rules: [] };
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (field === "user-agent") {
      if (group.rules.length) {
        groups.push(group);
        group = { agents: [], rules: [] };
      }
      if (value) group.agents.push(value.toLowerCase());
    } else if ((field === "allow" || field === "disallow") && group.agents.length) {
      group.rules.push({ allow: field === "allow", path: value });
    }
  }
  if (group.agents.length) groups.push(group);
  return groups;
}

function rootBlocked(groups: RobotGroup[], agent: string): boolean {
  const name = agent.toLowerCase();
  const specificity = (group: RobotGroup) => Math.max(0, ...group.agents
    .filter(token => token !== "*" && name.includes(token))
    .map(token => token.length));
  const longest = Math.max(0, ...groups.map(specificity));
  const selected = groups.filter(group => longest > 0
    ? specificity(group) === longest
    : group.agents.includes("*"));
  const rootRules = selected.flatMap(group => group.rules)
    .filter(rule => rule.path === "/" || rule.path === "/*");
  // Specific agent groups override '*'; equally specific Allow wins, including
  // rules split across several groups for the same agent.
  return rootRules.some(rule => !rule.allow) && !rootRules.some(rule => rule.allow);
}

/** Provjerava opću blokadu, ne pokušava simulirati crawl svake pojedine putanje. */
export function blockedAgents(robots: string): Set<string> {
  const groups = robotGroups(robots);
  const agents = new Set(groups.flatMap(group => group.agents));
  return new Set([...agents].filter(agent => rootBlocked(groups, agent)));
}

export function assessAi(page: ParsedPage, site: SiteResponse, extras: AiExtras): CheckResult[] {
  const results: CheckResult[] = [];
  const byId = (id: string) => aiChecks.find((c) => c.id === id)!;

  const text = page.text;
  const lower = text.toLowerCase();
  const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;

  // 1. Accès de l'OAI-SearchBot (ChatGPT Search) — signal principal.
  const groups = extras.robotsTxt ? robotGroups(extras.robotsTxt) : [];
  const searchBotBlocked = rootBlocked(groups, "oai-searchbot");
  const robotsUnavailable = extras.robotsTxt === null && extras.robotsStatus !== 404 && extras.robotsStatus !== 410;
  const notes: DetailKey[] = [];
  if (rootBlocked(groups, "gptbot")) notes.push("bot.gpt");
  if (rootBlocked(groups, "google-extended")) notes.push("bot.google");
  if (rootBlocked(groups, "chatgpt-user")) notes.push("bot.user");
  if (rootBlocked(groups, "ccbot")) notes.push("bot.cc");
  results.push({
    ...byId("ai-crawlers"),
    status: searchBotBlocked ? "fail" : robotsUnavailable ? "warn" : "ok",
    ...describe(searchBotBlocked ? "ai.access.blocked" : robotsUnavailable ? "ai.access.unknown"
      : extras.robotsTxt !== null ? "ai.access.allowed" : "ai.access.absent", {}, notes),
  });

  // 2. Contenu principal présent dans le HTML initial (jamais "fail").
  const htmlContentOk = text.length >= 600;
  results.push({
    ...byId("ai-html"),
    status: statusFrom(htmlContentOk, true),
    ...describe(htmlContentOk ? "ai.html.present" : "ai.html.few", { count: text.length }),
  });

  // 3. Données structurées exploitables.
  const hasJsonLd = page.jsonLd.length > 0;
  const hasEntitySchema = hasSchemaType(page.jsonLd, ["Organization", "LocalBusiness", "ProfessionalService", "WebSite", "Service"]);
  const invalidJsonLd = page.invalidJsonLdCount ?? 0;
  results.push({
    ...byId("ai-schema"),
    status: statusFrom(hasEntitySchema && !invalidJsonLd, hasJsonLd),
    ...describe(hasEntitySchema ? "ai.schema.entity" : hasJsonLd ? "ai.schema.other" : "ai.schema.absent", { count: page.jsonLd.length, invalid: invalidJsonLd }, invalidJsonLd ? ["schema.invalid"] : []),
  });

  // 4. Signaux d'identité et de confiance.
  const signals: string[] = [];
  if (hasEntitySchema) signals.push("schema");
  if (page.title) signals.push("name");
  if (page.links.some((l) => /a-propos|apropos|\babout\b/i.test(l))) signals.push("about");
  if (page.links.some((l) => /contact/i.test(l))) signals.push("contact");
  if (hasSchemaProperty(page.jsonLd, "sameAs")) signals.push("sameAs");
  if (page.links.some((l) => /confidentialite|privacy|mentions-legales|impressum|legal|cgu|cgv/i.test(l))) signals.push("legal");
  results.push({
    ...byId("ai-identity"),
    status: statusFrom(signals.length >= 4, signals.length >= 2),
    ...describe(signals.length ? "ai.identity.present" : "ai.identity.absent", { count: signals.length, signalIds: signals.join(",") }),
  });

  // 5. Contenu substantiel.
  const contentOk = wordCount >= 300;
  const contentWarn = wordCount >= 120;
  results.push({
    ...byId("ai-content"),
    status: statusFrom(contentOk, contentWarn),
    ...describe("ai.content", { count: wordCount }),
  });

  // 6. Hiérarchie sémantique (souple — jamais "fail").
  const headingCount = page.h2Count + page.h3Count;
  results.push({
    ...byId("ai-headings"),
    status: statusFrom(headingCount >= 3, true),
    ...describe("ai.headings", { h2: page.h2Count, h3: page.h3Count }),
  });

  // 7. Contenu questions-réponses (souple — jamais "fail").
  const hasDetails = (page.detailsCount ?? 0) > 0;
  const questionCount = page.questionHeadingCount ?? 0;
  const qaOk = questionCount >= 2 || hasDetails || /questions? fr[eé]quentes|\bfaq\b/i.test(lower);
  results.push({
    ...byId("ai-qa"),
    status: statusFrom(qaOk, true),
    ...describe(qaOk ? "ai.qa.present" : "ai.qa.absent", { count: questionCount },
      qaOk && questionCount ? ["ai.qa.questions"] : qaOk && hasDetails ? ["ai.qa.details"] : []),
  });

  // 8. llms.txt — informationnel, aucun impact sur le score.
  results.push({
    ...byId("ai-llms-txt"),
    status: extras.llmsTxt ? "ok" : "warn",
    ...describe(extras.llmsTxt ? "ai.llms.present" : "ai.llms.absent"),
  });

  return results;
}
