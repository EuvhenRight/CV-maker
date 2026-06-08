"use client";

import * as React from "react";
import { useCVStore } from "@/lib/store";
import { useLocale, translate } from "@/lib/i18n";
import { makeEmptyCoverLetter } from "@/lib/sample-cv";
import type { CoverLetter, PersonalInfo } from "@/lib/cv-types";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

interface CoverLetterPreviewProps {
  scale?: number;
  innerRef?: React.Ref<HTMLDivElement>;
}

function isLetterEmpty(letter: CoverLetter): boolean {
  return Object.values(letter).every((v) => !v);
}

function senderLines(p: PersonalInfo): string[] {
  return [p.fullName, p.location, p.phone, p.email].filter(Boolean) as string[];
}

export function CoverLetterPreview({
  scale = 1,
  innerRef,
}: CoverLetterPreviewProps) {
  const cv = useCVStore((s) => s.cv);
  const letter = cv.coverLetter ?? makeEmptyCoverLetter();
  const { locale } = useLocale();

  if (isLetterEmpty(letter)) {
    return (
      <div
        ref={innerRef}
        className="bg-white shadow-md"
        style={{
          width: A4_WIDTH_PX,
          minHeight: A4_HEIGHT_PX,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          margin: "0 auto",
        }}
      >
        <div className="flex h-full min-h-[1123px] items-center justify-center p-20 text-center text-[13px] leading-relaxed text-[#7a7a7a]">
          {translate(locale, "letter.empty")}
        </div>
      </div>
    );
  }

  const recipientBlock = [
    letter.recipientCompany,
    letter.recipientName ? `T.a.v. ${letter.recipientName}` : "",
    letter.recipientAddress,
    letter.recipientCity,
  ].filter(Boolean);

  const sender = senderLines(cv.personal);
  const salutation = letter.recipientName
    ? `${translate(locale, "letter.salutation")} ${letter.recipientName},`
    : `${translate(locale, "letter.salutation")} heer/mevrouw,`;
  const signoff = translate(locale, "letter.signoff");

  return (
    <div
      ref={innerRef}
      className="bg-white shadow-md"
      style={{
        width: A4_WIDTH_PX,
        minHeight: A4_HEIGHT_PX,
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        margin: "0 auto",
      }}
    >
      <article
        className="flex flex-col p-20 text-[12.5px] leading-relaxed text-[#1a1a1a]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {sender.length > 0 && (
          <div className="mb-8 self-end text-right text-[11.5px] text-[#3a3a3a]">
            {sender.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div>
        )}

        {recipientBlock.length > 0 && (
          <div className="mb-6">
            {recipientBlock.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div>
        )}

        {letter.date && <div className="mb-6">{letter.date}</div>}

        {letter.subject && (
          <div className="mb-4">
            <strong>Betreft:</strong> {letter.subject}
            {letter.vacancyRef && (
              <span className="ml-2 text-[#5a5a5a]">
                ({letter.vacancyRef})
              </span>
            )}
          </div>
        )}

        <div className="mb-4">{salutation}</div>

        {letter.opening && (
          <p className="mb-4 whitespace-pre-wrap">{letter.opening}</p>
        )}

        {letter.body && (
          <p className="mb-4 whitespace-pre-wrap">{letter.body}</p>
        )}

        {letter.closing && (
          <p className="mb-6 whitespace-pre-wrap">{letter.closing}</p>
        )}

        <div className="mb-2">{signoff}</div>
        <div className="mt-12">
          <div className="font-semibold">{cv.personal.fullName}</div>
          {cv.personal.title && (
            <div className="text-[11.5px] text-[#5a5a5a]">
              {cv.personal.title}
            </div>
          )}
        </div>

        <div className="mt-auto pt-8 text-[10px] text-[#9a9a9a]">
          {translate(locale, "letter.attached")}
        </div>
      </article>
    </div>
  );
}
