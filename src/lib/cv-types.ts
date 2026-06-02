export type TemplateId =
  | "minimal"
  | "modern"
  | "corporate"
  | "creative"
  | "tech"
  | "delivery"
  | "housekeeping"
  | "hospitality"
  | "healthcare"
  | "construction"
  | "retail"
  | "education"
  | "creative-bold"
  | "admin";

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  photo: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
  bullets: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export type SectionKey =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "languages"
  | "certifications";

export const ALL_SECTIONS: SectionKey[] = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "languages",
  "certifications",
];

export const SECTION_LABELS: Record<SectionKey, string> = {
  summary: "Samenvatting",
  experience: "Werkervaring",
  education: "Opleiding",
  skills: "Vaardigheden",
  projects: "Projecten",
  languages: "Talen",
  certifications: "Certificaten",
};

export interface CV {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  sectionOrder: SectionKey[];
  template: TemplateId;
  accentColor: string;
}
