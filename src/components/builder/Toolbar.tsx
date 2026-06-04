"use client";

import * as React from "react";
import { Download, FilePlus, Languages, RotateCcw, Wand2 } from "lucide-react";
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
import {
  LOCALES,
  LOCALE_LABELS,
  useLocale,
  type Locale,
} from "@/lib/i18n";
import { downloadCVAsPdf } from "@/lib/pdf";

const ACCENTS = [
  "#A3CBA9",
  "#7FA689",
  "#0087FF",
  "#F77B69",
  "#1F2933",
  "#B91C1C",
];

interface ToolbarProps {
  printTargetRef?: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export function Toolbar({ printTargetRef, fileName }: ToolbarProps) {
  const template = useCVStore((s) => s.cv.template);
  const accent = useCVStore((s) => s.cv.accentColor);
  const setTemplate = useCVStore((s) => s.setTemplate);
  const setAccent = useCVStore((s) => s.setAccent);
  const reset = useCVStore((s) => s.reset);
  const loadSample = useCVStore((s) => s.loadSample);
  const { locale, setLocale, t } = useLocale();
  const [downloading, setDownloading] = React.useState(false);

  const classic = TEMPLATE_IDS.filter(
    (id) => TEMPLATE_META[id].category === "classic",
  );
  const industry = TEMPLATE_IDS.filter(
    (id) => TEMPLATE_META[id].category === "industry",
  );

  async function handleDownload() {
    const node = printTargetRef?.current;
    if (!node || downloading) {
      window.print();
      return;
    }
    try {
      setDownloading(true);
      await downloadCVAsPdf(node, { fileName: fileName?.trim() || "cv" });
    } catch (err) {
      console.error(err);
      alert(t("toolbar.downloadError"));
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="no-print sticky top-0 z-30 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-[#e8e6df] bg-[#F0EFEA]/90 px-3 py-3 backdrop-blur sm:px-4">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 font-display text-base font-bold tracking-tight text-[#1A1919] sm:text-lg"
      >
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ background: "#A3CBA9" }}
        />
        Maak<span className="text-[#7FA689]">MijnCV</span>
      </Link>

      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden text-xs text-[#6b6b6b] sm:inline">
          {t("toolbar.template")}
        </span>
        <Select
          value={template}
          onValueChange={(v) => setTemplate(v as TemplateId)}
        >
          <SelectTrigger
            className="h-9 w-[180px] rounded-full sm:w-[210px]"
            aria-label={t("toolbar.template")}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("toolbar.classicGroup")}</SelectLabel>
              {classic.map((id) => (
                <SelectItem key={id} value={id}>
                  {TEMPLATE_META[id].name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>{t("toolbar.industryGroup")}</SelectLabel>
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
        <span className="hidden text-xs text-[#6b6b6b] sm:inline">
          {t("toolbar.accent")}
        </span>
        <div className="flex items-center gap-1">
          {ACCENTS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`${t("toolbar.accent")} ${c}`}
              onClick={() => setAccent(c)}
              className="h-6 w-6 shrink-0 rounded-full border border-[#e8e6df] transition-transform hover:scale-110"
              style={{
                background: c,
                outline: accent === c ? "2px solid #1A1919" : undefined,
                outlineOffset: 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Select
          value={locale}
          onValueChange={(v) => setLocale(v as Locale)}
        >
          <SelectTrigger
            className="h-9 w-[120px] rounded-full"
            aria-label={t("toolbar.language")}
          >
            <Languages className="mr-1 h-3.5 w-3.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LOCALES.map((l) => (
              <SelectItem key={l} value={l}>
                {LOCALE_LABELS[l]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={loadSample}
          className="hidden sm:inline-flex"
        >
          <Wand2 className="h-4 w-4" />
          {t("toolbar.example")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm(t("toolbar.confirmClear"))) reset();
          }}
          className="hidden sm:inline-flex"
        >
          <RotateCcw className="h-4 w-4" />
          {t("toolbar.clear")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <FilePlus className="h-4 w-4" />
          <span className="hidden sm:inline">{t("toolbar.print")}</span>
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDownload}
          disabled={downloading}
          aria-busy={downloading}
        >
          <Download className="h-4 w-4" />
          {downloading ? t("toolbar.downloading") : t("toolbar.download")}
        </Button>
      </div>
    </div>
  );
}
