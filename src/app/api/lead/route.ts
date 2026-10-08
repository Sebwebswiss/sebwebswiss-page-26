import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash } from "node:crypto";
import { getAudit, saveLead, StorageUnavailableError } from "@/lib/redis";
import type { StoredLead } from "@/lib/redis";
import { buildReportHtml } from "@/lib/audit/report";
import { normalizeLang, t } from "@/content/audit/translations";

export const runtime = "nodejs";
export const maxDuration = 20;

const emailIsValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req: Request) {
  let body: { auditId?: unknown; email?: unknown; consent?: unknown; lang?: unknown };
  try {
    body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: t("fr").errorRequest }, { status: 400 });
  }

  const lang = normalizeLang(body.lang);
  const ui = t(lang);

  if (typeof body.auditId !== "string" || !body.auditId) {
    return NextResponse.json({ error: ui.errorResult }, { status: 400 });
  }
  if (typeof body.email !== "string" || body.email.trim().length > 254 || !emailIsValid(body.email.trim())) {
    return NextResponse.json({ error: ui.errorEmail }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: ui.errorConsent }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase().slice(0, 254);

  let audit;
  try {
    audit = await getAudit(body.auditId);
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      return NextResponse.json({ error: ui.errorService }, { status: 503 });
    }
    throw error;
  }
  if (!audit) {
    return NextResponse.json({ error: ui.errorResult }, { status: 404 });
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    return NextResponse.json({ error: ui.errorMailConfig }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const deliveryId = createHash("sha256").update(`${audit.id}:${email}:${lang}`).digest("hex");
  const resultUrl = `https://sebwebswiss.ch/check-up-site-web/r/${encodeURIComponent(audit.id)}?lang=${lang}`;
  const message = {
    from: "SebWebSwiss <contact@sebwebswiss.ch>",
    to: [email],
    subject: ui.emailSubject.replace("{score}", String(audit.score.total)),
    html: buildReportHtml({ ...audit, lang }),
    text: ui.emailText.replace("{score}", String(audit.score.total)).replace("{url}", resultUrl),
  };
  const messageId = createHash("sha256").update(JSON.stringify(message)).digest("hex");

  const lead: StoredLead = {
    id: deliveryId,
    auditId: audit.id,
    email,
    consent: true,
    lang,
    createdAt: new Date().toISOString(),
  };

  try {
    const { error } = await resend.emails.send(message, { idempotencyKey: `checkup-report-${messageId}` });
    if (error) throw new Error("Email delivery failed");
  } catch {
    return NextResponse.json({ error: ui.errorMailDelivery }, { status: 502 });
  }

  try {
    await saveLead(lead);
  } catch (storageError) {
    if (storageError instanceof StorageUnavailableError) {
      return NextResponse.json({ error: ui.errorService }, { status: 503 });
    }
    throw storageError;
  }

  return NextResponse.json({ ok: true });
}
