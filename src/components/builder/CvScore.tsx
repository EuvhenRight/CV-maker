"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { useCVStore } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import { scoreCV, type CheckStatus } from "@/lib/cv-score";
import { cn } from "@/lib/utils";

const STATUS_META: Record<CheckStatus, { color: string; Icon: LucideIcon }> = {
  pass: { color: "#16a34a", Icon: CheckCircle2 },
  warn: { color: "#d97706", Icon: AlertTriangle },
  fail: { color: "#dc2626", Icon: XCircle },
};

function scoreColor(score: number): string {
  return score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
}

export function CvScore() {
  const cv = useCVStore((s) => s.cv);
  const { locale } = useLocale();
  const [open, setOpen] = React.useState(false);
  const result = React.useMemo(() => scoreCV(cv, locale), [cv, locale]);
  const color = scoreColor(result.score);
  const tr = (nl: string, en: string) => (locale === "nl" ? nl : en);

  return (
    <div className="rounded-lg border border-[#e8e6df] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <ScoreRing score={result.score} color={color} />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-[#1A1919]">
            {tr("CV- & ATS-check", "CV & ATS check")}
          </div>
          <div className="mt-0.5 text-xs text-[#7a7a7a]">
            {result.passCount} {tr("goed", "passed")} · {result.warnCount}{" "}
            {tr("te verbeteren", "to improve")} · {result.failCount}{" "}
            {tr("op te lossen", "to fix")}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#7a7a7a] transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t border-[#f0efea] p-3">
          <p className="text-[11px] leading-relaxed text-[#9a9a9a]">
            {tr(
              "Controleert ATS-leesbaarheid en volledigheid — geen match met een specifieke vacature. Geen enkel percentage garandeert een uitnodiging.",
              "Checks ATS readability and completeness — not a match to any specific job. No percentage guarantees an interview.",
            )}
          </p>
          {result.categories.map((cat) => (
            <div key={cat.key} className="space-y-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[#9a9a9a]">
                {cat.title}
              </div>
              <ul className="space-y-1.5">
                {cat.checks.map((c) => {
                  const { color: iconColor, Icon } = STATUS_META[c.status];
                  return (
                    <li key={c.id} className="flex items-start gap-2">
                      <Icon
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        style={{ color: iconColor }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[#3a3a3a]">
                          {c.label}
                        </div>
                        {c.hint && (
                          <div className="text-[11px] leading-snug text-[#8a8a8a]">
                            {c.hint}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg viewBox="0 0 40 40" className="h-12 w-12 -rotate-90">
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="#eceae3"
          strokeWidth="4"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke={color}
          strokeWidth="4"
          pathLength={100}
          strokeDasharray={`${score} 100`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}
