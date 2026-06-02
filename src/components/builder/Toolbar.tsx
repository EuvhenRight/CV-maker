"use client";

import { Download, FilePlus, RotateCcw, Wand2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCVStore } from "@/lib/store";
import { TEMPLATE_IDS, TEMPLATE_META } from "@/components/templates";
import type { TemplateId } from "@/lib/cv-types";

const ACCENTS = [
  "#F77B69",
  "#E15F4B",
  "#0087FF",
  "#A3CBA9",
  "#1F2933",
  "#B91C1C",
];

export function Toolbar() {
  const template = useCVStore((s) => s.cv.template);
  const accent = useCVStore((s) => s.cv.accentColor);
  const setTemplate = useCVStore((s) => s.setTemplate);
  const setAccent = useCVStore((s) => s.setAccent);
  const reset = useCVStore((s) => s.reset);
  const loadSample = useCVStore((s) => s.loadSample);

  const classic = TEMPLATE_IDS.filter(
    (id) => TEMPLATE_META[id].category === "classic",
  );
  const industry = TEMPLATE_IDS.filter(
    (id) => TEMPLATE_META[id].category === "industry",
  );

  return (
    <div className="no-print sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-[#e8e6df] bg-[#F0EFEA]/90 px-4 py-3 backdrop-blur">
      <Link
        href="/"
        className="font-display text-lg font-bold tracking-tight text-[#1A1919]"
      >
        Make<span className="text-[#F77B69]">MyCV</span>
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[#6b6b6b]">Template</span>
        <Select
          value={template}
          onValueChange={(v) => setTemplate(v as TemplateId)}
        >
          <SelectTrigger className="h-9 w-[200px] rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Classic (no photo)</SelectLabel>
              {classic.map((id) => (
                <SelectItem key={id} value={id}>
                  {TEMPLATE_META[id].name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Industry (with photo)</SelectLabel>
              {industry.map((id) => (
                <SelectItem key={id} value={id}>
                  {TEMPLATE_META[id].name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[#6b6b6b]">Accent</span>
        <div className="flex items-center gap-1">
          {ACCENTS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Accent ${c}`}
              onClick={() => setAccent(c)}
              className="h-6 w-6 rounded-full border border-[#e8e6df] transition-transform hover:scale-110"
              style={{
                background: c,
                outline: accent === c ? "2px solid #1A1919" : undefined,
                outlineOffset: 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={loadSample}>
          <Wand2 className="h-4 w-4" />
          Sample
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
