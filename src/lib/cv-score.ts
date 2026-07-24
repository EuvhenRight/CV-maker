import type { CV } from "./cv-types";
import type { Locale } from "./i18n";

// An honest, deterministic CV/ATS readiness check. It scores objective,
// verifiable things that genuinely affect ATS parsing and recruiter scanning —
// NOT a "match rate" against some hidden job description. There is no upsell.

export type CheckStatus = "pass" | "warn" | "fail";

type L = { nl: string; en: string };
type CatKey = "basics" | "sections" | "quality" | "ats";

export interface Check {
  id: string;
  label: string;
  hint: string; // shown only when status !== "pass"
  status: CheckStatus;
}

export interface CheckCategory {
  key: CatKey;
  title: string;
  checks: Check[];
}

export interface CvScoreResult {
  score: number; // 0–100
  passCount: number;
  warnCount: number;
  failCount: number;
  total: number;
  categories: CheckCategory[];
}

interface CheckDef {
  id: string;
  category: CatKey;
  label: L;
  hint: L;
  weight: number;
  run: (cv: CV) => CheckStatus;
}

const CATEGORY_TITLES: Record<CatKey, L> = {
  basics: { nl: "Basis & contact", en: "Basics & contact" },
  sections: { nl: "Kernsecties", en: "Core sections" },
  quality: { nl: "Inhoudskwaliteit", en: "Content quality" },
  ats: { nl: "ATS-structuur", en: "ATS structure" },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLACEHOLDER_RE = /\[[^\]\n]{1,60}\]/;
const WEAK_OPENER_RE =
  /^\s*(i|we|my|responsible for|worked on|helped|duties|was responsible)\b/i;

function bulletsOf(cv: CV): string[] {
  return cv.experience.flatMap((e) =>
    e.bullets.map((b) => b.trim()).filter(Boolean),
  );
}

function allText(cv: CV): string {
  const parts: string[] = [cv.summary];
  for (const e of cv.experience) parts.push(e.role, e.company, ...e.bullets);
  for (const ed of cv.education) parts.push(ed.description);
  for (const pr of cv.projects) parts.push(pr.name, pr.description);
  return parts.filter(Boolean).join(" \n ");
}

