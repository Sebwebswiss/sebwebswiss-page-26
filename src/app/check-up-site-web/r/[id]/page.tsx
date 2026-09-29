import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import type { Lang } from "@/content/audit/checks";
import { getAudit } from "@/lib/redis";
import { moduleMeta } from "@/content/audit/checks";
import { t } from "@/content/audit/translations";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Résultat du check-up site web",
  description: "Score et priorités du check-up SEO & visibilité locale.",
  robots: { index: false, follow: false },
};

const statusLabel: Record<string, string> = { ok: "OK", warn: "À vérifier", fail: "À corriger" };
const statusClass: Record<string, string> = { ok: "audit-status-ok", warn: "audit-status-warn", fail: "audit-status-fail" };
const gradeColor: Record<string, string> = { bad: "#b42318", fair: "#b76e00", good: "#1a7f37", excellent: "#1a7f37" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audit = await getAudit(id);
  if (!audit) notFound();

  const lang: Lang = ["fr", "de", "it", "en"].includes(audit.lang) ? (audit.lang as Lang) : "fr";
  const ui = t(lang);

  return (
    <>
      <Header />
      <main>
        <section className="audit-hero audit-hero-result">
          <p className="eyebrow"><span /> RESULTAT DU CHECK-UP</p>
          <p className="audit-result-url">{audit.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</p>
          <div className="audit-score-static" style={{ "--grade-color": gradeColor[audit.score.grade] } as React.CSSProperties}>
            <strong>{audit.score.total}</strong>
            <span>/100</span>
            <em>{ui.grades[audit.score.grade as keyof typeof ui.grades]}</em>
          </div>
        </section>

        <section className="audit-result audit-result-shared">
          <div className="audit-modules">
            {audit.score.modules.map((m) => (
              <article className="audit-module" key={m.module}>
                <div>
                  <p className="audit-module-kicker">{moduleMeta[m.module].title}</p>
                  <h3>{m.points}<small>/{m.max}</small></h3>
                </div>
                <span className={`audit-module-status ${m.status === "ok" ? "audit-status-ok" : m.status === "warn" ? "audit-status-warn" : "audit-status-fail"}`}>
                  {m.status === "ok" ? ui.labelOk : m.status === "warn" ? ui.labelWarn : ui.labelFail}
                </span>
              </article>
            ))}
          </div>

          <div className="audit-priorities-block">
            <p className="section-kicker">PRIORITÉS</p>
            <h2>{ui.prioritiesTitle}</h2>
            {audit.priorities.length ? (
              <ol className="audit-priorities">
                {audit.priorities.map((p) => (
                  <li key={p.check.id}>
                    <div className="audit-priority-head">
                      <span className="audit-effort">{p.effortLabel}</span>
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
            <summary>Toutes les vérifications <span>+</span></summary>
            <table className="audit-table">
              <thead><tr><th>Vérification</th><th>Détail</th><th>Statut</th></tr></thead>
              <tbody>
                {audit.checks.map((c) => (
                  <tr key={c.id}>
                    <td>{c.label}</td>
                    <td>{c.detail ?? ""}</td>
                    <td className={statusClass[c.status] ?? ""}>{statusLabel[c.status] ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>

          <p className="audit-note">{ui.rawHtmlNote}</p>
          <p className="audit-disclaimer">{ui.disclaimer}</p>

          <div className="audit-result-cta">
            <p>{ui.ctaTitle}</p>
            <a className="button primary" href="/contact">{ui.ctaButton} <span>↗</span></a>
          </div>
        </section>
      </main>
    </>
  );
}