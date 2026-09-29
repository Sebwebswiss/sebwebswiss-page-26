import type { CheckResult } from "@/content/audit/checks";

export type Priority = {
  check: CheckResult;
  importance: number;
  effortLabel: string;
};

const effortLabel: Record<1 | 2 | 3, string> = {
  1: "Simple",
  2: "Modéré",
  3: "Avancé",
};

export function computePriorities(checks: CheckResult[], limit = 3): Priority[] {
  const notOk = checks.filter((c) => c.status !== "ok");
  const sorted = notOk.sort((a, b) => {
    const impA = a.impact * (4 - a.effort);
    const impB = b.impact * (4 - b.effort);
    if (impB !== impA) return impB - impA;
    return b.weight - a.weight;
  });
  return sorted.slice(0, limit).map((c) => ({
    check: c,
    importance: c.impact * (4 - c.effort),
    effortLabel: effortLabel[c.effort],
  }));
}