"use client";

import * as React from "react";
import { useCVStore } from "@/lib/store";
import { Toolbar } from "./Toolbar";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { CVPreview } from "@/components/preview/CVPreview";

export function Builder() {
  const hydrated = useCVStore((s) => s.hydrated);
  const [scale, setScale] = React.useState(0.75);

  React.useEffect(() => {
    function fit() {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 768) setScale(Math.min(1, (w - 32) / 794));
      else if (w < 1280) setScale(0.62);
      else if (w < 1536) setScale(0.72);
      else setScale(0.8);
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Toolbar />
      <div className="no-print grid flex-1 grid-cols-1 gap-0 lg:grid-cols-[minmax(0,560px)_1fr]">
        <aside className="border-r border-neutral-200 bg-white">
          <div className="mx-auto max-w-2xl space-y-4 p-5">
            {!hydrated && (
              <div className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
                Loading your saved CV…
              </div>
            )}
            <EditorPanel />
            <p className="pt-3 text-center text-xs text-neutral-400">
              Autosaved locally · No account needed
            </p>
          </div>
        </aside>
        <main className="overflow-auto p-6">
          <CVPreview scale={scale} />
        </main>
      </div>
      <div className="print-only">
        <CVPreview scale={1} />
      </div>
    </div>
  );
}
