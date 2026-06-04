"use client";

import { useCVStore } from "@/lib/store";
import { useT, useLocale } from "@/lib/i18n";
import {
  PRESET_SKILLS,
  isPresetSkill,
  labelForSkill,
} from "@/lib/skills-data";
import { ChipPicker } from "../ChipPicker";

export function SkillsSection() {
  const items = useCVStore((s) => s.cv.skills);
  const add = useCVStore((s) => s.addSkill);
  const remove = useCVStore((s) => s.removeSkill);
  const t = useT();
  const { locale } = useLocale();

  return (
    <div className="space-y-2">
      <p className="text-xs text-[#7a7a7a]">{t("skills.helper")}</p>
      <ChipPicker
        presets={PRESET_SKILLS}
        selectedIds={items}
        onAdd={add}
        onRemove={remove}
        labelOf={(id) => labelForSkill(id, locale)}
        isPreset={isPresetSkill}
        placeholder={t("skills.search.ph")}
        emptyHint={t("skills.empty")}
      />
    </div>
  );
}
