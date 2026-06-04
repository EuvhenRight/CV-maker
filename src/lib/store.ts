"use client";

import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  type StateStorage,
} from "zustand/middleware";
import { ensureSessionFresh, touchSession } from "./session";
import type {
  CV,
  CertificationItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PersonalInfo,
  ProjectItem,
  SectionKey,
  TemplateId,
} from "./cv-types";
import { uid } from "./utils";
import { makeEmptyCV, makeSampleCV } from "./sample-cv";

interface CVStore {
  cv: CV;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;

  setTemplate: (t: TemplateId) => void;
  setAccent: (c: string) => void;

  updatePersonal: (patch: Partial<PersonalInfo>) => void;
  updateSummary: (s: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (from: number, to: number) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  addSkill: (id: string) => void;
  removeSkill: (id: string) => void;
  setSkills: (items: string[]) => void;

  addStrength: (id: string) => void;
  removeStrength: (id: string) => void;
  setStrengths: (items: string[]) => void;

  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;

  addCertification: () => void;
  updateCertification: (
    id: string,
    patch: Partial<CertificationItem>,
  ) => void;
  removeCertification: (id: string) => void;

  reorderSections: (next: SectionKey[]) => void;
  reset: () => void;
  loadSample: () => void;
  loadCV: (cv: CV) => void;
}

function patchItem<T extends { id: string }>(
  list: T[],
  id: string,
  patch: Partial<T>,
): T[] {
  return list.map((it) => (it.id === id ? { ...it, ...patch } : it));
}

const expiringLocalStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    ensureSessionFresh();
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(name, value);
    } catch {}
    touchSession();
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(name);
    } catch {}
  },
};

