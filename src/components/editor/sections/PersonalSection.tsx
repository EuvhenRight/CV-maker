"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import { PhotoUpload } from "../PhotoUpload";

export function PersonalSection() {
  const personal = useCVStore((s) => s.cv.personal);
  const update = useCVStore((s) => s.updatePersonal);

  const field = (
    key: Exclude<keyof typeof personal, "photo">,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={`p-${key}`}>{label}</Label>
      <Input
        id={`p-${key}`}
        type={type}
        value={personal[key]}
        placeholder={placeholder}
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
        {field("fullName", "Volledige naam", "Sanne de Vries")}
        {field("title", "Functietitel", "Senior Softwareontwikkelaar")}
        {field("email", "E-mail", "sanne@voorbeeld.nl", "email")}
        {field("phone", "Telefoon", "+31 6 12 34 56 78", "tel")}
        {field("location", "Woonplaats", "Amsterdam, NL")}
        {field("website", "Website", "sannedevries.nl")}
        <div className="sm:col-span-2">
          {field("linkedin", "LinkedIn", "linkedin.com/in/sannedevries")}
        </div>
      </div>
    </div>
  );
}
