"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCVStore } from "@/lib/store";
import { useT, translate, useLocale } from "@/lib/i18n";
import type { CEFRLevel } from "@/lib/cv-types";

const CEFR_KEYS: CEFRLevel[] = ["native", "C2", "C1", "B2", "B1", "A2", "A1"];

const CEFR_LABEL_KEY: Record<CEFRLevel, string> = {
  native: "lang.cefr.native",
  C2: "lang.cefr.C2",
  C1: "lang.cefr.C1",
  B2: "lang.cefr.B2",
  B1: "lang.cefr.B1",
  A2: "lang.cefr.A2",
  A1: "lang.cefr.A1",
};

export function LanguagesSection() {
  const items = useCVStore((s) => s.cv.languages);
  const add = useCVStore((s) => s.addLanguage);
  const update = useCVStore((s) => s.updateLanguage);
  const remove = useCVStore((s) => s.removeLanguage);
  const t = useT();
  const { locale } = useLocale();

  return (
    <div className="space-y-3">
      {items.map((ln) => (
        <div
          key={ln.id}
          className="grid grid-cols-[1fr_1fr_auto] items-end gap-2 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="space-y-1.5">
            <Label>{t("lang.name")}</Label>
            <Input
              value={ln.name}
              onChange={(e) => update(ln.id, { name: e.target.value })}
              placeholder={t("lang.name.ph")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>{t("lang.cefr")}</Label>
            <Select
              value={ln.cefr ?? ""}
              onValueChange={(v) => {
                const cefr = v as CEFRLevel;
                update(ln.id, {
                  cefr,
                  level: translate(locale, CEFR_LABEL_KEY[cefr]),
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("lang.cefr.ph")} />
              </SelectTrigger>
              <SelectContent>
                {CEFR_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>
                    {t(CEFR_LABEL_KEY[k])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => remove(ln.id)}
            aria-label={t("lang.removeAria")}
          >
            <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
          </Button>
          <div className="col-span-3 space-y-1.5">
            <Label className="text-[11px] text-[#7a7a7a]">
              {t("lang.level")}
            </Label>
            <Input
              value={ln.level}
              onChange={(e) => update(ln.id, { level: e.target.value })}
              placeholder={t("lang.level.ph")}
            />
            <p className="text-[11px] text-[#7a7a7a]">{t("lang.cefr.help")}</p>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        {t("lang.add")}
      </Button>
    </div>
  );
}
