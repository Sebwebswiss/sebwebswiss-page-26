import assert from "node:assert/strict";
import test from "node:test";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { parsePage, isRobotsBlockingIndex } from "../src/lib/audit/parsers.ts";
import { assessTech } from "../src/lib/audit/assessTech.ts";
import { assessLocal } from "../src/lib/audit/assessLocal.ts";
import { assessAi } from "../src/lib/audit/assessAi.ts";
import { computeScore } from "../src/lib/audit/score.ts";
import { computePriorities } from "../src/lib/audit/prioritize.ts";
import { buildReportHtml } from "../src/lib/audit/report.ts";
import { fetchSite, SsrfError, MAX_BYTES } from "../src/lib/audit/fetchSite.ts";

process.env.NODE_ENV = "test";
process.env.RESEND_API_KEY = "re_unit_dummy";
for (const name of ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "STORAGE_KV_REST_API_URL", "STORAGE_KV_REST_API_TOKEN"]) delete process.env[name];
const { POST: auditPost } = await import("../src/app/api/audit/route.ts");
const { POST: leadPost } = await import("../src/app/api/lead/route.ts");
const { POST: contactPost } = await import("../src/app/api/contact/route.ts");

const html = `<html lang=fr-CH><head><title>Une entreprise locale à Lausanne</title><meta content="L'agence web &amp; l'entreprise &#x27;locale&#39;" name=description><meta name=robots content="index, follow"><meta name=viewport content="width=device-width"><link href="https://example.com/?a=1&amp;b=2" rel=canonical><script type="application/ld+json">{"@type":"Organization","name":"Example"}</script><script>const template='<h1>fake</h1><meta name="description" content="fake">';</script></head><body><h1>Une entreprise</h1><p>Contact 021 559 19 33 à Lausanne</p><!-- <h1>comment</h1> --><a href="/contact?a=1&amp;b=2">Contact</a></body></html>`;
const site = { url: "http://example.com/", finalUrl: "https://example.com/", status: 200, html, headers: {}, timeMs: 10 };
const page = parsePage(html);

test("HTML parsing handles apostrophes, unquoted attributes, entities and hidden templates", () => {
  assert.equal(page.metaDescription, "L'agence web & l'entreprise 'locale'");
  assert.equal(page.h1Count, 1);
  assert.equal(page.htmlLang, "fr-CH");
  assert.equal(page.canonical, "https://example.com/?a=1&b=2");
  assert.equal(page.links[0], "/contact?a=1&b=2");
  assert.equal(page.jsonLd.length, 1);
  assert.ok(!page.text.includes("fake"));
});

test("indexing checks include regional language tags, headers and robots none", () => {
  assert.equal(assessTech(page, site).find(check => check.id === "lang").status, "ok");
  assert.equal(assessTech(page, site).find(check => check.id === "https").status, "ok");
  assert.equal(assessTech(page, { ...site, headers: { "x-robots-tag": "googlebot: noindex" } }).find(check => check.id === "robots").status, "fail");
  assert.equal(isRobotsBlockingIndex("none"), true);
  assert.equal(isRobotsBlockingIndex("index, follow"), false);
});

test("Swiss domestic phones are detected without schema", () => {
  assert.equal(assessLocal(page, site).find(check => check.id === "phone").status, "ok");
});

test("robots rules respect specificity, merged groups and Allow precedence", () => {
  const status = (robotsTxt, robotsStatus) => assessAi(page, site, { robotsTxt, robotsStatus, llmsTxt: null }).find(check => check.id === "ai-crawlers").status;
  assert.equal(status("User-agent: *\nDisallow: /\nUser-agent: OAI-SearchBot\nAllow: /"), "ok");
  assert.equal(status("User-agent: *\nAllow: /\nUser-agent: OAI-SearchBot\nDisallow: /"), "fail");
  assert.equal(status("User-agent: OAI-SearchBot\nDisallow: /\nUser-agent: OAI-SearchBot\nAllow: /"), "ok");
  assert.equal(status("User-agent: *\nDisallow: /\nUser-agent: OAI-SearchBot\nDisallow:"), "ok");
  assert.equal(status("User-agent: GPTBot\nDisallow: /"), "ok");
  assert.equal(status("", 200), "ok");
  assert.equal(status(null, 404), "ok");
  assert.equal(status(null, null), "warn");
  assert.equal(status(null, 503), "warn");
});