const CHECKS: CheckDef[] = [
  // --- Basics & contact -----------------------------------------------------
  {
    id: "name",
    category: "basics",
    weight: 2,
    label: { nl: "Naam aanwezig", en: "Name present" },
    hint: { nl: "Voeg je volledige naam toe.", en: "Add your full name." },
    run: (cv) => (cv.personal.fullName.trim() ? "pass" : "fail"),
  },
  {
    id: "email",
    category: "basics",
    weight: 3,
    label: { nl: "Geldig e-mailadres", en: "Valid email address" },
    hint: {
      nl: "Voeg een geldig e-mailadres toe — ATS gebruikt dit om je te bereiken.",
      en: "Add a valid email — ATS uses it to reach you.",
    },
    run: (cv) => {
      const e = cv.personal.email.trim();
      if (!e) return "fail";
      return EMAIL_RE.test(e) ? "pass" : "warn";
    },
  },
  {
    id: "contactDetails",
    category: "basics",
    weight: 2,
    label: { nl: "Telefoon en locatie", en: "Phone and location" },
    hint: {
      nl: "Voeg zowel een telefoonnummer als je woonplaats toe.",
      en: "Add both a phone number and your location.",
    },
    run: (cv) => {
      const has = [cv.personal.phone, cv.personal.location].filter((x) =>
        x.trim(),
      ).length;
      return has === 2 ? "pass" : has === 1 ? "warn" : "fail";
    },
  },
  {
    id: "title",
    category: "basics",
    weight: 1,
    label: { nl: "Functietitel", en: "Professional title" },
    hint: {
      nl: "Voeg een functietitel toe onder je naam (bijv. 'Full-stack Developer').",
      en: "Add a title under your name (e.g. 'Full-stack Developer').",
    },
    run: (cv) => (cv.personal.title.trim() ? "pass" : "warn"),
  },

  // --- Core sections --------------------------------------------------------
  {
    id: "summary",
    category: "sections",
    weight: 2,
    label: { nl: "Profielsamenvatting", en: "Professional summary" },
    hint: {
      nl: "Schrijf 2–4 zinnen over je focus en sterke punten.",
      en: "Write 2–4 sentences covering your focus and strengths.",
    },
    run: (cv) => {
      const len = cv.summary.trim().length;
      return len >= 140 ? "pass" : len > 0 ? "warn" : "fail";
    },
  },
  {
    id: "experience",
    category: "sections",
    weight: 3,
    label: { nl: "Werkervaring", en: "Work experience" },
    hint: {
      nl: "Voeg minstens één werkervaring toe.",
      en: "Add at least one work experience entry.",
    },
    run: (cv) => (cv.experience.length > 0 ? "pass" : "fail"),
  },
  {
    id: "expDetails",
    category: "sections",
    weight: 2,
    label: { nl: "Volledige ervaring", en: "Complete experience entries" },
    hint: {
      nl: "Elke functie: rol, bedrijf, datums en minstens één opsommingspunt.",
      en: "Each role needs a title, company, dates, and at least one bullet.",
    },
    run: (cv) => {
      if (cv.experience.length === 0) return "fail";
      const complete = cv.experience.every(
        (e) =>
          e.role.trim() &&
          e.company.trim() &&
          (e.startDate.trim() || e.current) &&
          e.bullets.some((b) => b.trim()),
      );
      return complete ? "pass" : "warn";
    },
  },
  {
    id: "education",
    category: "sections",
    weight: 1,
    label: { nl: "Opleiding", en: "Education" },
    hint: { nl: "Voeg je opleiding(en) toe.", en: "Add your education." },
    run: (cv) => (cv.education.length > 0 ? "pass" : "warn"),
  },
  {
    id: "skills",
    category: "sections",
    weight: 2,
    label: { nl: "Vaardigheden (8+)", en: "Skills (8+)" },
    hint: {
      nl: "Voeg meer relevante vaardigheden toe zodat ATS-zoekwoorden matchen.",
      en: "Add more relevant skills so ATS keyword matching works.",
    },
    run: (cv) =>
      cv.skills.length >= 8 ? "pass" : cv.skills.length > 0 ? "warn" : "fail",
  },

  // --- Content quality ------------------------------------------------------
  {
    id: "placeholders",
    category: "quality",
    weight: 2,
    label: { nl: "Geen tijdelijke tekst", en: "No leftover placeholders" },
    hint: {
      nl: "Verwijder placeholders zoals [X] of [metric] en vul echte gegevens in.",
      en: "Remove placeholders like [X] or [metric] and fill in real details.",
    },
    run: (cv) => (PLACEHOLDER_RE.test(allText(cv)) ? "fail" : "pass"),
  },
  {
    id: "quantified",
    category: "quality",
    weight: 2,
    label: { nl: "Meetbare resultaten", en: "Quantified results" },
    hint: {
      nl: "Voeg cijfers toe (bijv. '+28% taakvoltooiing', '40.000 gebruikers').",
      en: "Add numbers to your bullets (e.g. '+28% completion', '40,000 users').",
    },
    run: (cv) => {
      const bullets = bulletsOf(cv);
      if (bullets.length === 0) return "warn";
      const quantified = bullets.filter((b) => /\d/.test(b)).length;
      return quantified >= 2 ? "pass" : "warn";
    },
  },
  {
    id: "weakOpeners",
    category: "quality",
    weight: 1,
    label: { nl: "Sterke werkwoorden", en: "Strong action verbs" },
    hint: {
      nl: "Begin punten met een werkwoord (Bouwde, Leidde…), niet met 'Ik' of 'Verantwoordelijk voor'.",
      en: "Start bullets with a verb (Built, Led…), not 'I', 'We' or 'Responsible for'.",
    },
    run: (cv) => {
      const bullets = bulletsOf(cv);
      if (bullets.length === 0) return "pass";
      return bullets.some((b) => WEAK_OPENER_RE.test(b)) ? "warn" : "pass";
    },
  },
  {
    id: "bulletLength",
    category: "quality",
    weight: 1,
    label: { nl: "Beknopte punten", en: "Concise bullets" },
    hint: {
      nl: "Houd punten kort — idealiter maximaal twee regels.",
      en: "Keep bullets short — ideally two lines max.",
    },
    run: (cv) => {
      const bullets = bulletsOf(cv);
      if (bullets.length === 0) return "pass";
      return bullets.some((b) => b.length > 260) ? "warn" : "pass";
    },
  },

  // --- ATS structure --------------------------------------------------------
  {
    id: "links",
    category: "ats",
    weight: 1,
    label: { nl: "Online profiel", en: "Online profile link" },
    hint: {
      nl: "Voeg LinkedIn, portfolio of GitHub toe.",
      en: "Add LinkedIn, a portfolio, or GitHub.",
    },
    run: (cv) => {
      const p = cv.personal;
      return p.website.trim() || p.linkedin.trim() || (p.github ?? "").trim()
        ? "pass"
        : "warn";
    },
  },
];

export function scoreCV(cv: CV, lang: Locale): CvScoreResult {
  const cats: Record<CatKey, CheckCategory> = {
    basics: { key: "basics", title: CATEGORY_TITLES.basics[lang], checks: [] },
    sections: {
      key: "sections",
      title: CATEGORY_TITLES.sections[lang],
      checks: [],
    },
    quality: {
      key: "quality",
      title: CATEGORY_TITLES.quality[lang],
      checks: [],
    },
    ats: { key: "ats", title: CATEGORY_TITLES.ats[lang], checks: [] },
  };

  let earned = 0;
  let total = 0;
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  for (const def of CHECKS) {
    const status = def.run(cv);
    total += def.weight;
    earned += def.weight * (status === "pass" ? 1 : status === "warn" ? 0.5 : 0);
    if (status === "pass") passCount++;
    else if (status === "warn") warnCount++;
    else failCount++;

    cats[def.category].checks.push({
      id: def.id,
      label: def.label[lang],
      hint: status === "pass" ? "" : def.hint[lang],
      status,
    });
  }

  return {
    score: total > 0 ? Math.round((earned / total) * 100) : 0,
    passCount,
    warnCount,
    failCount,
    total: CHECKS.length,
    categories: Object.values(cats).filter((c) => c.checks.length > 0),
  };
}
