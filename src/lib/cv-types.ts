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
  // Optional opt-in contact/detail fields
  github?: string;
  // Optional NL-specific opt-in fields (CV for 2026)
  dateOfBirth?: string;
  nationality?: string;
  workEligibility?: string;
  drivingLicense?: string;
  bigNumber?: string;
  agbCode?: string;
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
  github?: string;
  description: string;
  bullets: string[];
}

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
  cefr?: CEFRLevel;
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
  | "strengths"
  | "projects"
  | "languages"
  | "certifications";

export const ALL_SECTIONS: SectionKey[] = [
  "summary",
  "projects",
  "experience",
  "education",
  "skills",
  "strengths",
  "languages",
  "certifications",
];

export interface CoverLetter {
  recipientCompany: string;
  recipientName: string;
  recipientAddress: string;
  recipientCity: string;
  jobTitle: string;
  vacancyRef: string;
  date: string;
  subject: string;
  opening: string;
  body: string;
  closing: string;
}

export interface CV {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  strengths: string[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  sectionOrder: SectionKey[];
  template: TemplateId;
  accentColor: string;
  photoHidden?: boolean;
  coverLetter?: CoverLetter;
}
