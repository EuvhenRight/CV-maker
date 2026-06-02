import type { CV, SectionKey } from "@/lib/cv-types";

export interface TemplateProps {
  cv: CV;
}

export function nonEmpty(cv: CV, key: SectionKey): boolean {
  if (key === "summary") return cv.summary.trim().length > 0;
  const arr = cv[key];
  return Array.isArray(arr) && arr.length > 0;
}

export function dateRange(start: string, end: string, current?: boolean) {
  const e = current ? "Present" : end;
  if (start && e) return `${start} — ${e}`;
  return start || e || "";
}

export function contactLine(cv: CV): string[] {
  const p = cv.personal;
  return [p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean);
}
