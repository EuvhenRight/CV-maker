"use client";

import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import { useT, useLocale } from "@/lib/i18n";
import {
  PRESET_SKILLS,
  isPresetSkill,
  isTechnicalSkill,
  labelForSkill,
} from "@/lib/skills-data";
import { ChipPicker } from "../ChipPicker";

const TECHNICAL_PRESETS = PRESET_SKILLS.filter(
  (p) => p.category === "technical",
);
const PROFESSIONAL_PRESETS = PRESET_SKILLS.filter(
  (p) => p.category !== "technical",
);

export function SkillsSection() {
  const items = useCVStore((s) => s.cv.skills);
  const technicalCustom = useCVStore((s) => s.cv.technicalCustom);
  const add = useCVStore((s) => s.addSkill);
  const remove = useCVStore((s) => s.removeSkill);
  const markTechnical = useCVStore((s) => s.markSkillTechnical);
  const t = useT();
  const { locale } = useLocale();

  const techSet = new Set(technicalCustom ?? []);
  const isTech = (id: string) => isTechnicalSkill(id) || techSet.has(id);

  const technicalSelected = items.filter(isTech);
  const professionalSelected = items.filter((id) => !isTech(id));

  // A custom (non-catalog) skill typed into the Technical field is remembered as
  // technical, so it renders in the Technical group instead of defaulting to
  // Professional. Catalog skills are grouped by their category automatically.
  const addTechnical = (id: string) => {
    add(id);
    if (!isPresetSkill(id)) markTechnical(id, true);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#7a7a7a]">{t("skills.helper")}</p>

      <div className="space-y-1.5">
        <Label>{t("skills.technical.label")}</Label>
        <ChipPicker
          presets={TECHNICAL_PRESETS}
          selectedIds={technicalSelected}
          onAdd={addTechnical}
          onRemove={remove}
          labelOf={(id) => labelForSkill(id, locale)}
          isPreset={isPresetSkill}
          placeholder={t("skills.technical.ph")}
          emptyHint={t("skills.technical.empty")}
        />
      </div>

      <div className="space-y-1.5">
        <Label>{t("skills.professional.label")}</Label>
        <ChipPicker
          presets={PROFESSIONAL_PRESETS}
          selectedIds={professionalSelected}
          onAdd={add}
          onRemove={remove}
          labelOf={(id) => labelForSkill(id, locale)}
          isPreset={isPresetSkill}
          placeholder={t("skills.professional.ph")}
          emptyHint={t("skills.professional.empty")}
        />
      </div>
    </div>
  );
}
