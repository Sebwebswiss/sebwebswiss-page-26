"use client";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { CheckResult, Lang } from "@/content/audit/checks";
import type { AuditScore, ModuleScore } from "@/lib/audit/score";
import type { Priority } from "@/lib/audit/prioritize";
import { normalizeLang, t, uiLangs } from "@/content/audit/translations";
import { trackEvent } from "@/lib/ga";

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

function isAuditPayload(value: unknown): value is AuditPayload {
  if (!value || typeof value !== "object") return false;
  const data = value as AuditPayload;
  return data.ok === true && typeof data.id === "string" && data.id.length > 0 &&
    typeof data.url === "string" && normalizeLang(data.lang) === data.lang &&
    Boolean(data.score) && Number.isFinite(data.score.total) && data.score.total >= 0 && data.score.total <= 100 &&
    Object.hasOwn(t(data.lang).grades, data.score.grade) && Array.isArray(data.score.modules) && data.score.modules.length > 0 &&
    data.score.modules.every(module => module && Object.hasOwn(t(data.lang).modules, module.module) &&
      Number.isFinite(module.points) && Number.isFinite(module.max) && module.max > 0 && module.points >= 0 && module.points <= module.max &&
      ["ok", "warn", "fail"].includes(module.status)) &&
    Array.isArray(data.checks) && Array.isArray(data.priorities) &&
    data.priorities.every(priority => priority?.check && typeof priority.check.id === "string" &&
      typeof priority.check.label === "string" && typeof priority.check.howToFix === "string" &&
      (priority.check.detail === undefined || typeof priority.check.detail === "string") &&
      [1, 2, 3].includes(priority.check.effort));
}

const PROGRESS_STEPS = ["connect", "tech", "local", "ai", "privacy", "score", "priorities"];

const gradeColor: Record<string, string> = { bad: "#ff8f8f", fair: "#ffc36b", good: "#6ad487", excellent: "#6ad487" };

function ScoreRing({ total, grade, lang }: { total: number; grade: string; lang: Lang }) {
  const ui = t(lang);
  const color = gradeColor[grade] ?? "#ffc36b";
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - total / 100);
  return (
    <div className="score-ring-wrap">
      <svg viewBox="0 0 130 130" width="190" height="190" className="score-ring" role="img" aria-label={ui.resultTitle.replace("{score}", String(total))}>
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
  return (
    <article className="audit-module">
      <div>
        <p className="audit-module-kicker">{ui.modules[score.module]}</p>
        <h3>{score.points}<small>/{score.max}</small></h3>
      </div>
      <span className={`audit-module-status ${score.status === "ok" ? "audit-status-ok" : score.status === "warn" ? "audit-status-warn" : "audit-status-fail"}`}>
        {score.status === "ok" ? ui.labelOk : score.status === "warn" ? ui.labelWarn : ui.labelFail}
      </span>
      <p className="audit-module-hint">{ui.modules[score.module]}</p>
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
            <span className="audit-effort">{ui.efforts[p.check.effort]}</span>
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
      trackEvent("generate_lead", { form_name: "checkup_report" });
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
        <input type="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={ui.emailPlaceholder} aria-label={ui.emailLabel} />
        <button className="button primary" disabled={status === "loading"}>{status === "loading" ? "…" : ui.sendReport} <span>↗</span></button>
      </div>
      <label className="audit-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>{ui.consentLabel}</span>
      </label>
      <p className="audit-privacy-note">
        {ui.privacyNote} <Link href="/confidentialite">{ui.privacyLink}</Link>.
      </p>
      {status === "error" && <p className="form-error" role="alert">{ui.emailError}</p>}
    </form>
  );
}

export function AuditTool({ lang, onLangChange }: { lang: Lang; onLangChange: (lang: Lang) => void }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<AuditPayload | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const timers = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const ui = t(lang);

  useEffect(() => () => {
    activeRequest.current?.abort("navigation");
    if (timers.current) clearInterval(timers.current);
    timers.current = null;
  }, []);

  async function run(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (activeRequest.current) return;
    const candidate = url.trim();
    if (!candidate) {
      setState("error");
      setErrorMsg(ui.errorUrl);
      return;
    }
    setState("loading");
    setStepIdx(0);
    setResult(null);
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = setTimeout(() => controller.abort("timeout"), 25_000);
    timers.current = setInterval(() => {
      setStepIdx((i) => (i + 1) % PROGRESS_STEPS.length);
    }, 340);
    try {
      const r = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: candidate, lang }),
        signal: controller.signal,
      });
      const data: unknown = await r.json();
      if (!r.ok || !isAuditPayload(data)) {
        const error = data && typeof data === "object" && "error" in data && typeof data.error === "string" ? data.error : ui.errorGeneric;
        setState("error");
        setErrorMsg(error);
        return;
      }
      if (controller.signal.aborted) return;
      setResult(data);
      setState("done");
    } catch {
      if (controller.signal.aborted) {
        if (activeRequest.current === controller) {
          setState(controller.signal.reason === "timeout" ? "error" : "idle");
          if (controller.signal.reason === "timeout") setErrorMsg(ui.errorService);
        }
      } else {
        setState("error");
        setErrorMsg(ui.errorGeneric);
      }
    } finally {
      clearTimeout(timeout);
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        if (timers.current) clearInterval(timers.current);
        timers.current = null;
      }
    }
  }

  return (
    <section className="audit-app" id="audit" lang={lang}>
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
              aria-label={ui.addressLabel}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={state === "loading"}
            />
            <select value={lang} onChange={(e) => { onLangChange(normalizeLang(e.target.value)); setErrorMsg(""); setState("idle"); }} aria-label={ui.langLabel} disabled={state === "loading"}>
              {uiLangs.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <button className="button primary audit-submit" disabled={state === "loading"}>
            {state === "loading" ? ui.loading : ui.analyseButton} <span>↗</span>
          </button>

          {state === "loading" && (
            <div className="audit-progress" role="status" aria-live="polite">
              <ol className="audit-progress-steps">
                {PROGRESS_STEPS.map((step, i) => (
                  <li key={step} className={i <= stepIdx ? "is-active" : ""} aria-current={i === stepIdx}>
                    {ui.progress[step as keyof typeof ui.progress]}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {state === "error" && <p className="audit-error" role="alert">{errorMsg}</p>}
        </form>
      )}

      {state === "done" && result && (
        <div className="audit-result">
          <div className="audit-result-head">
            <p className="audit-result-url">{result.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</p>
            <ScoreRing total={result.score.total} grade={result.score.grade} lang={result.lang} />
          </div>

          <div className="audit-modules">
            <h2 className="sr-only">{ui.modulesTitle}</h2>
            {result.score.modules.map((m) => (
              <ModuleCard key={m.module} score={m} lang={result.lang} />
            ))}
            {(["lang"] as const).map((m) => (
              <article className="audit-module audit-module-soon" key={m}>
                <div><p className="audit-module-kicker">{ui.moduleShorts[m]}</p><h3>{ui.modules[m]}</h3></div>
                <span className="audit-badge-soon">{t(result.lang).comingSoon}</span>
              </article>
            ))}
          </div>

          <div className="audit-priorities-block">
            <p className="section-kicker">{ui.prioritiesKicker}</p>
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
          <button className="button ghost audit-repeat" type="button" onClick={() => { setResult(null); setState("idle"); setUrl(""); setErrorMsg(""); }}>{ui.repeatCheckup}</button>
        </div>
      )}
    </section>
  );
}
