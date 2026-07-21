import type { CV, SectionKey } from "@/lib/cv-types";
import { translate, type Locale } from "@/lib/i18n";
import { labelForSkill, labelForStrength } from "@/lib/skills-data";

export interface TemplateProps {
  cv: CV;
  lang?: Locale;
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

export function resolveSkills(cv: CV, lang: Locale = "nl"): string[] {
  return cv.skills.map((id) => labelForSkill(id, lang));
}

export function resolveStrengths(cv: CV, lang: Locale = "nl"): string[] {
  return cv.strengths.map((id) => labelForStrength(id, lang));
}

export function dateRange(
  start: string,
  end: string,
  current?: boolean,
  lang: Locale = "nl",
) {
  const e = current ? translate(lang, "preview.present") : end;
  if (start && e) return `${start} — ${e}`;
  return start || e || "";
}

export function placeholderName(lang: Locale = "nl"): string {
  return translate(lang, "preview.placeholder.name");
}

export function contactLine(cv: CV): string[] {
  const p = cv.personal;
  return [p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean);
}

export type ContactKind =
  | "email"
  | "phone"
  | "location"
  | "website"
  | "linkedin";

export interface ContactItem {
  kind: ContactKind;
  label: string;
  value: string;
}

export type PersonalDetailKind =
  | "dateOfBirth"
  | "nationality"
  | "workEligibility"
  | "drivingLicense"
  | "bigNumber"
  | "agbCode";

export interface PersonalDetailItem {
  kind: PersonalDetailKind;
  label: string;
  value: string;
}

const PERSONAL_DETAIL_ORDER: PersonalDetailKind[] = [
  "dateOfBirth",
  "nationality",
  "workEligibility",
  "drivingLicense",
  "bigNumber",
  "agbCode",
];

export function personalDetailItems(
  cv: CV,
  lang: Locale = "nl",
): PersonalDetailItem[] {
  const p = cv.personal;
  return PERSONAL_DETAIL_ORDER.flatMap<PersonalDetailItem>((kind) => {
    const value = (p[kind] ?? "").trim();
    if (!value) return [];
    return [{ kind, label: translate(lang, `personal.${kind}`), value }];
  });
}

// ---------------------------------------------------------------------------
// Link helpers — used to turn contact details, project links and certificate
// links into real, clickable hyperlinks (both on screen and in the exported
// PDF, where lib/pdf.ts reads the `data-pdf-link` markers these produce).
// ---------------------------------------------------------------------------

export function normalizeUrl(raw: string): string {
  const s = (raw ?? "").trim();
  if (!s) return "";
  if (/^(https?:|mailto:|tel:)/i.test(s)) return s;
  return `https://${s.replace(/^\/+/, "")}`;
}

export function mailtoHref(email: string): string {
  const s = (email ?? "").trim();
  if (!s) return "";
  return /^mailto:/i.test(s) ? s : `mailto:${s}`;
}

export function telHref(phone: string): string {
  const s = (phone ?? "").trim();
  if (!s) return "";
  if (/^tel:/i.test(s)) return s;
  const cleaned = s.replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : "";
}

// Compact display for a URL: drop the scheme, leading www. and trailing slash.
export function linkLabel(raw: string): string {
  return (raw ?? "")
    .trim()
    .replace(/^(https?:)?\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/+$/, "");
}

export function contactHref(kind: ContactKind, value: string): string {
  switch (kind) {
    case "email":
      return mailtoHref(value);
    case "phone":
      return telHref(value);
    case "website":
    case "linkedin":
      return normalizeUrl(value);
    default:
      return "";
  }
}

export function contactItems(cv: CV, lang: Locale = "nl"): ContactItem[] {
  const p = cv.personal;
  const out: ContactItem[] = [];
  if (p.email)
    out.push({
      kind: "email",
      label: translate(lang, "preview.contact.email"),
      value: p.email,
    });
  if (p.phone)
    out.push({
      kind: "phone",
      label: translate(lang, "preview.contact.phone"),
      value: p.phone,
    });
  if (p.location)
    out.push({
      kind: "location",
      label: translate(lang, "preview.contact.location"),
      value: p.location,
    });
  if (p.website)
    out.push({
      kind: "website",
      label: translate(lang, "preview.contact.website"),
      value: p.website,
    });
  if (p.linkedin)
    out.push({
      kind: "linkedin",
      label: translate(lang, "preview.contact.linkedin"),
      value: p.linkedin,
    });
  return out;
}
