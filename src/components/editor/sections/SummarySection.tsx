"use client";

import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";
import { AIStubButton } from "../AIStubButton";

export function SummarySection() {
  const summary = useCVStore((s) => s.cv.summary);
  const setSummary = useCVStore((s) => s.updateSummary);
  return (
    <div className="space-y-2">
      <Textarea
        rows={5}
        value={summary}
        placeholder="2–4 sentences on who you are, what you've shipped, and what you want to do next."
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>{summary.length} chars · aim for 300–600.</span>
        <AIStubButton label="Generate summary" />
      </div>
    </div>
  );
}
