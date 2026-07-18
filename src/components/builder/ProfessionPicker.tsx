"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Boxes,
  Briefcase,
  ChefHat,
  Factory,
  HardHat,
  Home,
  ShoppingBag,
  Sparkles,
  Truck,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCVStore } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import {
  PROFESSIONS,
  buildProfessionCV,
  type ProfessionId,
} from "@/lib/profession-templates";

const ICONS: Record<ProfessionId, LucideIcon> = {
  cleaner: Sparkles,
  warehouse: Boxes,
  retail: ShoppingBag,
  housekeeper: Home,
  "kitchen-assistant": ChefHat,
  logistics: Truck,
  plumber: Wrench,
  construction: HardHat,
  admin: Briefcase,
  production: Factory,
};

interface ProfessionPickerProps {
  trigger: React.ReactNode;
}

export function ProfessionPicker({ trigger }: ProfessionPickerProps) {
  const { locale, t } = useLocale();
  const loadExample = useCVStore((s) => s.loadExample);
  const hasContent = useCVStore((s) => hasMeaningfulContent(s));
  const [open, setOpen] = React.useState(false);

  function onPick(id: ProfessionId) {
    if (hasContent && !confirm(t("prof.dialog.confirmReplace"))) return;
    loadExample(buildProfessionCV(id, locale));
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[min(960px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-[#e8e6df] bg-white shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#f0efea] px-5 py-4 sm:px-6">
            <div>
              <Dialog.Title className="font-display text-lg font-bold text-[#1A1919]">
                {t("prof.dialog.title")}
              </Dialog.Title>
              <Dialog.Description className="mt-1 max-w-xl text-xs text-[#6b6b6b] sm:text-sm">
                {t("prof.dialog.subtitle")}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={t("prof.dialog.close")}
              className="rounded-full p-1.5 text-[#6b6b6b] hover:bg-[#f0efea] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3CBA9]"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <div className="grid grid-cols-1 gap-3 overflow-auto px-5 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {PROFESSIONS.map((p) => {
              const Icon = ICONS[p.id];
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onPick(p.id)}
                  className="group flex flex-col items-start gap-2 rounded-xl border border-[#e8e6df] bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#A3CBA9] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3CBA9]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#A3CBA9]/20 text-[#5b8166] group-hover:bg-[#A3CBA9]/35">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm font-semibold text-[#1A1919]">
                    {t(p.nameKey)}
                  </span>
                  <span className="text-xs leading-relaxed text-[#6b6b6b]">
                    {t(p.taglineKey)}
                  </span>
                  <span className="mt-auto pt-2 text-xs font-semibold text-[#7FA689] group-hover:underline">
                    {t("prof.dialog.useTemplate")} →
                  </span>
                </button>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function hasMeaningfulContent(state: ReturnType<typeof useCVStore.getState>): boolean {
  const cv = state.cv;
  if (!state.hydrated) return false;
  if (cv.personal.fullName.trim()) return true;
  if (cv.summary.trim()) return true;
  if (cv.experience.length > 0) return true;
  if (cv.education.length > 0) return true;
  if (cv.skills.length > 0) return true;
  if (cv.strengths.length > 0) return true;
  return false;
}
