"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PhotoUpload } from "../PhotoUpload";

type CoreKey =
  | "fullName"
  | "title"
  | "email"
  | "phone"
  | "location"
  | "website"
  | "linkedin";

type OptionalKey =
  | "dateOfBirth"
  | "nationality"
  | "workEligibility"
  | "drivingLicense"
  | "bigNumber"
  | "agbCode";

export function PersonalSection() {
  const personal = useCVStore((s) => s.cv.personal);
  const update = useCVStore((s) => s.updatePersonal);
  const t = useT();

  const hasAnyOptional = (
    [
      "dateOfBirth",
      "nationality",
      "workEligibility",
      "drivingLicense",
      "bigNumber",
      "agbCode",
    ] as OptionalKey[]
  ).some((k) => (personal[k] ?? "").length > 0);

  const [optionalOpen, setOptionalOpen] = React.useState(hasAnyOptional);

  const coreField = (key: CoreKey, labelKey: string, phKey: string, type = "text") => (
    <div className="space-y-1.5">
      <Label htmlFor={`p-${key}`}>{t(labelKey)}</Label>
      <Input
        id={`p-${key}`}
        type={type}
        value={personal[key]}
        placeholder={t(phKey)}
        onChange={(e) => update({ [key]: e.target.value })}
      />
    </div>
  );

  const optionalField = (
    key: OptionalKey,
    labelKey: string,
    phKey: string,
    type = "text",
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={`p-${key}`}>{t(labelKey)}</Label>
      <Input
        id={`p-${key}`}
        type={type}
        value={personal[key] ?? ""}
        placeholder={t(phKey)}
        onChange={(e) => update({ [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <PhotoUpload />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {coreField("fullName", "personal.fullName", "personal.fullName.ph")}
        {coreField("title", "personal.title", "personal.title.ph")}
        {coreField("email", "personal.email", "personal.email.ph", "email")}
        {coreField("phone", "personal.phone", "personal.phone.ph", "tel")}
        {coreField("location", "personal.location", "personal.location.ph")}
        {coreField("website", "personal.website", "personal.website.ph")}
        <div className="sm:col-span-2">
          {coreField("linkedin", "personal.linkedin", "personal.linkedin.ph")}
        </div>
      </div>

      <div className="rounded-md border border-dashed border-[#e8e6df]">
        <button
          type="button"
          onClick={() => setOptionalOpen((v) => !v)}
          aria-expanded={optionalOpen}
          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-semibold text-[#3a3a3a]"
        >
          <span>{t("personal.optional.heading")}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              optionalOpen ? "rotate-180" : "",
            )}
          />
        </button>
        {optionalOpen && (
          <div className="space-y-3 border-t border-dashed border-[#e8e6df] px-3 py-3">
            <p className="text-[11px] leading-relaxed text-[#7a7a7a]">
              {t("personal.optional.help")}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {optionalField(
                "dateOfBirth",
                "personal.dateOfBirth",
                "personal.dateOfBirth.ph",
              )}
              {optionalField(
                "nationality",
                "personal.nationality",
                "personal.nationality.ph",
              )}
              <div className="sm:col-span-2">
                {optionalField(
                  "workEligibility",
                  "personal.workEligibility",
                  "personal.workEligibility.ph",
                )}
              </div>
              <div className="sm:col-span-2">
                {optionalField(
                  "drivingLicense",
                  "personal.drivingLicense",
                  "personal.drivingLicense.ph",
                )}
              </div>
              {optionalField(
                "bigNumber",
                "personal.bigNumber",
                "personal.bigNumber.ph",
              )}
              {optionalField("agbCode", "personal.agbCode", "personal.agbCode.ph")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
