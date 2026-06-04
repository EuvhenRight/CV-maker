"use client";

import * as React from "react";
import { useCVStore } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import { CVTemplate } from "@/components/templates";

interface CVPreviewProps {
  scale: number;
  innerRef?: React.Ref<HTMLDivElement>;
}

export function CVPreview({ scale, innerRef }: CVPreviewProps) {
  const cv = useCVStore((s) => s.cv);
  const { locale } = useLocale();
  return (
    <div className="flex items-start justify-center">
      <div
        className="origin-top"
        style={{
          transform: `scale(${scale})`,
          width: `${794 * scale}px`,
          height: `${1123 * scale}px`,
        }}
      >
        <div
          ref={innerRef}
          id="cv-page"
          className="cv-page bg-white shadow-md"
          style={{
            width: "794px",
            minHeight: "1123px",
            color: "#171717",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CVTemplate cv={cv} lang={locale} />
        </div>
      </div>
    </div>
  );
}
