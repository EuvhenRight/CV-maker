"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";

export function PersonalSection() {
  const personal = useCVStore((s) => s.cv.personal);
  const update = useCVStore((s) => s.updatePersonal);

  const field = (key: keyof typeof personal, label: string, placeholder: string, type = "text") => (
    <div className="space-y-1.5">
      <Label htmlFor={`p-${key}`}>{label}</Label>
      <Input
        id={`p-${key}`}
        type={type}
        value={personal[key]}
        placeholder={placeholder}
        onChange={(e) => update({ [key]: e.target.value } as Partial<typeof personal>)}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {field("fullName", "Full name", "Jane Doe")}
      {field("title", "Job title", "Senior Software Engineer")}
      {field("email", "Email", "jane@example.com", "email")}
      {field("phone", "Phone", "+31 6 12 34 56 78", "tel")}
      {field("location", "Location", "Amsterdam, NL")}
      {field("website", "Website", "janedoe.dev")}
      <div className="sm:col-span-2">{field("linkedin", "LinkedIn", "linkedin.com/in/janedoe")}</div>
    </div>
  );
}
