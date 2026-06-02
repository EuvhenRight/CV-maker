import type { CV, SectionKey } from "@/lib/cv-types";

export interface TemplateProps {
  cv: CV;
}

export function textOn(bg: string): "#1A1919" | "#ffffff" {
  const m = bg.match(/^#?([0-9a-f]{6})$/i);
  if (!m) return "#ffffff";
  const r = parseInt(m[1].slice(0, 2), 16);
  const g = parseInt(m[1].slice(2, 4), 16);
  const b = parseInt(m[1].slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 165 ? "#1A1919" : "#ffffff";
}

export function softTextOn(bg: string): string {
  return textOn(bg) === "#1A1919" ? "#3a3a3a" : "rgba(255,255,255,0.85)";
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
