import type { CV, TemplateId } from "@/lib/cv-types";
import type { Locale } from "@/lib/i18n";
import { MinimalTemplate } from "./MinimalTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { CorporateTemplate } from "./CorporateTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { TechTemplate } from "./industry/TechTemplate";
import { DeliveryTemplate } from "./industry/DeliveryTemplate";
import { HousekeepingTemplate } from "./industry/HousekeepingTemplate";
import { HospitalityTemplate } from "./industry/HospitalityTemplate";
import { HealthcareTemplate } from "./industry/HealthcareTemplate";
import { ConstructionTemplate } from "./industry/ConstructionTemplate";
import { RetailTemplate } from "./industry/RetailTemplate";
import { EducationTemplate } from "./industry/EducationTemplate";
import { CreativeBoldTemplate } from "./industry/CreativeBoldTemplate";
import { AdminTemplate } from "./industry/AdminTemplate";

export type TemplateCategory = "classic" | "industry";

export interface TemplateMeta {
  name: string;
  description: string;
  category: TemplateCategory;
  industry?: string;
  hasPhoto: boolean;
}

export const TEMPLATE_META: Record<TemplateId, TemplateMeta> = {
  minimal: {
    name: "Minimaal",
    description: "Strak, één kolom, ATS-vriendelijk en past op één pagina.",
    category: "classic",
    hasPhoto: false,
  },
  modern: {
    name: "Modern",
    description: "Met zijbalk voor vaardigheden en contactgegevens.",
    category: "classic",
    hasPhoto: false,
  },
  corporate: {
    name: "Zakelijk",
    description: "Traditioneel schreefletter, conservatieve opmaak.",
    category: "classic",
    hasPhoto: false,
  },
  creative: {
    name: "Creatief",
    description: "Krachtige accentkop met soepele typografie.",
    category: "classic",
    hasPhoto: false,
  },
  tech: {
    name: "IT & Tech",
    description: "Donkere zijbalk, monospace-accenten, foto en vaardigheden.",
    category: "industry",
    industry: "IT & Software",
    hasPhoto: true,
  },
  delivery: {
    name: "Bezorging & Logistiek",
    description: "Krachtige gekleurde kop, duidelijke diensten en routes.",
    category: "industry",
    industry: "Bezorging / Logistiek",
    hasPhoto: true,
  },
  housekeeping: {
    name: "Huishouding",
    description: "Warme saliegroene kaart met vriendelijke foto.",
    category: "industry",
    industry: "Schoonmaak / Huishouding",
    hasPhoto: true,
  },
  hospitality: {
    name: "Horeca",
    description: "Elegante schreefletter, gecentreerde foto, hotel-ready.",
    category: "industry",
    industry: "Hotel / Horeca",
    hasPhoto: true,
  },
  healthcare: {
    name: "Zorg",
    description: "Rustige blauwe zijbalk met diplomas en licenties.",
    category: "industry",
    industry: "Zorg / Medisch",
    hasPhoto: true,
  },
  construction: {
    name: "Bouw",
    description: "Donker navy-blauwe kop, bold hoofdletters, stevige foto.",
    category: "industry",
    industry: "Bouw / Techniek",
    hasPhoto: true,
  },
  retail: {
    name: "Retail & Verkoop",
    description: "Vriendelijke portretkaart met accent-balk.",
    category: "industry",
    industry: "Retail / Klantcontact",
    hasPhoto: true,
  },
  education: {
    name: "Onderwijs",
    description: "Zachte beige tinten, schreefletter — voor onderwijspersoneel.",
    category: "industry",
    industry: "Onderwijs",
    hasPhoto: true,
  },
  "creative-bold": {
    name: "Creatief Bold",
    description: "Verloop-header, grote foto, portfolio-energie.",
    category: "industry",
    industry: "Ontwerp / Creatief",
    hasPhoto: true,
  },
  admin: {
    name: "Administratie",
    description: "Twee kolommen voor kantoor en administratieve functies.",
    category: "industry",
    industry: "Kantoor / Administratie",
    hasPhoto: true,
  },
};

export const TEMPLATE_IDS = Object.keys(TEMPLATE_META) as TemplateId[];

export function CVTemplate({ cv, lang = "nl" }: { cv: CV; lang?: Locale }) {
  switch (cv.template) {
    case "modern":
      return <ModernTemplate cv={cv} lang={lang} />;
    case "corporate":
      return <CorporateTemplate cv={cv} lang={lang} />;
    case "creative":
      return <CreativeTemplate cv={cv} lang={lang} />;
    case "tech":
      return <TechTemplate cv={cv} lang={lang} />;
    case "delivery":
      return <DeliveryTemplate cv={cv} lang={lang} />;
    case "housekeeping":
      return <HousekeepingTemplate cv={cv} lang={lang} />;
    case "hospitality":
      return <HospitalityTemplate cv={cv} lang={lang} />;
    case "healthcare":
      return <HealthcareTemplate cv={cv} lang={lang} />;
    case "construction":
      return <ConstructionTemplate cv={cv} lang={lang} />;
    case "retail":
      return <RetailTemplate cv={cv} lang={lang} />;
    case "education":
      return <EducationTemplate cv={cv} lang={lang} />;
    case "creative-bold":
      return <CreativeBoldTemplate cv={cv} lang={lang} />;
    case "admin":
      return <AdminTemplate cv={cv} lang={lang} />;
    case "minimal":
    default:
      return <MinimalTemplate cv={cv} lang={lang} />;
  }
}
