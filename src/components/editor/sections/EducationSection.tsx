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
          className="space-y-3 rounded-md border border-dashed border-neutral-200 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(edu.id)}
              aria-label="Remove education"
            >
              <Trash2 className="h-4 w-4 text-neutral-500" />
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
              <Label>Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) => update(edu.id, { degree: e.target.value })}
                placeholder="MSc"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Field</Label>
              <Input
                value={edu.field}
                onChange={(e) => update(edu.id, { field: e.target.value })}
                placeholder="Computer Science"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Dates</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={edu.startDate}
                  onChange={(e) => update(edu.id, { startDate: e.target.value })}
                  placeholder="2016"
                />
                <span className="text-neutral-400">→</span>
                <Input
                  value={edu.endDate}
                  onChange={(e) => update(edu.id, { endDate: e.target.value })}
                  placeholder="2018"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Notes (optional)</Label>
            <Textarea
              rows={2}
              value={edu.description}
              placeholder="Thesis, honors, GPA, relevant coursework."
              onChange={(e) => update(edu.id, { description: e.target.value })}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Add education
      </Button>
    </div>
  );
}
