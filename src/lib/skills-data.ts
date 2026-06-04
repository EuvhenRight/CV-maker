import type { Locale } from "./i18n";

export type PresetCategory =
  | "core"
  | "communication"
  | "leadership"
  | "office"
  | "technical"
  | "analytical"
  | "creative"
  | "service";

export interface Preset {
  id: string;
  nl: string;
  en: string;
  category?: PresetCategory;
}

export const PRESET_SKILLS: Preset[] = [
  // Core
  { id: "communication", nl: "Communicatie", en: "Communication", category: "communication" },
  { id: "teamwork", nl: "Samenwerken", en: "Teamwork", category: "core" },
  { id: "leadership", nl: "Leiderschap", en: "Leadership", category: "leadership" },
  { id: "problem-solving", nl: "Probleemoplossing", en: "Problem solving", category: "analytical" },
  { id: "time-management", nl: "Tijdmanagement", en: "Time management", category: "core" },
  { id: "planning", nl: "Planning", en: "Planning", category: "core" },
  { id: "organization", nl: "Organisatorisch vermogen", en: "Organization", category: "core" },
  { id: "decision-making", nl: "Besluitvorming", en: "Decision making", category: "leadership" },
  { id: "critical-thinking", nl: "Kritisch denken", en: "Critical thinking", category: "analytical" },
  { id: "adaptability", nl: "Aanpassingsvermogen", en: "Adaptability", category: "core" },
  { id: "attention-to-detail", nl: "Oog voor detail", en: "Attention to detail", category: "core" },
  { id: "negotiation", nl: "Onderhandelen", en: "Negotiation", category: "communication" },
  { id: "public-speaking", nl: "Presenteren", en: "Public speaking", category: "communication" },
  { id: "writing", nl: "Schrijven", en: "Writing", category: "communication" },
  { id: "mentoring", nl: "Mentoring", en: "Mentoring", category: "leadership" },
  { id: "coaching", nl: "Coachen", en: "Coaching", category: "leadership" },

  // Customer / sales / service
  { id: "customer-service", nl: "Klantenservice", en: "Customer service", category: "service" },
  { id: "sales", nl: "Verkoop", en: "Sales", category: "service" },
  { id: "complaint-handling", nl: "Klachtafhandeling", en: "Complaint handling", category: "service" },
  { id: "cash-handling", nl: "Kassabeheer", en: "Cash handling", category: "service" },

  // Project / management
  { id: "project-management", nl: "Projectmanagement", en: "Project management", category: "leadership" },
  { id: "agile-scrum", nl: "Agile / Scrum", en: "Agile / Scrum", category: "leadership" },
  { id: "stakeholder-management", nl: "Stakeholdermanagement", en: "Stakeholder management", category: "leadership" },

  // Office
  { id: "ms-office", nl: "Microsoft Office", en: "Microsoft Office", category: "office" },
  { id: "excel", nl: "Excel", en: "Excel", category: "office" },
  { id: "word", nl: "Word", en: "Word", category: "office" },
  { id: "powerpoint", nl: "PowerPoint", en: "PowerPoint", category: "office" },
  { id: "outlook", nl: "Outlook", en: "Outlook", category: "office" },
  { id: "google-workspace", nl: "Google Workspace", en: "Google Workspace", category: "office" },

  // Technical
  { id: "data-analysis", nl: "Data-analyse", en: "Data analysis", category: "analytical" },
  { id: "sql", nl: "SQL", en: "SQL", category: "technical" },
  { id: "python", nl: "Python", en: "Python", category: "technical" },
  { id: "javascript", nl: "JavaScript", en: "JavaScript", category: "technical" },
  { id: "typescript", nl: "TypeScript", en: "TypeScript", category: "technical" },
  { id: "react", nl: "React", en: "React", category: "technical" },
  { id: "nodejs", nl: "Node.js", en: "Node.js", category: "technical" },
  { id: "html-css", nl: "HTML / CSS", en: "HTML / CSS", category: "technical" },
  { id: "git", nl: "Git", en: "Git", category: "technical" },
  { id: "technical-support", nl: "Technische ondersteuning", en: "Technical support", category: "technical" },
  { id: "troubleshooting", nl: "Probleemanalyse", en: "Troubleshooting", category: "technical" },

  // Creative
  { id: "graphic-design", nl: "Grafisch ontwerp", en: "Graphic design", category: "creative" },
  { id: "social-media", nl: "Social media", en: "Social media", category: "creative" },
  { id: "marketing", nl: "Marketing", en: "Marketing", category: "creative" },
  { id: "content-creation", nl: "Contentcreatie", en: "Content creation", category: "creative" },
  { id: "photography", nl: "Fotografie", en: "Photography", category: "creative" },

  // Service / practical
  { id: "training", nl: "Training geven", en: "Training", category: "leadership" },
  { id: "research", nl: "Onderzoek", en: "Research", category: "analytical" },
  { id: "scheduling", nl: "Roosterplanning", en: "Scheduling", category: "core" },
  { id: "inventory-management", nl: "Voorraadbeheer", en: "Inventory management", category: "core" },
  { id: "driving-license-b", nl: "Rijbewijs B", en: "Driving licence B", category: "core" },
];

