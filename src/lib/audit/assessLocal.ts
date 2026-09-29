import type { CheckResult } from "@/content/audit/checks";
import { localChecks } from "@/content/audit/checks";
import type { ParsedPage } from "./parsers";
import type { SiteResponse } from "./fetchSite";

const TOWN_REGEX = new RegExp(
  [
    "lausanne",
    "lutry",
    "pully",
    "vevey",
    "montreux",
    "morges",
    "renens",
    "crissier",
    "prilly",
    "epalinges",
    "cully",
    "belmont-sur-lausanne",
    "puidoux",
    "chexbres",
    "savigny",
    "la croix-sur-lutry",
    "vaud",
    "suisse romande",
    "la côte",
    "riviera vaudoise",
  ].join("|"),
  "i"
);

const swissPostalCode = /(CH-)?\d{4}/;

function schemaHas(block: string, key: string): boolean {
  return new RegExp(`"${key}"`, "i").test(block);
}

function findBusinessName(page: ParsedPage): string | null {
  const schema = page.jsonLd.find((b) => /"name"/.test(b));
  if (schema) {
    const m = schema.match(/"name"\s*:\s*"([^"]+)"/);
    if (m) return m[1];
  }
  return page.title ?? null;
}

function findSchemaPhone(page: ParsedPage): string | null {
  for (const block of page.jsonLd) {
    const m = block.match(/"telephone"\s*:\s*"([^"]+)"/);
    if (m) return m[1];
  }
  return null;
}

function findSchemaAddress(page: ParsedPage): { street: string | null; postal: string | null; locality: string | null } {
  const block = page.jsonLd.find((b) => /"address"/.test(b));
  if (!block) return { street: null, postal: null, locality: null };
  return {
    street: block.match(/"streetAddress"\s*:\s*"([^"]+)"/)?.[1] ?? null,
    postal: block.match(/"postalCode"\s*:\s*"([^"]+)"/)?.[1] ?? null,
    locality: block.match(/"addressLocality"\s*:\s*"([^"]+)"/)?.[1] ?? null,
  };
}

export function assessLocal(page: ParsedPage, site: SiteResponse): CheckResult[] {
  const results: CheckResult[] = [];
  const byId = (id: string) => localChecks.find((c) => c.id === id)!;

  const text = page.text;
  const lower = text.toLowerCase();

  const businessName = findBusinessName(page);
  results.push({
    ...byId("business-name"),
    status: businessName ? "ok" : "fail",
    detail: businessName ? `Nom détecté : ${businessName}` : "Nom de l’entreprise non détecté.",
  });

  const htmlHasPhone = /(\+41|0\d{2})\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/.test(text) || /tel:/.test(lower);
  const schemaPhone = findSchemaPhone(page);
  const phoneVisible = htmlHasPhone || Boolean(schemaPhone);
  results.push({
    ...byId("phone"),
    status: phoneVisible ? "ok" : "fail",
    detail: schemaPhone
      ? `Téléphone détecté : ${schemaPhone}`
      : htmlHasPhone
        ? "Un numéro de téléphone est présent dans le contenu."
        : "Aucun numéro de téléphone détecté.",
  });

  const telLink = /href=["']tel:/i.test(site.html);
  results.push({
    ...byId("tel-link"),
    status: telLink ? "ok" : "fail",
    detail: telLink ? "Lien tel: détecté." : "Aucun lien cliquable tel: détecté.",
  });

  const addressLine = text.match(/(Rte|Route|Rue|Chemin|Avenue|Av\.|Place|Bd)[^,;\n]{3,60}/i)?.[0] ?? null;
  const postalInText = text.match(swissPostalCode)?.[0] ?? null;
  const schemaAddr = findSchemaAddress(page);
  const addressOk = Boolean((addressLine && postalInText) || (schemaAddr.street && (schemaAddr.postal || schemaAddr.locality)));
  results.push({
    ...byId("address"),
    status: addressOk ? "ok" : "fail",
    detail: schemaAddr.street
      ? `Adresse dans le schema : ${schemaAddr.street}${schemaAddr.postal ? " " + schemaAddr.postal : ""}${schemaAddr.locality ? " " + schemaAddr.locality : ""}`
      : addressLine
        ? `Adresse dans le contenu : ${addressLine.slice(0, 80)}${postalInText ? " " + postalInText : ""}`
        : "Aucune adresse complète détectée.",
  });

  const localityOk = TOWN_REGEX.test(lower);
  results.push({
    ...byId("locality"),
    status: localityOk ? "ok" : "fail",
    detail: localityOk ? "Ville ou région (p. ex. Lausanne, Vaud) mentionnée." : "Aucune localité suisse détectée dans le contenu.",
  });

  const hasLocalSchema = page.jsonLd.some(
    (b) =>
      /LocalBusiness"/.test(b) ||
      (/Organization"/.test(b) && schemaHas(b, "address"))
  );
  const naap = hasLocalSchema && Boolean(findSchemaPhone(page)) && Boolean(findSchemaAddress(page).street);
  results.push({
    ...byId("schema-local"),
    status: naap ? "ok" : hasLocalSchema ? "warn" : "fail",
    detail:
      hasLocalSchema
        ? `Schema ${naap ? "complet (nom, adresse, téléphone)" : "présent mais NAP incomplet"} détecté.`
        : "Aucun schema LocalBusiness/Organization avec adresse détecté.",
  });

  const contactLinked = page.links.some((l) => /contact/i.test(l) || /("|'|"|\/)(nous-contacter|contact)(\/|#|"|'|$)/i.test(l));
  results.push({
    ...byId("contact-link"),
    status: contactLinked ? "ok" : "fail",
    detail: contactLinked ? "Lien vers une page contact détecté." : "Aucun lien vers une page contact détecté.",
  });

  const hoursOk = /(lundi|horaire|horaires|ouvert|ouverture|mardi|jeudi|vendredi|samedi|dimanche|office hours|opening hours)/i.test(text) && /\d{1,2}[h.:]\d{0,2}/.test(text);
  const hoursWarn = /(horaires|ouverture|opening hours)/i.test(text);
  results.push({
    ...byId("opening-hours"),
    status: hoursOk ? "ok" : hoursWarn ? "warn" : "fail",
    detail: hoursOk
      ? "Horaires d’ouverture détectés."
      : hoursWarn
        ? "Horaires mentionnés mais non détaillés."
        : "Aucun horaire d’ouverture détecté.",
  });

  return results;
}