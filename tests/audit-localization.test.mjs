import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { techChecks, localChecks, aiChecks, privacyChecks } from "../src/content/audit/checks.ts";
import { auditLangs, normalizeLang, t } from "../src/content/audit/translations.ts";
import { describe, detailKeys, formatDetail, localizeCheck, translatedCheckIds } from "../src/content/audit/checkTranslations.ts";
import { hasSchemaProperty, hasSchemaType, parsePage } from "../src/lib/audit/parsers.ts";
import { assessTech } from "../src/lib/audit/assessTech.ts";
import { assessLocal } from "../src/lib/audit/assessLocal.ts";
import { assessAi } from "../src/lib/audit/assessAi.ts";
import { assessPrivacy } from "../src/lib/audit/assessPrivacy.ts";
import { computeScore } from "../src/lib/audit/score.ts";
import { computePriorities } from "../src/lib/audit/prioritize.ts";
import { buildReportHtml } from "../src/lib/audit/report.ts";
// Keep these tests isolated from any developer or deployment credentials.
process.env.NODE_ENV = "test";
for (const name of ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "STORAGE_KV_REST_API_URL", "STORAGE_KV_REST_API_TOKEN"]) delete process.env[name];
const { saveAudit, getLead, consumeRate } = await import("../src/lib/redis.ts");
const { POST: auditPost } = await import("../src/app/api/audit/route.ts");
const { POST: leadPost } = await import("../src/app/api/lead/route.ts");

const html = `<html lang="fr-CH"><head><title>Example company services in Lausanne</title><meta name="description" content="A company in Lausanne offering professional services with clear contact information and local opening hours."><meta name="robots" content="index, follow"><meta name="viewport" content="width=device-width"><link rel="canonical" href="https://example.com/"><meta property="og:title" content="Example"><meta property="og:description" content="Services"><meta property="og:image" content="image.png"><meta property="og:url" content="https://example.com/"><script type="application/ld+json">{"@type":"LocalBusiness","name":"Example","telephone":"+41 21 559 19 33","address":{"streetAddress":"Rue Example 1","postalCode":"1000","addressLocality":"Lausanne"},"sameAs":["https://example.com/profile"]}</script></head><body><h1>Services in Lausanne</h1><h2>What do we offer?</h2><h2>How can you contact us?</h2><h3>Local services</h3><p>${"Useful local service information. ".repeat(100)} Lundi au samedi 08:00</p><a href="/a-propos">About</a><a href="/contact">Contact</a><a href="tel:+41215591933">Phone</a><a href="/confidentialite">Privacy</a></body></html>`;
const site = { url: "https://example.com/", finalUrl: "https://example.com/", status: 200, html, headers: {}, timeMs: 25 };
const page = parsePage(html);
const policyHtml = `<html><body><p>Responsable du traitement : Example SA. Finalités : répondre aux demandes. Données personnelles collectées : nom, e-mail. Durée de conservation : 12 mois. Droit d’accès, de rectification et d’effacement. Cookies et traceurs. Sous-traitants : hébergeur. Transfert hors de Suisse possible. Dernière mise à jour : 1er novembre 2026. Contact : privacy@example.ch. LPD applicable.</p></body></html>`;
const checks = [...assessTech(page, site), ...assessLocal(page, site), ...assessAi(page, site, { robotsTxt: "User-agent: *\nAllow: /\nUser-agent: GPTBot\nDisallow: /", robotsStatus: 200, llmsTxt: null }), ...assessPrivacy(page, site, { policyHtml, policyUrl: "https://example.com/confidentialite", policyStatus: 200 })];
const audit = { id: "translation-regression", url: site.url, lang: "fr", score: computeScore(checks), checks, priorities: computePriorities(checks), createdAt: "2026-10-08T09:00:00Z" };

