"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function CertificationsSection() {
  const items = useCVStore((s) => s.cv.certifications);
  const add = useCVStore((s) => s.addCertification);
  const update = useCVStore((s) => s.updateCertification);
  const remove = useCVStore((s) => s.removeCertification);
  const t = useT();

  return (
    <div className="space-y-3">
      {items.map((ct) => (
        <div
          key={ct.id}
          className="grid grid-cols-1 gap-3 rounded-md border border-dashed border-[#e8e6df] p-3 sm:grid-cols-2"
        >
          <div className="space-y-1.5">
            <Label>{t("cert.name")}</Label>
            <Input
              value={ct.name}
              onChange={(e) => update(ct.id, { name: e.target.value })}
              placeholder={t("cert.name.ph")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>{t("cert.issuer")}</Label>
            <Input
              value={ct.issuer}
              onChange={(e) => update(ct.id, { issuer: e.target.value })}
              placeholder={t("cert.issuer.ph")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>{t("cert.date")}</Label>
            <Input
              value={ct.date}
              onChange={(e) => update(ct.id, { date: e.target.value })}
              placeholder={t("cert.date.ph")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>{t("cert.link")}</Label>
            <Input
              value={ct.link}
              onChange={(e) => update(ct.id, { link: e.target.value })}
              placeholder={t("cert.link.ph")}
            />
          </div>
          <div className="flex justify-end sm:col-span-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => remove(ct.id)}
              aria-label={t("cert.removeAria")}
            >
              <Trash2 className="h-4 w-4 text-[#7a7a7a]" />
              {t("cert.remove")}
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        {t("cert.add")}
      </Button>
    </div>
  );
}
