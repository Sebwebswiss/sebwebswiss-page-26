import type { StoredAudit } from "@/lib/redis";
import { moduleMeta } from "@/content/audit/checks";
import type { Lang } from "@/content/audit/checks";
import { t } from "@/content/audit/translations";

const statusLabel: Record<string, string> = { ok: "OK", warn: "À vérifier", fail: "À corriger" };
const statusColor: Record<string, string> = { ok: "#1a7f37", warn: "#b76e00", fail: "#b42318" };

const LANGS: Lang[] = ["fr", "de", "it", "en"];

function langToLocale(lang: string): Lang {
  return LANGS.includes(lang as Lang) ? (lang as Lang) : "fr";
}

export function buildReportHtml(audit: StoredAudit): string {
  const ui = t(langToLocale(audit.lang));
  const rows = audit.checks
    .map((c) => {
      const color = statusColor[c.status];
      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #ececf1;font-weight:600;color:#1c2430">${c.label}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #ececf1;color:#4a5568;font-size:14px">${c.detail ?? ""}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #ececf1;color:${color};font-weight:700;white-space:nowrap">${statusLabel[c.status]}</td>
        </tr>`;
    })
    .join("");

  const priorities = audit.priorities
    .map(
      (p) => `
        <li style="margin:0 0 18px;padding:14px 16px;background:#f7f8fa;border-left:3px solid #ff7a1a;border-radius:6px">
          <strong style="color:#1c2430">${p.check.label}</strong>
          <p style="margin:6px 0 0;color:#4a5568;font-size:14px;line-height:1.5">${p.check.howToFix}</p>
        </li>`
    )
    .join("");

  const moduleRows = audit.score.modules
    .map((m) => {
      const meta = moduleMeta[m.module];
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #ececf1;color:#1c2430">${meta.title}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #ececf1;color:#1c2430;font-weight:700">${m.points}/${m.max}</td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f0f1f5;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0d11;padding:28px 0">
    <tr><td align="center" style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-.3px">Seb<span style="color:#ff7a1a">Web</span>Swiss<i style="color:#d8ff5d">.</i></td></tr>
    <tr><td align="center" style="color:#a9b0bd;font-size:14px;padding-top:6px">${ui.appName}</td></tr>
  </table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 20px">
    <tr><td align="center" style="max-width:680px;background:#ffffff;border-radius:14px;padding:32px 30px;box-shadow:0 8px 30px rgba(0,0,0,.08)">
      <h1 style="margin:0 0 8px;font-size:22px;color:#1c2430">Votre check-up SEO & visibilité locale</h1>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px">${audit.url} · analysé le ${new Date(audit.createdAt).toLocaleDateString("fr-CH")}</p>
      <div style="margin:0 0 26px">
        <span style="font-size:52px;font-weight:800;color:${audit.score.total >= 70 ? "#1a7f37" : audit.score.total >= 40 ? "#b76e00" : "#b42318"}">${audit.score.total}<span style="font-size:24px;color:#9ca3af">/100</span></span>
      </div>
      <h2 style="margin:0 0 12px;font-size:16px;color:#1c2430;text-align:left">Scores par module</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 26px">
        ${moduleRows}
      </table>
      <h2 style="margin:0 0 12px;font-size:16px;color:#1c2430;text-align:left">${ui.prioritiesTitle}</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:0">
        <ol style="margin:0;padding-left:0;list-style:none">${priorities}</ol>
      </td></tr></table>
      <h2 style="margin:30px 0 12px;font-size:16px;color:#1c2430;text-align:left">Détail des vérifications</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
        <tr><th align="left" style="padding:10px 12px;background:#f3f4f6;font-size:13px;color:#6b7280;text-transform:uppercase">Vérification</th><th align="left" style="padding:10px 12px;background:#f3f4f6;font-size:13px;color:#6b7280;text-transform:uppercase">Détail</th><th align="left" style="padding:10px 12px;background:#f3f4f6;font-size:13px;color:#6b7280;text-transform:uppercase">Statut</th></tr>
        ${rows}
      </table>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:32px">
        <tr><td align="center">
          <a href="https://sebwebswiss.ch/check-up-site-web" style="background:#ff7a1a;color:#150a02;padding:14px 26px;border-radius:999px;font-weight:700;text-decoration:none;font-size:15px">${ui.ctaButton}</a>
        </td></tr>
        <tr><td align="center" style="padding-top:16px;color:#9ca3af;font-size:12px">Cet outil fournit des indications automatisées et ne constitue pas un avis juridique.</td></tr>
      </table>
    </td></tr>
  </table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0d11;padding:18px 0">
    <tr><td align="center" style="color:#9ba3b0;font-size:12px">© ${new Date().getFullYear()} SebWebSwiss · Lausanne · Suisse romande</td></tr>
  </table>
</body>
</html>`;
}