test("informational llms.txt cannot reduce scores or enter priorities", () => {
  const privacy = privacyChecks.map(check => ({ ...check, status: "ok" }));
  const checks = [...assessTech(page, site), ...assessLocal(page, site), ...assessAi(page, site, { robotsTxt: "", robotsStatus: 200, llmsTxt: null }), ...privacy].map(check => ({ ...check, status: check.id === "ai-llms-txt" ? "warn" : "ok" }));
  assert.equal(computeScore(checks).total, 100);
  assert.ok(computeScore(checks).modules.every(module => module.status === "ok"));
  assert.equal(computePriorities(checks).length, 0);
});

test("legacy email evidence and tag labels remain escaped", () => {
  const check = { ...assessTech(page, site).find(check => check.id === "title"), detailKey: undefined, detail: '<img src=x onerror="alert(1)">', status: "warn" };
  const report = buildReportHtml({ id: "test", url: "https://example.com/?q=<img src=x>", lang: "fr", createdAt: "2026-10-08T00:00:00Z", checks: [check], priorities: [], score: computeScore([check]) });
  assert.ok(!report.includes("<img src=x"));
  assert.ok(report.includes("&lt;img src=x"));
  assert.ok(report.includes("Balise &lt;title&gt;"));
});

test("malformed and non-object API JSON returns 400 without side effects", async () => {
  for (const handler of [auditPost, leadPost, contactPost]) {
    for (const body of ["null", "[]", "42", '"text"', "{"]) {
      const response = await handler(new Request("http://localhost/api/test", { method: "POST", headers: { "Content-Type": "application/json" }, body }));
      assert.equal(response.status, 400);
    }
  }
});

test("private IPv6, mapped IPv4 and redirect destinations are blocked before fetch", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response("<html/>"); };
  try {
    for (const url of ["http://[::1]/", "http://[fd00::123]/", "http://[fe80::1]/", "http://[::ffff:127.0.0.1]/", "http://127.0.0.1/", "http://10.0.0.1/"]) await assert.rejects(fetchSite(url), SsrfError);
    assert.equal(calls, 0);
    assert.equal((await fetchSite("https://[2606:4700:4700::1111]/")).status, 200);
    assert.equal(calls, 1);
    globalThis.fetch = async () => { calls++; return new Response(null, { status: 302, headers: { location: "http://[::1]/" } }); };
    await assert.rejects(fetchSite("https://8.8.8.8/"), SsrfError);
    assert.equal(calls, 2);
  } finally { globalThis.fetch = original; }
});

test("private IPv6 DNS answers cannot be silently skipped", async () => {
  const require = createRequire(import.meta.url);
  const dns = require("node:dns/promises");
  const original = dns.lookup;
  dns.lookup = async () => [{ address: "fd00::123", family: 6 }];
  syncBuiltinESMExports();
  try { await assert.rejects(fetchSite("http://private.test/"), SsrfError); }
  finally { dns.lookup = original; syncBuiltinESMExports(); }
});

test("redirects share one timeout budget and oversized responses are rejected", async () => {
  const original = globalThis.fetch;
  const signals = new Set();
  globalThis.fetch = async (_input, options) => {
    const signal = options.signal;
    signals.add(signal);
    await new Promise((resolve, reject) => {
      const onAbort = () => { clearTimeout(timer); reject(signal.reason); };
      const timer = setTimeout(() => { signal.removeEventListener("abort", onAbort); resolve(); }, 50);
      signal.addEventListener("abort", onAbort, { once: true });
    });
    return new Response(null, { status: 302, headers: { location: "https://8.8.8.8/next" } });
  };
  try {
    await assert.rejects(fetchSite("https://8.8.8.8/", 80));
    assert.equal(signals.size, 1);
    globalThis.fetch = async () => new Response("large", { headers: { "content-length": String(MAX_BYTES + 1) } });
    await assert.rejects(fetchSite("https://8.8.8.8/"), /volumineuse/);
  } finally { globalThis.fetch = original; }
});

// --- nDSG / privacy module ---

import { assessPrivacy, findPrivacyLink } from "../src/lib/audit/assessPrivacy.ts";
import { privacyChecks } from "../src/content/audit/checks.ts";

const privacyHome = `<html lang="fr"><body>
<footer><a href="/confidentialite">Politique de confidentialité</a></footer>
<div class="consent-bar"><button>Refuser</button><button>Accepter</button></div>
<form><input type="checkbox" required><span>J’accepte la politique</span><button>Envoyer</button></form>
</body></html>`;

