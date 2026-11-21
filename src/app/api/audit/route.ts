import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { fetchSite } from "@/lib/audit/fetchSite";
import { parsePage } from "@/lib/audit/parsers";
import { assessTech } from "@/lib/audit/assessTech";
import { assessLocal } from "@/lib/audit/assessLocal";
import { assessAi } from "@/lib/audit/assessAi";
import { assessPrivacy, findPrivacyLink } from "@/lib/audit/assessPrivacy";
import { computeScore } from "@/lib/audit/score";
import { computePriorities } from "@/lib/audit/prioritize";
import { consumeRate, saveAudit, StorageUnavailableError } from "@/lib/redis";
import type { CheckResult } from "@/content/audit/checks";
import { normalizeLang, t } from "@/content/audit/translations";
import { localizeCheck } from "@/content/audit/checkTranslations";

export const runtime = "nodejs";
export const maxDuration = 20;

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-vercel-forwarded-for") ?? req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function normalizeUrl(raw: string): string | null {
  let candidate = raw.trim();
  if (!candidate) return null;
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const u = new URL(candidate);
    if (!u.hostname.includes(".") || u.hostname === "localhost") return null;
    return u.toString();
  } catch {
    return null;
  }
}

function normalizeHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "unknown";
  }
}

async function fetchOptionalText(url: string): Promise<{ text: string | null; status: number | null }> {
  try {
    const res = await fetchSite(url, 4000);
    if (res.status !== 200) return { text: null, status: res.status };
    const type = res.headers["content-type"] ?? "";
    if (/text\/html/i.test(type)) return { text: null, status: res.status };
    return { text: res.html.slice(0, 200_000), status: res.status };
  } catch {
    return { text: null, status: null };
  }
}

async function fetchOptionalHtml(url: string): Promise<{ html: string | null; status: number | null }> {
  try {
    const res = await fetchSite(url, 4000);
    if (res.status !== 200) return { html: null, status: res.status };
    const type = res.headers["content-type"] ?? "";
    if (!/text\/html/i.test(type)) return { html: null, status: res.status };
    return { html: res.html.slice(0, 300_000), status: res.status };
  } catch {
    return { html: null, status: null };
  }
}

export async function POST(req: Request) {
  let body: { url?: unknown; lang?: unknown };
  try {
    body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: t("fr").errorUrl }, { status: 400 });
  }

  const lang = normalizeLang(body.lang);
  const ui = t(lang);
  if (typeof body.url !== "string") {
    return NextResponse.json({ error: ui.errorUrl }, { status: 400 });
  }

  const url = normalizeUrl(body.url);
  if (!url) {
    return NextResponse.json({ error: ui.errorUrl }, { status: 400 });
  }

  const host = normalizeHost(url);
  const ip = getClientIp(req);

  try {
    let hour: number;
    try {
      hour = await consumeRate(ip, host, "hour");
    } catch (error) {
      if (error instanceof StorageUnavailableError) throw error;
      hour = 0;
    }
    if (hour > 5) {
      return NextResponse.json({ error: ui.errorRate }, { status: 429 });
    }
    let day: number;
    try {
      day = await consumeRate(ip, host, "day");
    } catch (error) {
      if (error instanceof StorageUnavailableError) throw error;
      day = 0;
    }
    if (day > 20) {
      return NextResponse.json({ error: ui.errorRateDay }, { status: 429 });
    }
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      return NextResponse.json({ error: ui.errorService }, { status: 503 });
    }
    // never hard-fail on rate limiter unavailability
  }

  try {
    const site = await fetchSite(url);
    const page = parsePage(site.html);

    const origin = new URL(site.finalUrl).origin;
    const privacyUrl = findPrivacyLink(site.html, site.finalUrl);
    let privacySameOrigin = false;
    try {
      privacySameOrigin = Boolean(privacyUrl && new URL(privacyUrl).origin === origin);
    } catch {
      privacySameOrigin = false;
    }

    const [robotsTxt, llmsTxt, privacyPage] = await Promise.all([
      fetchOptionalText(`${origin}/robots.txt`),
      fetchOptionalText(`${origin}/llms.txt`),
      privacySameOrigin && privacyUrl
        ? fetchOptionalHtml(privacyUrl)
        : Promise.resolve({ html: null, status: null }),
    ]);

    const checks: CheckResult[] = [...assessTech(page, site), ...assessLocal(page, site), ...assessAi(page, site, {
      robotsTxt: robotsTxt.text,
      robotsStatus: robotsTxt.status,
      llmsTxt: llmsTxt.text,
    }), ...assessPrivacy(page, site, {
      policyHtml: privacyPage.html,
      policyUrl: privacyUrl,
      policyStatus: privacyPage.status,
      policyExternal: Boolean(privacyUrl && !privacySameOrigin),
    })].map(check => localizeCheck(check, lang));
    const score = computeScore(checks);
    const priorities = computePriorities(checks, 3).map(priority => ({ ...priority, effortLabel: ui.efforts[priority.check.effort] }));

    const id = randomUUID();
    const audit = {
      id,
      url,
      lang,
      score,
      checks,
      priorities,
      createdAt: new Date().toISOString(),
    };

    await saveAudit(audit);

    return NextResponse.json({
      ok: true,
      id,
      url,
      lang,
      score,
      checks,
      priorities,
      resultUrl: `/check-up-site-web/r/${id}`,
    });
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      return NextResponse.json({ error: ui.errorService }, { status: 503 });
    }
    return NextResponse.json({ error: ui.errorGeneric }, { status: 422 });
  }
}
