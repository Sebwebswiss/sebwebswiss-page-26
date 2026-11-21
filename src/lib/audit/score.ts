import type { CheckResult, CheckModule } from "@/content/audit/checks";
import { INFORMATIONAL_MODULES, MAX_MODULE_POINTS, SCORED_MODULES } from "@/content/audit/checks";

export type ModuleScore = {
  module: CheckModule;
  points: number;
  max: number;
  status: "ok" | "warn" | "fail";
};

export type AuditScore = {
  total: number;
  max: number;
  modules: ModuleScore[];
  /** Modules shown for information only; they never change the total. */
  informational?: ModuleScore[];
  grade: "bad" | "fair" | "good" | "excellent";
};

function moduleStatus(checkResults: CheckResult[], includeInformational = false): ModuleScore["status"] {
  const relevant = includeInformational ? checkResults : checkResults.filter((c) => c.weight > 0);
  const hasFail = relevant.some((c) => c.status === "fail");
  const hasWarn = relevant.some((c) => c.status === "warn");
  if (hasFail) return "fail";
  if (hasWarn) return "warn";
  return "ok";
}

export function computeScore(checkResults: CheckResult[]): AuditScore {
  const modules: ModuleScore[] = SCORED_MODULES.map((m) => {
    const checks = checkResults.filter((c) => c.module === m);
    const points = checks.reduce((acc, c) => acc + (c.status === "ok" ? c.weight : c.status === "warn" ? Math.round(c.weight * 0.5) : 0), 0);
    return { module: m, points, max: MAX_MODULE_POINTS, status: moduleStatus(checks) };
  });

  const informational: ModuleScore[] = INFORMATIONAL_MODULES.map((m) => {
    const checks = checkResults.filter((c) => c.module === m);
    return { module: m, points: 0, max: 0, status: moduleStatus(checks, true) };
  });

  const denominator = SCORED_MODULES.length * MAX_MODULE_POINTS;
  const total = Math.round((modules.reduce((acc, m) => acc + m.points, 0) / denominator) * 100);
  const grade: AuditScore["grade"] =
    total <= 39 ? "bad" : total <= 69 ? "fair" : total <= 89 ? "good" : "excellent";

  return { total, max: 100, modules, informational, grade };
}