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
import { useT } from "@/lib/i18n";

const LEVEL_KEYS = [
  "lang.level.native",
  "lang.level.fluent",
  "lang.level.professional",
  "lang.level.intermediate",
  "lang.level.basic",
];

export function LanguagesSection() {
  const items = useCVStore((s) => s.cv.languages);
  const add = useCVStore((s) => s.addLanguage);
  const update = useCVStore((s) => s.updateLanguage);
  const remove = useCVStore((s) => s.removeLanguage);
  const t = useT();
  const levels = LEVEL_KEYS.map((k) => t(k));

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
            <Label>{t("lang.level")}</Label>
            <Select
              value={ln.level}
              onValueChange={(v) => update(ln.id, { level: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("lang.level.ph")} />
              </SelectTrigger>
              <SelectContent>
                {levels.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
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
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        {t("lang.add")}
      </Button>
    </div>
  );
}
