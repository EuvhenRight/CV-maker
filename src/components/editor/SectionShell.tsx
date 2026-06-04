"use client";

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

interface SectionShellProps {
  id: string;
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SectionShell({
  id,
  title,
  count,
  defaultOpen = true,
  children,
}: SectionShellProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const t = useT();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="rounded-lg border border-[#e8e6df] bg-white shadow-sm"
    >
      <div className="flex items-center gap-1 px-2 py-2">
        <button
          type="button"
          className="cursor-grab touch-none rounded p-1 text-neutral-400 hover:bg-[#f0efea] hover:text-neutral-700 active:cursor-grabbing"
          aria-label={t("section.dragAria")}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("section.toggleAria")}
          aria-expanded={open}
          className="flex flex-1 items-center justify-between rounded px-2 py-1 text-left hover:bg-[#fafaf7]"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            {open ? (
              <ChevronDown className="h-4 w-4 text-neutral-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-neutral-400" />
            )}
            {title}
            {typeof count === "number" && (
              <span className="rounded-full bg-[#f0efea] px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                {count}
              </span>
            )}
          </span>
        </button>
      </div>
      <div
        className={cn(
          "border-t border-[#f0efea] px-3 pb-4 pt-3 sm:px-4",
          !open && "hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
}
