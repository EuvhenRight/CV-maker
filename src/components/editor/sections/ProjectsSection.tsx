"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";

export function ProjectsSection() {
  const items = useCVStore((s) => s.cv.projects);
  const add = useCVStore((s) => s.addProject);
  const update = useCVStore((s) => s.updateProject);
  const remove = useCVStore((s) => s.removeProject);

  return (
    <div className="space-y-4">
      {items.map((pr) => (
        <div
          key={pr.id}
          className="space-y-3 rounded-md border border-dashed border-[#e8e6df] p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-[#7a7a7a]">
              Project
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(pr.id)}
              aria-label="Project verwijderen"
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Naam</Label>
              <Input
                value={pr.name}
                onChange={(e) => update(pr.id, { name: e.target.value })}
                placeholder="Open Design Tokens"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Link</Label>
              <Input
                value={pr.link}
                onChange={(e) => update(pr.id, { link: e.target.value })}
                placeholder="github.com/jij/project"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Beschrijving</Label>
            <Textarea
              rows={2}
              value={pr.description}
              onChange={(e) => update(pr.id, { description: e.target.value })}
              placeholder="Eén zin met impact. Voeg cijfers toe als je ze hebt."
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Project toevoegen
      </Button>
    </div>
  );
}
