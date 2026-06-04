"use client";

import { useCVStore } from "@/lib/store";
import { useT, useLocale } from "@/lib/i18n";
import {
  PRESET_STRENGTHS,
  isPresetStrength,
  labelForStrength,
} from "@/lib/skills-data";
import { ChipPicker } from "../ChipPicker";

export function StrengthsSection() {
  const items = useCVStore((s) => s.cv.strengths);
  const add = useCVStore((s) => s.addStrength);
  const remove = useCVStore((s) => s.removeStrength);
  const t = useT();
  const { locale } = useLocale();

  return (
    <div className="space-y-2">
      <p className="text-xs text-[#7a7a7a]">{t("strengths.helper")}</p>
      <ChipPicker
        presets={PRESET_STRENGTHS}
        selectedIds={items}
        onAdd={add}
        onRemove={remove}
        labelOf={(id) => labelForStrength(id, locale)}
        isPreset={isPresetStrength}
        placeholder={t("strengths.search.ph")}
        emptyHint={t("strengths.empty")}
      />
    </div>
  );
}
