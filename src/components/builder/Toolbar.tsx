"use client";

import { Download, FilePlus, RotateCcw, Wand2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCVStore } from "@/lib/store";
import { TEMPLATE_META } from "@/components/templates";
import type { TemplateId } from "@/lib/cv-types";

const ACCENTS = ["#4f46e5", "#0f766e", "#b91c1c", "#0369a1", "#171717"];

export function Toolbar() {
  const template = useCVStore((s) => s.cv.template);
  const accent = useCVStore((s) => s.cv.accentColor);
  const setTemplate = useCVStore((s) => s.setTemplate);
  const setAccent = useCVStore((s) => s.setAccent);
  const reset = useCVStore((s) => s.reset);
  const loadSample = useCVStore((s) => s.loadSample);

  return (
    <div className="no-print sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur">
      <Link
        href="/"
        className="text-sm font-bold tracking-tight text-neutral-900"
      >
        Make<span className="text-indigo-600">MyCV</span>
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500">Template</span>
        <Select
          value={template}
          onValueChange={(v) => setTemplate(v as TemplateId)}
        >
          <SelectTrigger className="h-9 w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(TEMPLATE_META) as TemplateId[]).map((id) => (
              <SelectItem key={id} value={id}>
                {TEMPLATE_META[id].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500">Accent</span>
        <div className="flex items-center gap-1">
          {ACCENTS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Accent ${c}`}
              onClick={() => setAccent(c)}
              className="h-6 w-6 rounded-full border border-neutral-200 transition-transform hover:scale-110"
              style={{
                background: c,
                outline: accent === c ? "2px solid #111" : undefined,
                outlineOffset: 1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={loadSample}>
          <Wand2 className="h-4 w-4" />
          Load sample
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Clear all CV data? This cannot be undone.")) reset();
          }}
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <FilePlus className="h-4 w-4" />
          Print
        </Button>
        <Button variant="primary" size="sm" onClick={() => window.print()}>
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}
