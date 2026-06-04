"use client";

import * as React from "react";
import { Plus, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT, useLocale } from "@/lib/i18n";
import {
  filterPresets,
  type Preset,
} from "@/lib/skills-data";

interface ChipPickerProps {
  presets: Preset[];
  selectedIds: string[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  labelOf: (id: string) => string;
  isPreset: (id: string) => boolean;
  placeholder?: string;
  emptyHint?: string;
}

export function ChipPicker({
  presets,
  selectedIds,
  onAdd,
  onRemove,
  labelOf,
  isPreset,
  placeholder,
  emptyHint,
}: ChipPickerProps) {
  const t = useT();
  const { locale } = useLocale();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listboxId = React.useId();

  const excluded = React.useMemo(
    () => new Set(selectedIds.filter(isPreset)),
    [selectedIds, isPreset],
  );

  const filtered = React.useMemo(
    () => filterPresets(presets, query, locale, excluded).slice(0, 40),
    [presets, query, locale, excluded],
  );

  const trimmed = query.trim();
  const canAddCustom =
    trimmed.length > 0 &&
    !selectedIds.some((id) => labelOf(id).toLowerCase() === trimmed.toLowerCase()) &&
    !filtered.some((p) => p[locale].toLowerCase() === trimmed.toLowerCase());

  const optionCount = filtered.length + (canAddCustom ? 1 : 0);

  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const clampedActiveIndex = Math.min(activeIndex, Math.max(0, optionCount - 1));

  function handleSelect(index: number) {
    if (index < filtered.length) {
      onAdd(filtered[index].id);
    } else if (canAddCustom) {
      onAdd(trimmed);
    } else {
      return;
    }
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(optionCount - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      if (!open || optionCount === 0) return;
      e.preventDefault();
      handleSelect(clampedActiveIndex);
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
      } else if (query) {
        e.preventDefault();
        setQuery("");
      }
    } else if (
      e.key === "Backspace" &&
      query === "" &&
      selectedIds.length > 0
    ) {
      e.preventDefault();
      onRemove(selectedIds[selectedIds.length - 1]);
    }
  }

  return (
    <div ref={containerRef} className="space-y-2">
      <div
        className="flex flex-wrap gap-1.5 rounded-md border border-[#e8e6df] bg-white p-2 focus-within:border-[#A3CBA9] focus-within:ring-2 focus-within:ring-[#A3CBA9]/30"
        onClick={() => inputRef.current?.focus()}
      >
        {selectedIds.map((id) => (
          <span
            key={id}
            className="inline-flex max-w-full items-center gap-1 rounded-full bg-[#A3CBA9]/20 px-2 py-1 text-xs font-medium text-[#1A1919]"
          >
            <span className="break-all">{labelOf(id)}</span>
            <button
              type="button"
              aria-label={`${t("picker.remove")} ${labelOf(id)}`}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(id);
              }}
              className="rounded-full text-[#3a3a3a] hover:bg-[#A3CBA9]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FA689]"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <div className="relative inline-flex min-w-[120px] flex-1 items-center">
          <Search className="pointer-events-none absolute left-1.5 h-3.5 w-3.5 text-[#9a9a9a]" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listboxId}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={placeholder ?? t("picker.search.ph")}
            className="w-full min-w-0 bg-transparent py-1 pl-6 pr-2 text-sm focus:outline-none"
          />
        </div>
      </div>

      {selectedIds.length === 0 && emptyHint && (
        <div className="text-xs text-[#9a9a9a]">{emptyHint}</div>
      )}

      {open && (filtered.length > 0 || canAddCustom) && (
        <div
          id={listboxId}
          role="listbox"
          className="max-h-64 overflow-auto rounded-md border border-[#e8e6df] bg-white shadow-lg"
        >
          {filtered.map((p, i) => (
            <button
              type="button"
              key={p.id}
              role="option"
              aria-selected={i === clampedActiveIndex}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => handleSelect(i)}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-[#F0EFEA]",
                i === clampedActiveIndex && "bg-[#F0EFEA]",
              )}
            >
              <span className="break-words">{p[locale]}</span>
              <Plus className="h-3.5 w-3.5 text-[#7FA689]" />
            </button>
          ))}
          {canAddCustom && (
            <button
              type="button"
              role="option"
              aria-selected={clampedActiveIndex === filtered.length}
              onMouseEnter={() => setActiveIndex(filtered.length)}
              onClick={() => handleSelect(filtered.length)}
              className={cn(
                "flex w-full items-center justify-between border-t border-[#f0efea] px-3 py-2 text-left text-sm hover:bg-[#F0EFEA]",
                clampedActiveIndex === filtered.length && "bg-[#F0EFEA]",
              )}
            >
              <span className="flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-[#7FA689]" />
                <span className="break-all">
                  {t("picker.addCustom").replace("{q}", trimmed)}
                </span>
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