const privacyPolicy = `<html lang="fr"><body>
<h1>Politique de confidentialité</h1>
<p>Responsable du traitement : Example SA.</p>
<p>Finalités : répondre aux demandes.</p>
<p>Données personnelles collectées : nom, e-mail.</p>
<p>Durée de conservation : 12 mois.</p>
<p>Droit d’accès, de rectification et d’effacement.</p>
<p>Cookies et traceurs.</p>
<p>Sous-traitants : hébergeur.</p>
<p>Transfert hors de Suisse possible.</p>
<p>Dernière mise à jour : 1er novembre 2026.</p>
<p>Contact : privacy@example.ch. LPD applicable.</p>
</body></html>`;

const privacySite = (body) => ({ url: "https://example.ch/", finalUrl: "https://example.ch/", status: 200, html: body, headers: {}, timeMs: 10 });

test("privacy link detection prefers same-origin policy pages and ignores mailto", () => {
  assert.equal(findPrivacyLink(privacyHome, "https://example.ch/"), "https://example.ch/confidentialite");
  assert.equal(findPrivacyLink(`<a href="mailto:privacy@example.ch">Privacy</a>`, "https://example.ch/"), null);
  assert.equal(findPrivacyLink(`<a href="https://iubenda.example/policy">Privacy policy</a>`, "https://example.ch/"), "https://iubenda.example/policy");
});

test("nDSG module passes a complete policy with a custom consent banner", () => {
  const results = assessPrivacy({}, privacySite(privacyHome), {
    policyHtml: privacyPolicy,
    policyUrl: "https://example.ch/confidentialite",
    policyStatus: 200,
  });
  const byId = Object.fromEntries(results.map((check) => [check.id, check]));
  assert.equal(byId["privacy-link"].status, "ok");
  assert.equal(byId["privacy-page"].status, "ok");
  assert.equal(byId["privacy-content"].status, "ok");
  assert.equal(byId["privacy-rights"].status, "ok");
  assert.equal(byId["privacy-consent"].status, "ok");
  assert.equal(byId["privacy-forms"].status, "ok");
  assert.equal(byId["privacy-law"].status, "ok");
  const points = results.reduce((sum, check) => sum + (check.status === "ok" ? check.weight : check.status === "warn" ? Math.round(check.weight * 0.5) : 0), 0);
  assert.equal(points, 50);
});

test("nDSG module flags trackers without consent and a missing policy", () => {
  const html = `<html><body><script src="https://www.googletagmanager.com/gtag/js?id=G-ABC123456"></script><a href="/privacy">Privacy</a></body></html>`;
  const results = assessPrivacy({}, privacySite(html), {
    policyHtml: null,
    policyUrl: "https://example.ch/privacy",
    policyStatus: 200,
  });
  const byId = Object.fromEntries(results.map((check) => [check.id, check]));
  assert.equal(byId["privacy-consent"].status, "fail");
  assert.equal(byId["privacy-page"].status, "fail");
  assert.equal(byId["privacy-content"].status, "warn");

  const noPolicy = assessPrivacy({}, privacySite("<html><body><p>Hello</p></body></html>"), {
    policyHtml: null,
    policyUrl: null,
    policyStatus: null,
  });
  assert.equal(noPolicy.find((check) => check.id === "privacy-link").status, "fail");
  assert.equal(noPolicy.find((check) => check.id === "privacy-page").status, "fail");
});

test("nDSG module marks an external policy as partially verifiable", () => {
  const results = assessPrivacy({}, privacySite(privacyHome), {
    policyHtml: null,
    policyUrl: "https://iubenda.example/policy",
    policyStatus: null,
    policyExternal: true,
  });
  const byId = Object.fromEntries(results.map((check) => [check.id, check]));
  assert.equal(byId["privacy-link"].status, "ok");
  assert.equal(byId["privacy-page"].status, "warn");
  assert.equal(byId["privacy-content"].status, "warn");
});

test("score includes the privacy module in the denominator", () => {
  const results = assessPrivacy({}, privacySite(privacyHome), {
    policyHtml: privacyPolicy,
    policyUrl: "https://example.ch/confidentialite",
    policyStatus: 200,
  });
  const score = computeScore(results);
  assert.equal(score.modules.length, 4);
  assert.equal(score.max, 100);
  assert.equal(score.total, 25);
  assert.deepEqual(score.modules.map((m) => m.module), ["tech", "local", "ai", "privacy"]);
});
