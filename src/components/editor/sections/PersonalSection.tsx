"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { PhotoUpload } from "../PhotoUpload";

export function PersonalSection() {
  const personal = useCVStore((s) => s.cv.personal);
  const update = useCVStore((s) => s.updatePersonal);
  const t = useT();

  const field = (
    key: Exclude<keyof typeof personal, "photo">,
    labelKey: string,
    phKey: string,
    type = "text",
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={`p-${key}`}>{t(labelKey)}</Label>
      <Input
        id={`p-${key}`}
        type={type}
        value={personal[key]}
        placeholder={t(phKey)}
        onChange={(e) =>
          update({ [key]: e.target.value } as Partial<typeof personal>)
        }
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <PhotoUpload />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {field("fullName", "personal.fullName", "personal.fullName.ph")}
        {field("title", "personal.title", "personal.title.ph")}
        {field("email", "personal.email", "personal.email.ph", "email")}
        {field("phone", "personal.phone", "personal.phone.ph", "tel")}
        {field("location", "personal.location", "personal.location.ph")}
        {field("website", "personal.website", "personal.website.ph")}
        <div className="sm:col-span-2">
          {field("linkedin", "personal.linkedin", "personal.linkedin.ph")}
        </div>
      </div>
    </div>
  );
}