function uniqueAppend(list: string[], next: string): string[] {
  const trimmed = next.trim();
  if (!trimmed) return list;
  if (list.some((x) => x.toLowerCase() === trimmed.toLowerCase())) return list;
  return [...list, trimmed];
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cv: makeEmptyCV(),
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      setTemplate: (t) => set((s) => ({ cv: { ...s.cv, template: t } })),
      setAccent: (c) => set((s) => ({ cv: { ...s.cv, accentColor: c } })),

      updatePersonal: (patch) =>
        set((s) => ({
          cv: { ...s.cv, personal: { ...s.cv.personal, ...patch } },
        })),
      updateSummary: (summary) => set((s) => ({ cv: { ...s.cv, summary } })),

      addExperience: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: [
              ...s.cv.experience,
              {
                id: uid("exp"),
                company: "",
                role: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                bullets: [""],
              },
            ],
          },
        })),
      updateExperience: (id, patch) =>
        set((s) => ({
          cv: { ...s.cv, experience: patchItem(s.cv.experience, id, patch) },
        })),
      removeExperience: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: s.cv.experience.filter((e) => e.id !== id),
          },
        })),
      reorderExperience: (from, to) =>
        set((s) => {
          const arr = [...s.cv.experience];
          const [it] = arr.splice(from, 1);
          arr.splice(to, 0, it);
          return { cv: { ...s.cv, experience: arr } };
        }),

      addEducation: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: [
              ...s.cv.education,
              {
                id: uid("edu"),
                school: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          },
        })),
      updateEducation: (id, patch) =>
        set((s) => ({
          cv: { ...s.cv, education: patchItem(s.cv.education, id, patch) },
        })),
      removeEducation: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: s.cv.education.filter((e) => e.id !== id),
          },
        })),

      addSkill: (id) =>
        set((s) => ({ cv: { ...s.cv, skills: uniqueAppend(s.cv.skills, id) } })),
      removeSkill: (id) =>
        set((s) => ({
          cv: { ...s.cv, skills: s.cv.skills.filter((x) => x !== id) },
        })),
      setSkills: (items) => set((s) => ({ cv: { ...s.cv, skills: items } })),

      addStrength: (id) =>
        set((s) => ({
          cv: { ...s.cv, strengths: uniqueAppend(s.cv.strengths, id) },
        })),
      removeStrength: (id) =>
        set((s) => ({
          cv: { ...s.cv, strengths: s.cv.strengths.filter((x) => x !== id) },
        })),
      setStrengths: (items) =>
        set((s) => ({ cv: { ...s.cv, strengths: items } })),

      addProject: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: [
              ...s.cv.projects,
              {
                id: uid("pr"),
                name: "",
                link: "",
                description: "",
                bullets: [],
              },
            ],
          },
        })),
      updateProject: (id, patch) =>
        set((s) => ({
          cv: { ...s.cv, projects: patchItem(s.cv.projects, id, patch) },
        })),
      removeProject: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: s.cv.projects.filter((e) => e.id !== id),
          },
        })),

      addLanguage: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: [
              ...s.cv.languages,
              { id: uid("ln"), name: "", level: "" },
            ],
          },
        })),
      updateLanguage: (id, patch) =>
        set((s) => ({
          cv: { ...s.cv, languages: patchItem(s.cv.languages, id, patch) },
        })),
      removeLanguage: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: s.cv.languages.filter((e) => e.id !== id),
          },
        })),

      addCertification: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            certifications: [
              ...s.cv.certifications,
              {
                id: uid("ct"),
                name: "",
                issuer: "",
                date: "",
                link: "",
              },
            ],
          },
        })),
      updateCertification: (id, patch) =>
        set((s) => ({
          cv: {
            ...s.cv,
            certifications: patchItem(s.cv.certifications, id, patch),
          },
        })),
      removeCertification: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            certifications: s.cv.certifications.filter((e) => e.id !== id),
          },
        })),

      reorderSections: (next) =>
        set((s) => ({ cv: { ...s.cv, sectionOrder: next } })),

      reset: () => set({ cv: makeEmptyCV() }),
      loadSample: () => set({ cv: makeSampleCV() }),
      loadCV: (cv) => set({ cv }),
    }),
    {
      name: "cybersoek:cv",
      version: 3,
      storage: createJSONStorage<unknown>(() => expiringLocalStorage),
      partialize: (s) => ({ cv: s.cv }),
      migrate: (persisted: unknown, version) => {
        const empty = makeEmptyCV();
        const p = persisted as { cv?: Record<string, unknown> } | null;
        if (!p?.cv) return { cv: empty };

        const raw = p.cv;
        const cv: CV = {
          ...empty,
          ...(raw as Partial<CV>),
          personal: {
            ...empty.personal,
            ...((raw.personal as Partial<PersonalInfo>) ?? {}),
          },
          strengths: Array.isArray(raw.strengths)
            ? (raw.strengths as string[])
            : [],
        };

        // v2 → v3: skills was SkillGroup[] {category, items}; flatten to string[]
        if (version < 3 && Array.isArray(raw.skills)) {
          const flat: string[] = [];
          for (const entry of raw.skills as Array<unknown>) {
            if (typeof entry === "string") {
              flat.push(entry);
            } else if (entry && typeof entry === "object") {
              const items =
                (entry as { items?: string }).items?.split(",") ?? [];
              for (const it of items) {
                const trimmed = it.trim();
                if (trimmed && !flat.includes(trimmed)) flat.push(trimmed);
              }
            }
          }
          cv.skills = flat;
        }

        if (version < 2 && (cv.accentColor === "#4f46e5" || !cv.accentColor)) {
          cv.accentColor = "#A3CBA9";
        }

        // ensure sectionOrder contains strengths
        if (!cv.sectionOrder.includes("strengths")) {
          const idx = cv.sectionOrder.indexOf("skills");
          const next = [...cv.sectionOrder];
          if (idx >= 0) next.splice(idx + 1, 0, "strengths");
          else next.push("strengths");
          cv.sectionOrder = next;
        }

        return { cv };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
