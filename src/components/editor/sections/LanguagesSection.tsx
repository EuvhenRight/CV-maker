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

const LEVELS = ["Moedertaal", "Vloeiend", "Professioneel", "Gemiddeld", "Basis"];

export function LanguagesSection() {
  const items = useCVStore((s) => s.cv.languages);
  const add = useCVStore((s) => s.addLanguage);
  const update = useCVStore((s) => s.updateLanguage);
  const remove = useCVStore((s) => s.removeLanguage);

  return (
    <div className="space-y-3">
      {items.map((ln) => (
        <div
          key={ln.id}
          className="grid grid-cols-[1fr_1fr_auto] items-end gap-2 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="space-y-1.5">
            <Label>Taal</Label>
            <Input
              value={ln.name}
              onChange={(e) => update(ln.id, { name: e.target.value })}
              placeholder="Nederlands"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Niveau</Label>
            <Select
              value={ln.level}
              onValueChange={(v) => update(ln.id, { level: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Kies" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
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
            aria-label="Taal verwijderen"
          >
            <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Taal toevoegen
      </Button>
    </div>
  );
}
