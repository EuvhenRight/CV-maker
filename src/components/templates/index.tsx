import type { CV, TemplateId } from "@/lib/cv-types";
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
    name: "Minimal",
    description: "Clean single-column, ATS-friendly, fits one page.",
    category: "classic",
    hasPhoto: false,
  },
  modern: {
    name: "Modern",
    description: "Sidebar layout with skills + contact panel.",
    category: "classic",
    hasPhoto: false,
  },
  corporate: {
    name: "Corporate",
    description: "Traditional serif, conservative formatting.",
    category: "classic",
    hasPhoto: false,
  },
  creative: {
    name: "Creative",
    description: "Bold accent header, friendly typographic rhythm.",
    category: "classic",
    hasPhoto: false,
  },
  tech: {
    name: "Tech / IT",
    description: "Dark sidebar, monospace accents, photo + skill chips.",
    category: "industry",
    industry: "IT & Software",
    hasPhoto: true,
  },
  delivery: {
    name: "Delivery & Logistics",
    description: "Bold coloured header, clear shifts and routes.",
    category: "industry",
    industry: "Delivery / Logistics",
    hasPhoto: true,
  },
  housekeeping: {
    name: "Housekeeping",
    description: "Warm sage tones, friendly photo card.",
    category: "industry",
    industry: "Cleaning / Housekeeping",
    hasPhoto: true,
  },
  hospitality: {
    name: "Hospitality",
    description: "Elegant serif, centred photo, hotel-ready.",
    category: "industry",
    industry: "Hotel / Hospitality",
    hasPhoto: true,
  },
  healthcare: {
    name: "Healthcare",
    description: "Calm blue sidebar, licences front and centre.",
    category: "industry",
    industry: "Care / Medical",
    hasPhoto: true,
  },
  construction: {
    name: "Construction",
    description: "Dark navy header, bold uppercase, photo with frame.",
    category: "industry",
    industry: "Construction / Trades",
    hasPhoto: true,
  },
  retail: {
    name: "Retail & Sales",
    description: "Friendly portrait card with stat bar accent.",
    category: "industry",
    industry: "Retail / Customer",
    hasPhoto: true,
  },
  education: {
    name: "Education",
    description: "Soft beige, serif body, teacher-ready.",
    category: "industry",
    industry: "Teaching / Education",
    hasPhoto: true,
  },
  "creative-bold": {
    name: "Creative Bold",
    description: "Gradient header, large photo, portfolio energy.",
    category: "industry",
    industry: "Design / Creative",
    hasPhoto: true,
  },
  admin: {
    name: "Admin / Office",
    description: "Two-column corporate with portrait + skill stack.",
    category: "industry",
    industry: "Admin / Office",
    hasPhoto: true,
  },
};

export const TEMPLATE_IDS = Object.keys(TEMPLATE_META) as TemplateId[];

export function CVTemplate({ cv }: { cv: CV }) {
  switch (cv.template) {
    case "modern":
      return <ModernTemplate cv={cv} />;
    case "corporate":
      return <CorporateTemplate cv={cv} />;
    case "creative":
      return <CreativeTemplate cv={cv} />;
    case "tech":
      return <TechTemplate cv={cv} />;
    case "delivery":
      return <DeliveryTemplate cv={cv} />;
    case "housekeeping":
      return <HousekeepingTemplate cv={cv} />;
    case "hospitality":
      return <HospitalityTemplate cv={cv} />;
    case "healthcare":
      return <HealthcareTemplate cv={cv} />;
    case "construction":
      return <ConstructionTemplate cv={cv} />;
    case "retail":
      return <RetailTemplate cv={cv} />;
    case "education":
      return <EducationTemplate cv={cv} />;
    case "creative-bold":
      return <CreativeBoldTemplate cv={cv} />;
    case "admin":
      return <AdminTemplate cv={cv} />;
    case "minimal":
    default:
      return <MinimalTemplate cv={cv} />;
  }
}
