"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";
import { AIStubButton } from "../AIStubButton";

export function ExperienceSection() {
  const items = useCVStore((s) => s.cv.experience);
  const add = useCVStore((s) => s.addExperience);
  const update = useCVStore((s) => s.updateExperience);
  const remove = useCVStore((s) => s.removeExperience);

  return (
    <div className="space-y-4">
      {items.map((exp, idx) => (
        <div
          key={exp.id}
          className="space-y-3 rounded-md border border-dashed border-neutral-200 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Role #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(exp.id)}
              aria-label="Remove role"
            >
              <Trash2 className="h-4 w-4 text-neutral-500" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Input
                value={exp.role}
                onChange={(e) => update(exp.id, { role: e.target.value })}
                placeholder="Senior Engineer"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => update(exp.id, { company: e.target.value })}
                placeholder="Acme Corp"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => update(exp.id, { location: e.target.value })}
                placeholder="Amsterdam, NL"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Dates</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={exp.startDate}
                  onChange={(e) => update(exp.id, { startDate: e.target.value })}
                  placeholder="Jan 2022"
                />
                <span className="text-neutral-400">→</span>
                <Input
                  value={exp.current ? "Present" : exp.endDate}
                  onChange={(e) => update(exp.id, { endDate: e.target.value })}
                  placeholder="Mar 2024"
                  disabled={exp.current}
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-neutral-600">
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
                I currently work here
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Bullets</Label>
              <AIStubButton label="Improve bullets" />
            </div>
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="flex items-start gap-2">
                <span className="mt-2 text-neutral-400">•</span>
                <Textarea
                  rows={2}
                  value={b}
                  placeholder="What you did, the impact, the numbers."
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
                  aria-label="Remove bullet"
                >
                  <Trash2 className="h-3.5 w-3.5 text-neutral-400" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => update(exp.id, { bullets: [...exp.bullets, ""] })}
            >
              <Plus className="h-3.5 w-3.5" />
              Add bullet
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Add work experience
      </Button>
    </div>
  );
}
