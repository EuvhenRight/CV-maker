"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function ExperienceSection() {
  const items = useCVStore((s) => s.cv.experience);
  const add = useCVStore((s) => s.addExperience);
  const update = useCVStore((s) => s.updateExperience);
  const remove = useCVStore((s) => s.removeExperience);
  const t = useT();

  return (
    <div className="space-y-4">
      {items.map((exp, idx) => (
        <div
          key={exp.id}
          className="space-y-3 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-[#7a7a7a]">
              {t("exp.entry")} #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(exp.id)}
              aria-label={t("exp.removeAria")}
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("exp.role")}</Label>
              <Input
                value={exp.role}
                onChange={(e) => update(exp.id, { role: e.target.value })}
                placeholder={t("exp.role.ph")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("exp.company")}</Label>
              <Input
                value={exp.company}
                onChange={(e) => update(exp.id, { company: e.target.value })}
                placeholder={t("exp.company.ph")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("exp.location")}</Label>
              <Input
                value={exp.location}
                onChange={(e) => update(exp.id, { location: e.target.value })}
                placeholder="Amsterdam, NL"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("exp.period")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={exp.startDate}
                  onChange={(e) =>
                    update(exp.id, { startDate: e.target.value })
                  }
                  placeholder={t("exp.start.ph")}
                />
                <span className="text-[#aaa]">→</span>
                <Input
                  value={exp.current ? t("exp.currentShort") : exp.endDate}
                  onChange={(e) => update(exp.id, { endDate: e.target.value })}
                  placeholder={t("exp.end.ph")}
                  disabled={exp.current}
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-[#666]">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    update(exp.id, {
                      current: e.target.checked,
                      endDate: e.target.checked ? "" : exp.endDate,
                    })
                  }
                />
                {t("exp.current")}
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t("exp.bullets")}</Label>
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="flex items-start gap-2">
                <span className="mt-2 text-[#aaa]">•</span>
                <Textarea
                  rows={2}
                  value={b}
                  placeholder={t("exp.bullet.ph")}
                  onChange={(e) => {
                    const next = [...exp.bullets];
                    next[bi] = e.target.value;
                    update(exp.id, { bullets: next });
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-1"
                  onClick={() =>
                    update(exp.id, {
                      bullets: exp.bullets.filter((_, i) => i !== bi),
                    })
                  }
                  aria-label={t("exp.bullet.removeAria")}
                >
                  <Trash2 className="h-3.5 w-3.5 text-[#aaa]" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => update(exp.id, { bullets: [...exp.bullets, ""] })}
            >
              <Plus className="h-3.5 w-3.5" />
              {t("exp.bullet.add")}
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        {t("exp.add")}
      </Button>
    </div>
  );
}
