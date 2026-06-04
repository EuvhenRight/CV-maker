"use client";

import * as React from "react";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Toolbar } from "./Toolbar";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { CVPreview } from "@/components/preview/CVPreview";

export function Builder() {
  const hydrated = useCVStore((s) => s.hydrated);
  const fullName = useCVStore((s) => s.cv.personal.fullName);
  const t = useT();
  const [scale, setScale] = React.useState(0.6);
  const previewWrapperRef = React.useRef<HTMLDivElement>(null);
  const printRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    function fit() {
      const wrapper = previewWrapperRef.current;
      const availableWidth = wrapper
        ? wrapper.clientWidth
        : window.innerWidth;
      const w = window.innerWidth;
      const padding = w < 640 ? 16 : 32;
      const target = (availableWidth - padding) / 794;
      const next = Math.max(0.35, Math.min(0.95, target));
      setScale(next);
    }
    fit();
    const ro = new ResizeObserver(fit);
    if (previewWrapperRef.current) ro.observe(previewWrapperRef.current);
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F0EFEA]">
      <Toolbar printTargetRef={printRef} fileName={fullName} />
      <div className="no-print grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)]">
        <aside className="min-w-0 border-r border-[#e8e6df] bg-white">
          <div className="mx-auto max-w-2xl space-y-4 px-3 py-5 sm:px-5">
            {!hydrated && (
              <div
                className="rounded-md bg-[#FFF6E6] px-3 py-2 text-xs text-[#8a6a00]"
                role="status"
              >
                {t("builder.loading")}
              </div>
            )}
            <EditorPanel />
            <p className="pt-3 text-center text-xs text-[#9a9a9a]">
              {t("builder.localStorage")}
            </p>
          </div>
        </aside>
        <main className="relative min-w-0">
          <div
            ref={previewWrapperRef}
            className="lg:sticky lg:top-[68px] lg:max-h-[calc(100vh-72px)] lg:overflow-auto"
          >
            <div className="px-3 py-4 sm:px-6 lg:py-6">
              <CVPreview scale={scale} innerRef={printRef} />
            </div>
          </div>
        </main>
      </div>
      <div className="print-only">
        <CVPreview scale={1} />
      </div>
    </div>
  );
}
