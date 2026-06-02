"use client";

import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";

export function SummarySection() {
  const summary = useCVStore((s) => s.cv.summary);
  const setSummary = useCVStore((s) => s.updateSummary);
  return (
    <div className="space-y-2">
      <Textarea
        rows={5}
        value={summary}
        placeholder="2–4 zinnen over wie je bent, wat je hebt opgeleverd en wat je wilt gaan doen."
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className="text-xs text-[#7a7a7a]">
        {summary.length} tekens · mik op 300–600.
      </div>
    </div>
  );
}
