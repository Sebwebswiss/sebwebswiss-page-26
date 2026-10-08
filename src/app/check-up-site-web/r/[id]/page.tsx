import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAudit, StorageUnavailableError } from "@/lib/redis";
import { normalizeLang, statusLabel, t } from "@/content/audit/translations";
import { localizeCheck } from "@/content/audit/checkTranslations";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ lang?: string | string[] }> };
const loadAudit = cache(getAudit);

const statusClass: Record<string, string> = { ok: "audit-status-ok", warn: "audit-status-warn", fail: "audit-status-fail" };
const gradeColor: Record<string, string> = { bad: "#ff8f8f", fair: "#ffc36b", good: "#6ad487", excellent: "#6ad487" };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const query = await searchParams;
  let lang = normalizeLang(query.lang);
  try {
    const audit = await loadAudit(id);
    lang = normalizeLang(query.lang, normalizeLang(audit?.lang));
  } catch (error) {
    if (!(error instanceof StorageUnavailableError)) throw error;
  }
  const ui = t(lang);
  return { title: ui.resultHeading, description: ui.reportDescription, robots: { index: false, follow: false } };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;
  let audit;
  try {
    audit = await loadAudit(id);
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      const lang = normalizeLang(query.lang);
      const ui = t(lang);
      return (
        <>
          <Header />
          <main lang={lang}>
            <section className="audit-hero audit-hero-result">
              <p className="eyebrow"><span /> {ui.checkedBy}</p>
              <h1>{ui.resultHeading}</h1>
            </section>
            <section className="audit-result audit-result-shared">
              <p className="audit-error" role="alert">{ui.errorService}</p>
              <div className="audit-result-cta">
                <Link className="button primary" href="/check-up-site-web">{ui.repeatCheckup} <span>↗</span></Link>
              </div>
            </section>
          </main><Footer />
        </>
      );
    }
    throw error;
  }
  if (!audit) notFound();

  const lang = normalizeLang(query.lang, normalizeLang(audit.lang));
  const ui = t(lang);
  const checks = audit.checks.map(check => localizeCheck(check, lang));
  const legacy = lang !== "fr" && audit.checks.some(check => !check.detailKey && check.detail);
  const priorities = audit.priorities.map(priority => ({ ...priority, check: localizeCheck(priority.check, lang) }));

  return (
    <>
      <Header />
      <main lang={lang}>
        <section className="audit-hero audit-hero-result">
          <p className="eyebrow"><span /> {ui.checkedBy}</p>
          <h1>{ui.resultHeading}</h1>
          {legacy && <p className="audit-note">{ui.legacyReport}</p>}
          <p className="audit-result-url">{audit.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</p>
          <div className="audit-score-static" style={{ "--grade-color": gradeColor[audit.score.grade] } as React.CSSProperties}>
            <strong>{audit.score.total}</strong>
            <span>/100</span>
            <em>{ui.grades[audit.score.grade as keyof typeof ui.grades]}</em>
          </div>
        </section>

        <section className="audit-result audit-result-shared">
          <div className="audit-modules">
            <h2 className="sr-only">{ui.modulesTitle}</h2>
            {audit.score.modules.map((m) => (
              <article className="audit-module" key={m.module}>
                <div>
                  <p className="audit-module-kicker">{ui.modules[m.module]}</p>
                  <h3>{m.points}<small>/{m.max}</small></h3>
                </div>
                <span className={`audit-module-status ${m.status === "ok" ? "audit-status-ok" : m.status === "warn" ? "audit-status-warn" : "audit-status-fail"}`}>
                  {m.status === "ok" ? ui.labelOk : m.status === "warn" ? ui.labelWarn : ui.labelFail}
                </span>
              </article>
            ))}
          </div>

          <div className="audit-priorities-block">
            <p className="section-kicker">{ui.prioritiesKicker}</p>
            <h2>{ui.prioritiesTitle}</h2>
            {priorities.length ? (
              <ol className="audit-priorities">
                {priorities.map((p) => (
                  <li key={p.check.id}>
                    <div className="audit-priority-head">
                      <span className="audit-effort">{ui.efforts[p.check.effort]}</span>
                      <h3>{p.check.label}</h3>
                    </div>
                    <p className="audit-priority-why">{ui.priority.why} : {p.check.detail}</p>
                    <p className="audit-priority-fix">{ui.priority.howToFix} : {p.check.howToFix}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="audit-all-ok">{ui.allOk}</p>
            )}
          </div>

          <details className="audit-details">
            <summary>{ui.checksTitle} <span>+</span></summary>
            <table className="audit-table">
              <thead><tr><th>{ui.checkColumn}</th><th>{ui.detailColumn}</th><th>{ui.statusColumn}</th></tr></thead>
              <tbody>
                {checks.map((c) => (
                  <tr key={c.id}>
                    <td>{c.label}</td>
                    <td>{c.detail ?? ""}</td>
                    <td className={statusClass[c.status] ?? ""}>{statusLabel(c.status, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>

          <p className="audit-note">{ui.rawHtmlNote}</p>
          <p className="audit-disclaimer">{ui.disclaimer}</p>

          <div className="audit-result-cta">
            <p>{ui.ctaTitle}</p>
            <Link className="button primary" href="/contact">{ui.ctaButton} <span>↗</span></Link>
          </div>
        </section>
      </main><Footer />
    </>
  );
}
