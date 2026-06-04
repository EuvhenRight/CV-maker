"use client";

import * as React from "react";
import { useCVStore } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import { CVTemplate } from "@/components/templates";

interface CVPreviewProps {
  scale: number;
  innerRef?: React.Ref<HTMLDivElement>;
}

const PAGE_W = 794;
const PAGE_H = 1123;

export function CVPreview({ scale, innerRef }: CVPreviewProps) {
  const cv = useCVStore((s) => s.cv);
  const { locale } = useLocale();
  return (
    <div className="flex justify-center">
      <div
        className="relative max-w-full"
        style={{
          width: `${PAGE_W * scale}px`,
          height: `${PAGE_H * scale}px`,
        }}
      >
        <div
          ref={innerRef}
          id="cv-page"
          className="cv-page bg-white shadow-md"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${PAGE_W}px`,
            minHeight: `${PAGE_H}px`,
            color: "#171717",
            display: "flex",
            flexDirection: "column",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <CVTemplate cv={cv} lang={locale} />
        </div>
      </div>
    </div>
  );
}
