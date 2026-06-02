"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";

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
          className="space-y-3 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-[#7a7a7a]">
              Functie #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(exp.id)}
              aria-label="Functie verwijderen"
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Functie</Label>
              <Input
                value={exp.role}
                onChange={(e) => update(exp.id, { role: e.target.value })}
                placeholder="Senior Ontwikkelaar"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bedrijf</Label>
              <Input
                value={exp.company}
                onChange={(e) => update(exp.id, { company: e.target.value })}
                placeholder="Acme B.V."
              />
            </div>
            <div className="space-y-1.5">
              <Label>Locatie</Label>
              <Input
                value={exp.location}
                onChange={(e) => update(exp.id, { location: e.target.value })}
                placeholder="Amsterdam, NL"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Periode</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={exp.startDate}
                  onChange={(e) =>
                    update(exp.id, { startDate: e.target.value })
                  }
                  placeholder="Jan 2022"
                />
                <span className="text-[#aaa]">→</span>
                <Input
                  value={exp.current ? "Heden" : exp.endDate}
                  onChange={(e) => update(exp.id, { endDate: e.target.value })}
                  placeholder="Mrt 2024"
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
                Ik werk hier nu
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Punten</Label>
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="flex items-start gap-2">
                <span className="mt-2 text-[#aaa]">•</span>
                <Textarea
                  rows={2}
                  value={b}
                  placeholder="Wat je deed, de impact, de cijfers."
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
                  aria-label="Punt verwijderen"
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
              Punt toevoegen
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Werkervaring toevoegen
      </Button>
    </div>
  );
}
