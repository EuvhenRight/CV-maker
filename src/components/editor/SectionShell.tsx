"use client";

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

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
          aria-label="Drag to reorder section"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
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
      <div className={cn("border-t border-[#f0efea] px-4 pb-4 pt-3", !open && "hidden")}>
        {children}
      </div>
    </div>
  );
}
