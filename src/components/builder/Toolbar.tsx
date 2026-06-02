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
  "#A3CBA9",
  "#7FA689",
  "#0087FF",
  "#F77B69",
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
        className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-[#1A1919]"
      >
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ background: "#A3CBA9" }}
        />
        Cybersoek
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[#6b6b6b]">Template</span>
        <Select
          value={template}
          onValueChange={(v) => setTemplate(v as TemplateId)}
        >
          <SelectTrigger className="h-9 w-[210px] rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Klassiek (zonder foto)</SelectLabel>
              {classic.map((id) => (
                <SelectItem key={id} value={id}>
                  {TEMPLATE_META[id].name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Branche (met foto)</SelectLabel>
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
          Voorbeeld
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Alle CV-gegevens wissen? Dit kan niet ongedaan worden gemaakt."))
              reset();
          }}
        >
          <RotateCcw className="h-4 w-4" />
          Wissen
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
