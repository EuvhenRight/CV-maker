"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function EducationSection() {
  const items = useCVStore((s) => s.cv.education);
  const add = useCVStore((s) => s.addEducation);
  const update = useCVStore((s) => s.updateEducation);
  const remove = useCVStore((s) => s.removeEducation);
  const t = useT();

  return (
    <div className="space-y-4">
      {items.map((edu, idx) => (
        <div
          key={edu.id}
          className="space-y-3 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-[#7a7a7a]">
              #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(edu.id)}
              aria-label={t("edu.removeAria")}
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("edu.school")}</Label>
              <Input
                value={edu.school}
                onChange={(e) => update(edu.id, { school: e.target.value })}
                placeholder={t("edu.school.ph")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("edu.degree")}</Label>
              <Input
                value={edu.degree}
                onChange={(e) => update(edu.id, { degree: e.target.value })}
                placeholder={t("edu.degree.ph")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("edu.field")}</Label>
              <Input
                value={edu.field}
                onChange={(e) => update(edu.id, { field: e.target.value })}
                placeholder={t("edu.field.ph")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("edu.period")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={edu.startDate}
                  onChange={(e) =>
                    update(edu.id, { startDate: e.target.value })
                  }
                  placeholder="2016"
                />
                <span className="text-[#aaa]">→</span>
                <Input
                  value={edu.endDate}
                  onChange={(e) => update(edu.id, { endDate: e.target.value })}
                  placeholder="2018"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{t("edu.notes")}</Label>
            <Textarea
              rows={2}
              value={edu.description}
              placeholder={t("edu.notes.ph")}
              onChange={(e) => update(edu.id, { description: e.target.value })}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        {t("edu.add")}
      </Button>
    </div>
  );
}
