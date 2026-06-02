"use client";

import * as React from "react";
import { useCVStore } from "@/lib/store";
import { CVTemplate } from "@/components/templates";

export function CVPreview({ scale }: { scale: number }) {
  const cv = useCVStore((s) => s.cv);
  return (
    <div className="flex items-start justify-center">
      <div
        className="origin-top"
        style={{ transform: `scale(${scale})`, width: `${794 * scale}px` }}
      >
        <div
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
          <CVTemplate cv={cv} />
        </div>
      </div>
    </div>
  );
}
