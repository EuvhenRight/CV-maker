"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function ProjectsSection() {
  const items = useCVStore((s) => s.cv.projects);
  const add = useCVStore((s) => s.addProject);
  const update = useCVStore((s) => s.updateProject);
  const remove = useCVStore((s) => s.removeProject);
  const t = useT();

  return (
    <div className="space-y-4">
      {items.map((pr) => (
        <div
          key={pr.id}
          className="space-y-3 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-[#7a7a7a]">
              {t("projects.entry")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(pr.id)}
              aria-label={t("projects.removeAria")}
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("projects.name")}</Label>
              <Input
                value={pr.name}
                onChange={(e) => update(pr.id, { name: e.target.value })}
                placeholder={t("projects.name.ph")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("projects.link")}</Label>
              <Input
                value={pr.link}
                onChange={(e) => update(pr.id, { link: e.target.value })}
                placeholder={t("projects.link.ph")}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{t("projects.description")}</Label>
            <Textarea
              rows={2}
              value={pr.description}
              onChange={(e) => update(pr.id, { description: e.target.value })}
              placeholder={t("projects.description.ph")}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        {t("projects.add")}
      </Button>
    </div>
  );
}
