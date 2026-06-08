"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import type { CoverLetter } from "@/lib/cv-types";
import { makeEmptyCoverLetter } from "@/lib/sample-cv";

type Key = keyof CoverLetter;

export function CoverLetterEditor() {
  const letter = useCVStore(
    (s) => s.cv.coverLetter ?? makeEmptyCoverLetter(),
  );
  const update = useCVStore((s) => s.updateCoverLetter);
  const t = useT();

  const text = (key: Key, labelKey: string, phKey: string) => (
    <div className="space-y-1.5">
      <Label htmlFor={`l-${key}`}>{t(labelKey)}</Label>
      <Input
        id={`l-${key}`}
        value={letter[key]}
        placeholder={t(phKey)}
        onChange={(e) => update({ [key]: e.target.value })}
      />
    </div>
  );

  const area = (
    key: Key,
    labelKey: string,
    phKey: string,
    rows = 4,
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={`l-${key}`}>{t(labelKey)}</Label>
      <Textarea
        id={`l-${key}`}
        value={letter[key]}
        placeholder={t(phKey)}
        rows={rows}
        onChange={(e) => update({ [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
          {t("letter.section.recipient")}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {text(
            "recipientCompany",
            "letter.recipientCompany",
            "letter.recipientCompany.ph",
          )}
          {text(
            "recipientName",
            "letter.recipientName",
            "letter.recipientName.ph",
          )}
          {text(
            "recipientAddress",
            "letter.recipientAddress",
            "letter.recipientAddress.ph",
          )}
          {text(
            "recipientCity",
            "letter.recipientCity",
            "letter.recipientCity.ph",
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
          {t("letter.section.meta")}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {text("jobTitle", "letter.jobTitle", "letter.jobTitle.ph")}
          {text("vacancyRef", "letter.vacancyRef", "letter.vacancyRef.ph")}
          {text("date", "letter.date", "letter.date.ph")}
          <div className="sm:col-span-1">
            {text("subject", "letter.subject", "letter.subject.ph")}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
          {t("letter.section.body")}
        </h3>
        {area("opening", "letter.opening", "letter.opening.ph", 3)}
        {area("body", "letter.body", "letter.body.ph", 8)}
        {area("closing", "letter.closing", "letter.closing.ph", 3)}
      </section>
    </div>
  );
}
