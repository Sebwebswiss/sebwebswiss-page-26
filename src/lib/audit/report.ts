import type { StoredAudit } from "@/lib/redis";
import { normalizeLang, statusLabel, t } from "@/content/audit/translations";
import { localizeCheck } from "@/content/audit/checkTranslations";

const statusColor: Record<string, string> = { ok: "#1a7f37", warn: "#b76e00", fail: "#b42318" };

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

export function buildReportHtml(audit: StoredAudit): string {
  const lang = normalizeLang(audit.lang);
  const ui = t(lang);
  const legacy = lang !== "fr" && audit.checks.some(check => !check.detailKey && check.detail);
  const rows = audit.checks
    .map(check => localizeCheck(check, lang))
    .map((c) => {
      const color = statusColor[c.status];
      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #ececf1;font-weight:600;color:#1c2430">${escapeHtml(c.label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #ececf1;color:#4a5568;font-size:14px">${escapeHtml(c.detail ?? "")}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #ececf1;color:${color};font-weight:700;white-space:nowrap">${statusLabel(c.status, lang)}</td>
        </tr>`;
    })
    .join("");

  const priorities = audit.priorities
    .map(priority => ({ ...priority, check: localizeCheck(priority.check, lang) }))
    .map(
      (p) => `
        <li style="margin:0 0 18px;padding:14px 16px;background:#f7f8fa;border-left:3px solid #ff7a1a;border-radius:6px">
          <strong style="color:#1c2430">${escapeHtml(p.check.label)}</strong>
          <p style="margin:6px 0 0;color:#4a5568;font-size:14px;line-height:1.5">${escapeHtml(p.check.howToFix)}</p>
        </li>`
    )
    .join("");

  const moduleRows = [...audit.score.modules, ...(audit.score.informational ?? [])]
    .map((m) => {
      const value = m.max > 0 ? `${m.points}/${m.max}` : ui.informationalShort;
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #ececf1;color:#1c2430">${ui.modules[m.module]}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #ececf1;color:#1c2430;font-weight:700">${value}</td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f1f5;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0d11;padding:28px 0">
    <tr><td align="center" style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-.3px">Seb<span style="color:#ff7a1a">Web</span>Swiss<i style="color:#d8ff5d">.</i></td></tr>
    <tr><td align="center" style="color:#a9b0bd;font-size:14px;padding-top:6px">${ui.appName}</td></tr>
  </table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 20px">
    <tr><td align="center" style="max-width:680px;background:#ffffff;border-radius:14px;padding:32px 30px;box-shadow:0 8px 30px rgba(0,0,0,.08)">
      <h1 style="margin:0 0 8px;font-size:22px;color:#1c2430">${ui.reportHeading}</h1>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px">${escapeHtml(audit.url)} · ${ui.analyzedOn} ${new Date(audit.createdAt).toLocaleDateString(ui.locale)}</p>
      ${legacy ? `<p style="color:#6b7280;font-size:14px">${ui.legacyReport}</p>` : ""}
      <div style="margin:0 0 26px">
        <span style="font-size:52px;font-weight:800;color:${audit.score.total >= 70 ? "#1a7f37" : audit.score.total >= 40 ? "#b76e00" : "#b42318"}">${audit.score.total}<span style="font-size:24px;color:#9ca3af">/100</span></span>
      </div>
      <h2 style="margin:0 0 12px;font-size:16px;color:#1c2430;text-align:left">${ui.modulesTitle}</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 26px">
        ${moduleRows}
      </table>
      <h2 style="margin:0 0 12px;font-size:16px;color:#1c2430;text-align:left">${ui.prioritiesTitle}</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:0">
        <ol style="margin:0;padding-left:0;list-style:none">${priorities || `<li style="color:#1a7f37">${ui.allOk}</li>`}</ol>
      </td></tr></table>
      <h2 style="margin:30px 0 12px;font-size:16px;color:#1c2430;text-align:left">${ui.checksTitle}</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
        <tr><th align="left" style="padding:10px 12px;background:#f3f4f6;font-size:13px;color:#6b7280;text-transform:uppercase">${ui.checkColumn}</th><th align="left" style="padding:10px 12px;background:#f3f4f6;font-size:13px;color:#6b7280;text-transform:uppercase">${ui.detailColumn}</th><th align="left" style="padding:10px 12px;background:#f3f4f6;font-size:13px;color:#6b7280;text-transform:uppercase">${ui.statusColumn}</th></tr>
        ${rows}
      </table>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:32px">
        <tr><td align="center">
          <a href="https://sebwebswiss.ch/contact" style="background:#ff7a1a;color:#150a02;padding:14px 26px;border-radius:999px;font-weight:700;text-decoration:none;font-size:15px">${ui.ctaButton}</a>
        </td></tr>
        <tr><td align="center" style="padding-top:20px"><a href="https://sebwebswiss.ch/check-up-site-web/r/${encodeURIComponent(audit.id)}?lang=${lang}" style="color:#a94700;font-size:14px">${ui.viewReport}</a></td></tr>
        <tr><td align="center" style="padding-top:16px;color:#6b7280;font-size:12px">${ui.disclaimer}</td></tr>
      </table>
    </td></tr>
  </table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0d11;padding:18px 0">
    <tr><td align="center" style="color:#9ba3b0;font-size:12px">© ${new Date().getFullYear()} SebWebSwiss · Lausanne · Suisse romande</td></tr>
  </table>
</body>
</html>`;
}