export const PRESET_STRENGTHS: Preset[] = [
  { id: "responsible", nl: "Verantwoordelijk", en: "Responsible" },
  { id: "reliable", nl: "Betrouwbaar", en: "Reliable" },
  { id: "motivated", nl: "Gemotiveerd", en: "Motivated" },
  { id: "flexible", nl: "Flexibel", en: "Flexible" },
  { id: "hardworking", nl: "Hardwerkend", en: "Hardworking" },
  { id: "proactive", nl: "Proactief", en: "Proactive" },
  { id: "honest", nl: "Eerlijk", en: "Honest" },
  { id: "friendly", nl: "Vriendelijk", en: "Friendly" },
  { id: "organized", nl: "Georganiseerd", en: "Organized" },
  { id: "punctual", nl: "Punctueel", en: "Punctual" },
  { id: "fast-learner", nl: "Leert snel", en: "Fast learner" },
  { id: "goal-oriented", nl: "Doelgericht", en: "Goal-oriented" },
  { id: "independent", nl: "Zelfstandig", en: "Independent" },
  { id: "positive", nl: "Positieve houding", en: "Positive attitude" },
  { id: "stress-resistant", nl: "Stressbestendig", en: "Stress-resistant" },
  { id: "detail-oriented", nl: "Nauwkeurig", en: "Detail-oriented" },
  { id: "solution-oriented", nl: "Oplossingsgericht", en: "Solution-oriented" },
  { id: "self-motivated", nl: "Zelfgemotiveerd", en: "Self-motivated" },
  { id: "disciplined", nl: "Gedisciplineerd", en: "Disciplined" },
  { id: "cooperative", nl: "Coöperatief", en: "Cooperative" },
  { id: "empathic", nl: "Empathisch", en: "Empathic" },
  { id: "patient", nl: "Geduldig", en: "Patient" },
  { id: "creative", nl: "Creatief", en: "Creative" },
  { id: "analytical", nl: "Analytisch", en: "Analytical" },
  { id: "ambitious", nl: "Ambitieus", en: "Ambitious" },
  { id: "enthusiastic", nl: "Enthousiast", en: "Enthusiastic" },
  { id: "loyal", nl: "Loyaal", en: "Loyal" },
  { id: "respectful", nl: "Respectvol", en: "Respectful" },
  { id: "open-minded", nl: "Open-minded", en: "Open-minded" },
  { id: "curious", nl: "Nieuwsgierig", en: "Curious" },
];

const SKILL_BY_ID = new Map(PRESET_SKILLS.map((s) => [s.id, s]));
const STRENGTH_BY_ID = new Map(PRESET_STRENGTHS.map((s) => [s.id, s]));

export function isPresetSkill(id: string): boolean {
  return SKILL_BY_ID.has(id);
}

export function isPresetStrength(id: string): boolean {
  return STRENGTH_BY_ID.has(id);
}

export function labelForSkill(id: string, lang: Locale): string {
  const preset = SKILL_BY_ID.get(id);
  if (!preset) return id;
  return preset[lang] ?? preset.nl;
}

export function labelForStrength(id: string, lang: Locale): string {
  const preset = STRENGTH_BY_ID.get(id);
  if (!preset) return id;
  return preset[lang] ?? preset.nl;
}

function normalize(s: string): string {
  return s
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[̀-ͯ]/g, "");
}

export function filterPresets(
  list: Preset[],
  query: string,
  lang: Locale,
  excludeIds: Set<string>,
): Preset[] {
  const q = normalize(query.trim());
  return list
    .filter((p) => !excludeIds.has(p.id))
    .filter((p) => {
      if (!q) return true;
      const hay = `${normalize(p[lang])} ${normalize(p.nl)} ${normalize(p.en)} ${normalize(p.id)}`;
      return hay.includes(q);
    });
}
