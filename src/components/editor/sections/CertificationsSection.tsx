"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";

export function CertificationsSection() {
  const items = useCVStore((s) => s.cv.certifications);
  const add = useCVStore((s) => s.addCertification);
  const update = useCVStore((s) => s.updateCertification);
  const remove = useCVStore((s) => s.removeCertification);

  return (
    <div className="space-y-3">
      {items.map((ct) => (
        <div
          key={ct.id}
          className="grid grid-cols-1 gap-3 rounded-md border border-dashed border-[#e8e6df] p-3 sm:grid-cols-2"
        >
          <div className="space-y-1.5">
            <Label>Naam</Label>
            <Input
              value={ct.name}
              onChange={(e) => update(ct.id, { name: e.target.value })}
              placeholder="AWS Solutions Architect"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Uitgever</Label>
            <Input
              value={ct.issuer}
              onChange={(e) => update(ct.id, { issuer: e.target.value })}
              placeholder="Amazon Web Services"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Datum</Label>
            <Input
              value={ct.date}
              onChange={(e) => update(ct.id, { date: e.target.value })}
              placeholder="2024"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Link (optioneel)</Label>
            <Input
              value={ct.link}
              onChange={(e) => update(ct.id, { link: e.target.value })}
              placeholder="credly.com/..."
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(ct.id)}>
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
              Verwijderen
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Certificaat toevoegen
      </Button>
    </div>
  );
}