test("all 34 checks have complete translated labels, recommendations and structured details", () => {
  const expected = [...techChecks, ...localChecks, ...aiChecks, ...privacyChecks].map(check => check.id).sort();
  assert.deepEqual(translatedCheckIds.sort(), expected);
  assert.equal(checks.length, 34);
  for (const lang of auditLangs) {
    const localized = checks.map(check => localizeCheck(check, lang));
    assert.deepEqual(computeScore(localized), audit.score, "translation must not alter scoring");
    for (const [index, check] of localized.entries()) {
      assert.ok(detailKeys.includes(check.detailKey), check.id);
      assert.ok(check.detail?.length, `${lang}: ${check.id} detail`);
      assert.ok(check.label.length && check.howToFix.length, `${lang}: ${check.id} copy`);
      if (lang !== "fr") {
        assert.notEqual(check.label, checks[index].label, `${lang}: French label fallback`);
        assert.notEqual(check.howToFix, checks[index].howToFix, `${lang}: French recommendation fallback`);
      }
    }
  }
});

test("detail variants interpolate evidence in every language without unresolved placeholders", () => {
  const values = { count: 2, invalid: 1, length: 42, title: "Example", value: "https://example.com", meta: "index, follow", header: "noindex", protocol: "https:", url: "https://example.com", status: 200, time: 25, signalIds: "schema,name,about,contact,sameAs,legal", h2: 3, h3: 1 };
  for (const lang of auditLangs) {
    for (const key of detailKeys) {
      const detail = formatDetail(lang, key, values);
      assert.ok(detail.length, `${lang}: ${key}`);
      assert.ok(!/\{\w+\}/.test(detail), `${lang}: ${key} placeholder`);
    }
  }
  assert.equal(formatDetail("en", "response", values), "HTTP status: 200 · Time: 25 ms");
  const identity = localizeCheck(checks.find(check => check.id === "ai-identity"), "en");
  assert.ok(identity.detail.includes("entity schema"));
  assert.ok(identity.detail.includes("About link"));
  assert.ok(!identity.detail.includes("lien À propos"));
});

test("complete email reports localize headings, modules, checks, statuses and share URL", () => {
  for (const lang of auditLangs) {
    const ui = t(lang);
    const report = buildReportHtml({ ...audit, lang });
    assert.ok(report.includes(`<html lang="${lang}">`));
    assert.ok(report.includes(ui.reportHeading));
    assert.ok(report.includes(ui.modulesTitle));
    assert.ok(report.includes(ui.modules.ai));
    assert.ok(report.includes(ui.checksTitle));
    assert.ok(report.includes(ui.labelWarn));
    assert.ok(report.includes(ui.disclaimer));
    assert.ok(report.includes(`/r/${audit.id}?lang=${lang}`));
    if (lang !== "fr") {
      assert.ok(!report.includes("Balise &lt;title&gt;"));
      assert.ok(!report.includes("Fichier /llms.txt"));
      assert.ok(!report.includes("Scores par module"));
      assert.ok(!report.includes("À vérifier"));
    }
  }
});

test("localization preserves safe escaping of remote evidence", () => {
  const injected = { ...techChecks[1], status: "warn", ...describe("title.present", { length: 42, title: '<img src=x onerror="alert(1)"> & remote' }) };
  const report = buildReportHtml({ ...audit, lang: "en", checks: [injected], priorities: [] });
  assert.ok(!report.includes('<img src=x'));
  assert.ok(report.includes('&lt;img src=x'));
  assert.ok(report.includes('&amp; remote'));
});

test("schema detection validates JSON and inspects types and keys rather than prose", () => {
  const invalid = parsePage('<script type="application/ld+json">{"@type":"Organization",</script>');
  assert.equal(invalid.jsonLd.length, 0);
  assert.equal(invalid.invalidJsonLdCount, 1);
  assert.equal(assessTech(invalid, site).find(check => check.id === "schema").status, "fail");
  const prose = ['{"@type":"Article","description":"Organization LocalBusiness sameAs address"}'];
  assert.equal(hasSchemaType(prose, ["Organization", "LocalBusiness"]), false);
  assert.equal(hasSchemaProperty(prose, "sameAs"), false);
  assert.equal(hasSchemaProperty(prose, "address"), false);
  assert.equal(hasSchemaType(['{"@graph":[{"@type":["https://schema.org/Organization","WebSite"],"sameAs":[]}]}'], ["Organization"]), true);
  assert.equal(parsePage('<script type=application/ld+json>{"@type":"Organization"}</script>').jsonLd.length, 1);
  assert.equal(parsePage('<script data-type="application/ld+json">{"@type":"Organization"}</script>').jsonLd.length, 0);
  assert.equal(parsePage('<meta name="description" content="Services > products, with a clear description.">').metaDescription, "Services > products, with a clear description.");
});

