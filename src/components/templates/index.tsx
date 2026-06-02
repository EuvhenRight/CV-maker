import type { CV, TemplateId } from "@/lib/cv-types";
import { MinimalTemplate } from "./MinimalTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { CorporateTemplate } from "./CorporateTemplate";
import { CreativeTemplate } from "./CreativeTemplate";

export const TEMPLATE_META: Record<
  TemplateId,
  { name: string; description: string }
> = {
  minimal: {
    name: "Minimal",
    description: "Clean single-column, ATS-friendly, fits one page.",
  },
  modern: {
    name: "Modern",
    description: "Sidebar layout with skills + contact panel.",
  },
  corporate: {
    name: "Corporate",
    description: "Traditional serif, conservative formatting.",
  },
  creative: {
    name: "Creative",
    description: "Bold accent header, friendly typographic rhythm.",
  },
};

export function CVTemplate({ cv }: { cv: CV }) {
  switch (cv.template) {
    case "modern":
      return <ModernTemplate cv={cv} />;
    case "corporate":
      return <CorporateTemplate cv={cv} />;
    case "creative":
      return <CreativeTemplate cv={cv} />;
    case "minimal":
    default:
      return <MinimalTemplate cv={cv} />;
  }
}
