import { NextResponse } from "next/server";
import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { getAudit, saveLead } from "@/lib/redis";
import type { StoredLead } from "@/lib/redis";
import { buildReportHtml } from "@/lib/audit/report";

export const runtime = "nodejs";
export const maxDuration = 20;

const LANGS = ["fr", "de", "it", "en"];

const emailIsValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req: Request) {
  let body: { auditId?: unknown; email?: unknown; consent?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (typeof body.auditId !== "string" || !body.auditId) {
    return NextResponse.json({ error: "Résultat introuvable." }, { status: 400 });
  }
  if (typeof body.email !== "string" || !emailIsValid(body.email.trim())) {
    return NextResponse.json({ error: "Veuillez indiquer une adresse e-mail valide." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Votre consentement est nécessaire pour recevoir le rapport." }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase().slice(0, 254);
  const lang = typeof body.lang === "string" && LANGS.includes(body.lang) ? body.lang : "fr";

  const audit = await getAudit(body.auditId);
  if (!audit) {
    return NextResponse.json({ error: "Ce résultat n’est plus disponible." }, { status: 404 });
  }

  if (typeof process.env.RESEND_API_KEY !== "string") {
    return NextResponse.json({ error: "Configuration e-mail manquante." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const lead: StoredLead = {
    id: randomUUID(),
    auditId: audit.id,
    email,
    consent: true,
    lang,
    createdAt: new Date().toISOString(),
  };

  const { error } = await resend.emails.send({
    from: "SebWebSwiss <contact@sebwebswiss.ch>",
    to: [email],
    subject: `Votre check-up SEO & visibilité locale — ${audit.score.total}/100`,
    html: buildReportHtml(audit),
    text: `Votre score : ${audit.score.total}/100.\n\nConsultez le rapport détaillé sur https://sebwebswiss.ch/check-up-site-web/r/${audit.id}\n\nSebWebSwiss — Lausanne · Suisse romande`,
  });

  if (error) {
    return NextResponse.json({ error: "L’envoi a échoué. Veuillez réessayer." }, { status: 502 });
  }

  await saveLead(lead);

  return NextResponse.json({ ok: true });
}