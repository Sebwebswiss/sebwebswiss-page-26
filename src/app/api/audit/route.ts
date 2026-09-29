import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { fetchSite } from "@/lib/audit/fetchSite";
import { parsePage } from "@/lib/audit/parsers";
import { assessTech } from "@/lib/audit/assessTech";
import { assessLocal } from "@/lib/audit/assessLocal";
import { computeScore } from "@/lib/audit/score";
import { computePriorities } from "@/lib/audit/prioritize";
import { consumeRate, saveAudit, StorageUnavailableError } from "@/lib/redis";
import type { CheckResult } from "@/content/audit/checks";
import { t } from "@/content/audit/translations";

export const runtime = "nodejs";
export const maxDuration = 20;

const LANGS = ["fr", "de", "it", "en"];

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

export async function POST(req: Request) {
  let body: { url?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: t("fr").errorUrl }, { status: 400 });
  }

  if (typeof body.url !== "string") {
    return NextResponse.json({ error: t("fr").errorUrl }, { status: 400 });
  }

  const url = normalizeUrl(body.url);
  if (!url) {
    return NextResponse.json({ error: t("fr").errorUrl }, { status: 400 });
  }

  const lang = typeof body.lang === "string" && LANGS.includes(body.lang) ? body.lang : "fr";
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
      return NextResponse.json({ error: t("fr").errorRate }, { status: 429 });
    }
    let day: number;
    try {
      day = await consumeRate(ip, host, "day");
    } catch (error) {
      if (error instanceof StorageUnavailableError) throw error;
      day = 0;
    }
    if (day > 20) {
      return NextResponse.json({ error: t("fr").errorRate }, { status: 429 });
    }
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      return NextResponse.json({ error: t("fr").errorService }, { status: 503 });
    }
    // never hard-fail on rate limiter unavailability
  }

  try {
    const site = await fetchSite(url);
    const page = parsePage(site.html);

    const checks: CheckResult[] = [...assessTech(page, site), ...assessLocal(page, site)];
    const score = computeScore(checks);
    const priorities = computePriorities(checks, 3);

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
      return NextResponse.json({ error: t("fr").errorService }, { status: 503 });
    }
    const message = error instanceof Error ? error.message : t("fr").errorGeneric;
    return NextResponse.json({ error: message }, { status: 422 });
  }
}