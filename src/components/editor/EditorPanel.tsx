"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCVStore } from "@/lib/store";
import { SECTION_LABELS, type SectionKey } from "@/lib/cv-types";
import { SectionShell } from "./SectionShell";
import { PersonalSection } from "./sections/PersonalSection";
import { SummarySection } from "./sections/SummarySection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { CertificationsSection } from "./sections/CertificationsSection";

const SECTION_COMPONENTS: Record<SectionKey, React.ComponentType> = {
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  languages: LanguagesSection,
  certifications: CertificationsSection,
};

function useSectionCount(key: SectionKey) {
  return useCVStore((s) => {
    if (key === "summary") return s.cv.summary ? 1 : 0;
    const list = s.cv[key];
    return Array.isArray(list) ? list.length : 0;
  });
}

function SortableSection({ id }: { id: SectionKey }) {
  const Comp = SECTION_COMPONENTS[id];
  const count = useSectionCount(id);
  return (
    <SectionShell id={id} title={SECTION_LABELS[id]} count={count}>
      <Comp />
    </SectionShell>
  );
}

export function EditorPanel() {
  const sectionOrder = useCVStore((s) => s.cv.sectionOrder);
  const reorderSections = useCVStore((s) => s.reorderSections);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = sectionOrder.indexOf(active.id as SectionKey);
    const to = sectionOrder.indexOf(over.id as SectionKey);
    if (from < 0 || to < 0) return;
    reorderSections(arrayMove(sectionOrder, from, to));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-neutral-900">
            Personal info
          </h2>
        </div>
        <div className="p-4">
          <PersonalSection />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {sectionOrder.map((key) => (
              <SortableSection key={key} id={key} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
