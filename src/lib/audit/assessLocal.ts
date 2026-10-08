import type { CheckResult } from "@/content/audit/checks";
import { localChecks } from "@/content/audit/checks";
import { describe } from "@/content/audit/checkTranslations";
import { hasSchemaProperty, hasSchemaType, type ParsedPage } from "./parsers";
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
    ...describe(businessName ? "name.present" : "name.absent", { value: businessName ?? "" }),
  });

  const htmlHasPhone = /(?:\+41[\s.-]?|0)\d{2}[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}/.test(text);
  const schemaPhone = findSchemaPhone(page);
  const phoneVisible = htmlHasPhone || Boolean(schemaPhone);
  results.push({
    ...byId("phone"),
    status: phoneVisible ? "ok" : "fail",
    ...describe(schemaPhone ? "phone.schema" : htmlHasPhone ? "phone.visible" : "phone.absent", { value: schemaPhone ?? "" }),
  });

  const telLink = /href=["']tel:/i.test(site.html);
  results.push({
    ...byId("tel-link"),
    status: telLink ? "ok" : "fail",
    ...describe(telLink ? "tel.present" : "tel.absent"),
  });

  const addressLine = text.match(/(Rte|Route|Rue|Chemin|Avenue|Av\.|Place|Bd)[^,;\n]{3,60}/i)?.[0] ?? null;
  const postalInText = text.match(swissPostalCode)?.[0] ?? null;
  const schemaAddr = findSchemaAddress(page);
  const addressOk = Boolean((addressLine && postalInText) || (schemaAddr.street && (schemaAddr.postal || schemaAddr.locality)));
  results.push({
    ...byId("address"),
    status: addressOk ? "ok" : "fail",
    ...describe(schemaAddr.street ? "address.schema" : addressLine ? "address.content" : "address.absent", {
      value: schemaAddr.street
        ? [schemaAddr.street, schemaAddr.postal, schemaAddr.locality].filter(Boolean).join(" ")
        : [addressLine?.slice(0, 80), postalInText].filter(Boolean).join(" "),
    }),
  });

  const localityOk = TOWN_REGEX.test(lower);
  results.push({
    ...byId("locality"),
    status: localityOk ? "ok" : "fail",
    ...describe(localityOk ? "locality.present" : "locality.absent"),
  });

  const hasLocalSchema = page.jsonLd.some(
    (b) =>
      hasSchemaType([b], ["LocalBusiness", "ProfessionalService"]) ||
      (hasSchemaType([b], ["Organization"]) && hasSchemaProperty([b], "address"))
  );
  const naap = hasLocalSchema && Boolean(findSchemaPhone(page)) && Boolean(findSchemaAddress(page).street);
  results.push({
    ...byId("schema-local"),
    status: naap ? "ok" : hasLocalSchema ? "warn" : "fail",
    ...describe(naap ? "localSchema.complete" : hasLocalSchema ? "localSchema.partial" : "localSchema.absent"),
  });

  const contactLinked = page.links.some((l) => /contact/i.test(l) || /("|'|"|\/)(nous-contacter|contact)(\/|#|"|'|$)/i.test(l));
  results.push({
    ...byId("contact-link"),
    status: contactLinked ? "ok" : "fail",
    ...describe(contactLinked ? "contact.present" : "contact.absent"),
  });

  const hoursOk = /(lundi|horaire|horaires|ouvert|ouverture|mardi|jeudi|vendredi|samedi|dimanche|office hours|opening hours)/i.test(text) && /\d{1,2}[h.:]\d{0,2}/.test(text);
  const hoursWarn = /(horaires|ouverture|opening hours)/i.test(text);
  results.push({
    ...byId("opening-hours"),
    status: hoursOk ? "ok" : hoursWarn ? "warn" : "fail",
    ...describe(hoursOk ? "hours.present" : hoursWarn ? "hours.partial" : "hours.absent"),
  });

  return results;
}
