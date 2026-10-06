"use client";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import type { CheckResult, Lang } from "@/content/audit/checks";
import { moduleMeta } from "@/content/audit/checks";
import type { AuditScore, ModuleScore } from "@/lib/audit/score";
import type { Priority } from "@/lib/audit/prioritize";
import { t, uiLangs } from "@/content/audit/translations";

type AuditPayload = {
  ok: boolean;
  id: string;
  url: string;
  lang: Lang;
  score: AuditScore;
  checks: CheckResult[];
  priorities: Priority[];
  resultUrl: string;
  error?: string;
};

const PROGRESS_STEPS = ["connect", "tech", "local", "score", "priorities"];

const gradeColor: Record<string, string> = { bad: "#b42318", fair: "#b76e00", good: "#1a7f37", excellent: "#1a7f37" };

function ScoreRing({ total, grade, lang }: { total: number; grade: string; lang: Lang }) {
  const ui = t(lang);
  const color = gradeColor[grade] ?? "#b76e00";
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - total / 100);
  return (
    <div className="score-ring-wrap">
      <svg viewBox="0 0 130 130" width="190" height="190" className="score-ring" role="img" aria-label={`Score ${total}/100`}>
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10" />
        <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} transform="rotate(-90 65 65)" style={{ transition: "stroke-dashoffset .8s ease" }} />
      </svg>
      <div className="score-ring-text">
        <strong style={{ color }}>{total}</strong>
        <span>/100</span>
        <em>{ui.grades[grade as keyof typeof ui.grades]}</em>
      </div>
    </div>
  );
}

function ModuleCard({ score, lang }: { score: ModuleScore; lang: Lang }) {
  const ui = t(lang);
  const meta = moduleMeta[score.module];
  return (
    <article className="audit-module">
      <div>
        <p className="audit-module-kicker">{meta.title}</p>
        <h3>{score.points}<small>/{score.max}</small></h3>
      </div>
      <span className={`audit-module-status ${score.status === "ok" ? "audit-status-ok" : score.status === "warn" ? "audit-status-warn" : "audit-status-fail"}`}>
        {score.status === "ok" ? ui.labelOk : score.status === "warn" ? ui.labelWarn : ui.labelFail}
      </span>
      <p className="audit-module-hint">{meta.title}</p>
    </article>
  );
}

function PriorityList({ priorities, lang }: { priorities: Priority[]; lang: Lang }) {
  const ui = t(lang);
  if (!priorities.length) return <p className="audit-all-ok">{ui.allOk}</p>;
  return (
    <ol className="audit-priorities">
      {priorities.map((p) => (
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
  );
}

function EmailGate({ auditId, lang }: { auditId: string; lang: Lang }) {
  const ui = t(lang);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !consent) return;
    setStatus("loading");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, email, consent, lang }),
      });
      if (!r.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return <p className="audit-gate-success">{ui.reportSent}</p>;

  return (
    <form className="audit-email-gate" onSubmit={submit}>
      <p className="audit-gate-title">{ui.emailGateTitle}</p>
      <p className="audit-gate-intro">{ui.emailGateIntro}</p>
      <div className="audit-gate-row">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@entreprise.ch" aria-label={ui.emailLabel} />
        <button className="button primary" disabled={status === "loading"}>{status === "loading" ? "…" : ui.sendReport} <span>↗</span></button>
      </div>
      <label className="audit-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>{ui.consentLabel}</span>
      </label>
      <p className="audit-privacy-note">
        {ui.privacyNote} <Link href="/confidentialite">{ui.privacyLink}</Link>.
      </p>
      {status === "error" && <p className="form-error">Une erreur est survenue. Réessayez ou écrivez-nous à info@sebwebswiss.ch.</p>}
    </form>
  );
}

export function AuditTool() {
  const defaultLang: Lang = "fr";
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<AuditPayload | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const timers = useRef<ReturnType<typeof setInterval> | null>(null);
  const ui = t(lang);

  async function run(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const candidate = url.trim();
    if (!candidate) {
      setState("error");
      setErrorMsg(ui.errorUrl);
      return;
    }
    setState("loading");
    setStepIdx(0);
    setResult(null);
    timers.current = setInterval(() => {
      setStepIdx((i) => (i + 1) % PROGRESS_STEPS.length);
    }, 340);
    try {
      const r = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: candidate, lang }),
      });
      const data = (await r.json()) as AuditPayload;
      if (!r.ok || !data.ok) {
        throw new Error(data.error ?? ui.errorGeneric);
      }
      setResult(data);
      setState("done");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error && err.message !== "Failed to fetch" ? err.message : ui.errorGeneric);
    } finally {
      if (timers.current) {
        clearInterval(timers.current);
        timers.current = null;
      }
    }
  }

  return (
    <section className="audit-app" id="audit">
      {state !== "done" && (
        <form className="audit-form" onSubmit={run}>
          <div className="audit-input-row">
            <input
              type="text"
              inputMode="url"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder={ui.urlPlaceholder}
              aria-label="Adresse du site"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={state === "loading"}
            />
            <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label={ui.langLabel} disabled={state === "loading"}>
              {uiLangs.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <button className="button primary audit-submit" disabled={state === "loading"}>
            {state === "loading" ? "Analyse en cours…" : ui.analyseButton} <span>↗</span>
          </button>

          {state === "loading" && (
            <div className="audit-progress">
              <ol className="audit-progress-steps">
                {PROGRESS_STEPS.map((step, i) => (
                  <li key={step} className={i <= stepIdx ? "is-active" : ""} aria-current={i === stepIdx}>
                    {ui.progress[step as keyof typeof ui.progress]}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {state === "error" && <p className="audit-error">{errorMsg}</p>}
        </form>
      )}

      {state === "done" && result && (
        <div className="audit-result">
          <div className="audit-result-head">
            <p className="audit-result-url">{result.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</p>
            <ScoreRing total={result.score.total} grade={result.score.grade} lang={result.lang} />
          </div>

          <div className="audit-modules">
            {result.score.modules.map((m) => (
              <ModuleCard key={m.module} score={m} lang={result.lang} />
            ))}
            {(["privacy", "lang", "ai"] as const).map((m) => (
              <article className="audit-module audit-module-soon" key={m}>
                <div><p className="audit-module-kicker">{moduleMeta[m].short}</p><h3>{moduleMeta[m].title}</h3></div>
                <span className="audit-badge-soon">{t(result.lang).comingSoon}</span>
              </article>
            ))}
          </div>

          <div className="audit-priorities-block">
            <p className="section-kicker">PRIORITÉS</p>
            <h2>{ui.prioritiesTitle}</h2>
            <PriorityList priorities={result.priorities} lang={result.lang} />
          </div>

          <EmailGate auditId={result.id} lang={result.lang} />

          <p className="audit-note">{ui.rawHtmlNote}</p>
          <p className="audit-disclaimer">{ui.disclaimer}</p>
          <div className="audit-result-cta">
            <p>{ui.ctaTitle}</p>
            <a className="button primary" href="/contact">{ui.ctaButton} <span>↗</span></a>
          </div>
        </div>
      )}
    </section>
  );
}