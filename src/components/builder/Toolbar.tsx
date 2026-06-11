"use client";

import * as React from "react";
import {
  Download,
  FilePlus,
  ImageOff,
  Image as ImageOn,
  Languages,
  RotateCcw,
  Wand2,
} from "lucide-react";
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
import { cn } from "@/lib/utils";
import { downloadCoverLetterAsPdf, downloadCVAsPdf } from "@/lib/pdf";
import { ProfessionPicker } from "./ProfessionPicker";
import { BriefPicker } from "./BriefPicker";

export type BuilderMode = "cv" | "letter";

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
  letterPrintRef?: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
  mode: BuilderMode;
  onModeChange: (m: BuilderMode) => void;
}

export function Toolbar({
  printTargetRef,
  fileName,
  mode,
  onModeChange,
}: ToolbarProps) {
  const template = useCVStore((s) => s.cv.template);
  const accent = useCVStore((s) => s.cv.accentColor);
  const photoHidden = useCVStore((s) => s.cv.photoHidden ?? false);
  const setTemplate = useCVStore((s) => s.setTemplate);
  const setAccent = useCVStore((s) => s.setAccent);
  const setPhotoHidden = useCVStore((s) => s.setPhotoHidden);
  const reset = useCVStore((s) => s.reset);
  const { locale, setLocale, t } = useLocale();
  const [downloading, setDownloading] = React.useState(false);
  const templateHasPhoto = TEMPLATE_META[template]?.hasPhoto ?? false;
  const isLetter = mode === "letter";

  const classic = TEMPLATE_IDS.filter(
    (id) => TEMPLATE_META[id].category === "classic",
  );
  const industry = TEMPLATE_IDS.filter(
    (id) => TEMPLATE_META[id].category === "industry",
  );

  async function handleDownload() {
    if (downloading) return;
    const trimmed = fileName?.trim();
    try {
      setDownloading(true);
      if (isLetter) {
        const cv = useCVStore.getState().cv;
        const downloadName = trimmed ? `Brief_${trimmed}` : "Brief";
        await downloadCoverLetterAsPdf(cv, locale, { fileName: downloadName });
      } else {
        const node = printTargetRef?.current;
        if (!node) {
          window.print();
          return;
        }
        const downloadName = trimmed ? `CV_${trimmed}` : "CV";
        await downloadCVAsPdf(node, { fileName: downloadName });
      }
    } catch (err) {
      console.error(err);
      alert(t("toolbar.downloadError"));
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="no-print sticky top-0 z-30 flex flex-col gap-2 border-b border-[#e8e6df] bg-[#F0EFEA]/90 px-3 py-2 backdrop-blur sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2 sm:px-4 sm:py-3">
      <div className="flex items-center justify-between gap-2">
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

        <div className="flex items-center gap-1.5 sm:hidden">
          <Select
            value={locale}
            onValueChange={(v) => setLocale(v as Locale)}
          >
            <SelectTrigger
              className="h-8 w-[44px] rounded-full px-2"
              aria-label={t("toolbar.language")}
            >
              <Languages className="h-3.5 w-3.5" />
            </SelectTrigger>
            <SelectContent>
              {LOCALES.map((l) => (
                <SelectItem key={l} value={l}>
                  {LOCALE_LABELS[l]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex shrink-0 items-center rounded-full border border-[#e8e6df] bg-white p-0.5 text-xs font-semibold">
        <button
          type="button"
          onClick={() => onModeChange("cv")}
          aria-pressed={!isLetter}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            !isLetter
              ? "bg-[#1A1919] text-white"
              : "text-[#3a3a3a] hover:bg-[#f4f3ee]",
          )}
        >
          {t("tab.cv")}
        </button>
        <button
          type="button"
          onClick={() => onModeChange("letter")}
          aria-pressed={isLetter}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            isLetter
              ? "bg-[#1A1919] text-white"
              : "text-[#3a3a3a] hover:bg-[#f4f3ee]",
          )}
        >
          {t("tab.letter")}
        </button>
      </div>



      {!isLetter && (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="hidden text-xs text-[#6b6b6b] sm:inline">
            {t("toolbar.template")}
          </span>
          <Select
            value={template}
            onValueChange={(v) => setTemplate(v as TemplateId)}
          >
            <SelectTrigger
              className="h-9 w-full min-w-0 rounded-full sm:w-[210px]"
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
      )}

      {!isLetter && (
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-[#6b6b6b] sm:inline">
            {t("toolbar.accent")}
          </span>
          <div className="flex shrink-0 items-center gap-1">
            {ACCENTS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`${t("toolbar.accent")} ${c}`}
                onClick={() => setAccent(c)}
                className="h-5 w-5 shrink-0 rounded-full border border-[#e8e6df] transition-transform hover:scale-110 sm:h-6 sm:w-6"
                style={{
                  background: c,
                  outline: accent === c ? "2px solid #1A1919" : undefined,
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
        <div className="hidden sm:block">
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
        </div>

        {!isLetter && templateHasPhoto && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPhotoHidden(!photoHidden)}
            aria-pressed={photoHidden}
            aria-label={
              photoHidden ? t("toolbar.photo.show") : t("toolbar.photo.hide")
            }
            title={
              photoHidden ? t("toolbar.photo.show") : t("toolbar.photo.hide")
            }
          >
            {photoHidden ? (
              <ImageOff className="h-4 w-4" />
            ) : (
              <ImageOn className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{t("toolbar.photo")}</span>
          </Button>
        )}

        {isLetter ? (
          <BriefPicker
            trigger={
              <Button
                variant="ghost"
                size="sm"
                aria-label={t("toolbar.examples")}
              >
                <Wand2 className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {t("toolbar.examples")}
                </span>
              </Button>
            }
          />
        ) : (
          <ProfessionPicker
            trigger={
              <Button
                variant="ghost"
                size="sm"
                aria-label={t("toolbar.examples")}
              >
                <Wand2 className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {t("toolbar.examples")}
                </span>
              </Button>
            }
          />
        )}

        {!isLetter && (
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
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          aria-label={t("toolbar.print")}
        >
          <FilePlus className="h-4 w-4" />
          <span className="hidden sm:inline">{t("toolbar.print")}</span>
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDownload}
          disabled={downloading}
          aria-busy={downloading}
          aria-label={
            isLetter ? t("toolbar.downloadLetter") : t("toolbar.download")
          }
          className="ml-auto sm:ml-0"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">
            {downloading
              ? t("toolbar.downloading")
              : isLetter
                ? t("toolbar.downloadLetter")
                : t("toolbar.download")}
          </span>
        </Button>
      </div>
    </div>
  );
}