test("question-and-answer detection does not award points for script, style or comment templates", () => {
  const templateHtml = '<html><head><style>.example::after { content: "<h2>Fake?</h2>"; }</style><script>const template="<details><h2>Fake?</h2></details>";</script></head><body><!-- <details><h2>Fake?</h2></details> --><h1>Services</h1></body></html>';
  const parsed = parsePage(templateHtml);
  assert.equal(parsed.h2Count, 0);
  assert.equal(parsed.detailsCount, 0);
  assert.equal(parsed.questionHeadingCount, 0);
  assert.equal(assessAi(parsed, { ...site, html: templateHtml }, { robotsTxt: "", robotsStatus: 200, llmsTxt: null }).find(check => check.id === "ai-qa").status, "warn");
});

test("daily quota errors do not incorrectly tell users to retry in one hour", async () => {
  for (let i = 0; i < 20; i++) await consumeRate("locale-daily-test", "example.com", "day");
  for (const lang of auditLangs) {
    const response = await auditPost(new Request("http://localhost/api/audit", { method: "POST", headers: { "Content-Type": "application/json", "x-real-ip": "locale-daily-test" }, body: JSON.stringify({ url: "https://example.com", lang }) }));
    assert.equal(response.status, 429);
    assert.equal((await response.json()).error, t(lang).errorRateDay);
  }
});

test("audit and report validation errors use the requested language", async () => {
  for (const lang of auditLangs) {
    const request = new Request("http://localhost/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "not-a-domain", lang }) });
    const response = await auditPost(request);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, t(lang).errorUrl);
    const lead = await leadPost(new Request("http://localhost/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ auditId: audit.id, email: "invalid", consent: true, lang }) }));
    assert.equal(lead.status, 400);
    assert.equal((await lead.json()).error, t(lang).errorEmail);
  }
  assert.equal(normalizeLang("invalid", "de"), "de");
  assert.equal(normalizeLang(["de", "en"]), "fr");
});

test("report deliveries use localized subject/body and stable retry keys without sending mail", async () => {
  process.env.RESEND_API_KEY = "re_unit_dummy";
  await saveAudit(audit);
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async function (input, options) {
    const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
    assert.equal(url.hostname, "api.resend.com", "unexpected network request");
    calls.push({ path: url.pathname, payload: JSON.parse(options.body), headers: Object.fromEntries(new Headers(options.headers)) });
    return new Response(JSON.stringify({ id: "mock-delivery" }), { status: 200, headers: { "Content-Type": "application/json" } });
  };
  try {
    for (const lang of auditLangs) {
      const body = { auditId: audit.id, email: "test@example.com", consent: true, lang };
      for (let retry = 0; retry < 2; retry++) {
        const response = await leadPost(new Request("http://localhost/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
        assert.equal(response.status, 200);
      }
      const [first, second] = calls.slice(-2);
      const ui = t(lang);
      assert.equal(first.payload.subject, ui.emailSubject.replace("{score}", String(audit.score.total)));
      assert.ok(first.payload.html.includes(`<html lang="${lang}">`));
      assert.ok(first.payload.text.includes(`?lang=${lang}`));
      assert.deepEqual(first.headers, second.headers);
      assert.ok(first.headers["idempotency-key"]);
      const id = createHash("sha256").update(`${audit.id}:test@example.com:${lang}`).digest("hex");
      assert.equal((await getLead(id)).lang, lang);
    }
  } finally { globalThis.fetch = original; }
});
