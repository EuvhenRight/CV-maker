"use client";

import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function SummarySection() {
  const summary = useCVStore((s) => s.cv.summary);
  const setSummary = useCVStore((s) => s.updateSummary);
  const t = useT();
  return (
    <div className="space-y-2">
      <Textarea
        rows={5}
        value={summary}
        placeholder={t("summary.ph")}
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className="text-xs text-[#7a7a7a]">
        {summary.length} {t("summary.counter")}
      </div>
    </div>
  );
}
