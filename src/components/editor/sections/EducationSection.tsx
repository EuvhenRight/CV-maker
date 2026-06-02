"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";

export function EducationSection() {
  const items = useCVStore((s) => s.cv.education);
  const add = useCVStore((s) => s.addEducation);
  const update = useCVStore((s) => s.updateEducation);
  const remove = useCVStore((s) => s.removeEducation);

  return (
    <div className="space-y-4">
      {items.map((edu, idx) => (
        <div
          key={edu.id}
          className="space-y-3 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-[#7a7a7a]">
              #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(edu.id)}
              aria-label="Opleiding verwijderen"
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>School</Label>
              <Input
                value={edu.school}
                onChange={(e) => update(edu.id, { school: e.target.value })}
                placeholder="TU Delft"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Diploma</Label>
              <Input
                value={edu.degree}
                onChange={(e) => update(edu.id, { degree: e.target.value })}
                placeholder="MSc"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Studierichting</Label>
              <Input
                value={edu.field}
                onChange={(e) => update(edu.id, { field: e.target.value })}
                placeholder="Informatica"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Periode</Label>
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
            <Label>Opmerkingen (optioneel)</Label>
            <Textarea
              rows={2}
              value={edu.description}
              placeholder="Scriptie, cijfers, relevante vakken."
              onChange={(e) => update(edu.id, { description: e.target.value })}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Opleiding toevoegen
      </Button>
    </div>
  );
}
