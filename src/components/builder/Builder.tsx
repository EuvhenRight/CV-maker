"use client";

import * as React from "react";
import { Pencil, Eye } from "lucide-react";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { trackAnalyticsEvent } from "@/lib/analytics-client";
import { Toolbar } from "./Toolbar";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { CVPreview } from "@/components/preview/CVPreview";

type MobileView = "edit" | "preview";

export function Builder() {
  const hydrated = useCVStore((s) => s.hydrated);
  const fullName = useCVStore((s) => s.cv.personal.fullName);
  const t = useT();
  const [scale, setScale] = React.useState(0.6);
  const [mobileView, setMobileView] = React.useState<MobileView>("edit");
  const previewWrapperRef = React.useRef<HTMLDivElement>(null);
  const printRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    function onAfterPrint() {
      void trackAnalyticsEvent("print");
    }
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    function fit() {
      const w = window.innerWidth;
      const wrapper = previewWrapperRef.current;
      let availableWidth = wrapper?.clientWidth ?? 0;
      if (availableWidth <= 0) {
        // Wrapper hidden (other tab active). Estimate from viewport.
        availableWidth = w < 1024 ? w : Math.max(w - 540, 400);
      }
      // Inner padding: px-3 (=24px) on mobile, px-6 (=48px) from sm up.
      const padding = w < 640 ? 24 : 48;
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
  }, [mobileView]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F0EFEA]">
      <Toolbar printTargetRef={printRef} fileName={fullName} />

      <div className="no-print flex items-center gap-1 border-b border-[#e8e6df] bg-[#F0EFEA]/80 px-3 py-2 sm:px-4 lg:hidden">
        <MobileTab
          active={mobileView === "edit"}
          onClick={() => setMobileView("edit")}
          icon={<Pencil className="h-3.5 w-3.5" />}
          label={t("builder.tab.edit")}
        />
        <MobileTab
          active={mobileView === "preview"}
          onClick={() => setMobileView("preview")}
          icon={<Eye className="h-3.5 w-3.5" />}
          label={t("builder.tab.preview")}
        />
      </div>

      <div className="no-print flex-1 lg:grid lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)]">
        <aside
          className={cn(
            "min-w-0 border-[#e8e6df] bg-white lg:block lg:border-r",
            mobileView === "edit" ? "block" : "hidden lg:block",
          )}
        >
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
        <main
          className={cn(
            "relative min-w-0 lg:block",
            mobileView === "preview" ? "block" : "hidden lg:block",
          )}
        >
          <div
            ref={previewWrapperRef}
            className="lg:sticky lg:top-[68px] lg:max-h-[calc(100vh-72px)] lg:overflow-auto"
          >
            <div className="px-3 py-4 sm:px-6 lg:py-6">
              <CVPreview scale={scale} />
            </div>
          </div>
        </main>
      </div>

      <div
        aria-hidden="true"
        className="no-print pointer-events-none fixed -left-[10000px] top-0 select-none opacity-0"
      >
        <CVPreview scale={1} innerRef={printRef} />
      </div>

      <div className="print-only">
        <CVPreview scale={1} />
      </div>
    </div>
  );
}

function MobileTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "bg-[#1A1919] text-white shadow-sm"
          : "bg-white text-[#3a3a3a] hover:bg-[#fafaf7]",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
