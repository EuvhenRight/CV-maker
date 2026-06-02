"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";

export function SkillsSection() {
  const items = useCVStore((s) => s.cv.skills);
  const add = useCVStore((s) => s.addSkill);
  const update = useCVStore((s) => s.updateSkill);
  const remove = useCVStore((s) => s.removeSkill);

  return (
    <div className="space-y-3">
      {items.map((sk) => (
        <div
          key={sk.id}
          className="grid grid-cols-1 gap-2 rounded-md border border-dashed border-[#e8e6df] p-3 sm:grid-cols-[1fr_2fr_auto]"
        >
          <div className="space-y-1.5">
            <Label>Categorie</Label>
            <Input
              value={sk.category}
              onChange={(e) => update(sk.id, { category: e.target.value })}
              placeholder="Talen"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Items (komma gescheiden)</Label>
            <Input
              value={sk.items}
              onChange={(e) => update(sk.id, { items: e.target.value })}
              placeholder="TypeScript, Go, Python"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(sk.id)}
              aria-label="Vaardigheidsgroep verwijderen"
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Vaardigheid toevoegen
      </Button>
    </div>
  );
}
