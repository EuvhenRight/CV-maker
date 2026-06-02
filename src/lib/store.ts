"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { uid } from "./utils";
import type {
  CV,
  CertificationItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PersonalInfo,
  ProjectItem,
  SectionKey,
  SkillGroup,
  TemplateId,
} from "./cv-types";
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

  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<SkillGroup>) => void;
  removeSkill: (id: string) => void;

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
}

function patchItem<T extends { id: string }>(
  list: T[],
  id: string,
  patch: Partial<T>,
): T[] {
  return list.map((it) => (it.id === id ? { ...it, ...patch } : it));
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

      addSkill: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: [
              ...s.cv.skills,
              { id: uid("sk"), category: "", items: "" },
            ],
          },
        })),
      updateSkill: (id, patch) =>
        set((s) => ({
          cv: { ...s.cv, skills: patchItem(s.cv.skills, id, patch) },
        })),
      removeSkill: (id) =>
        set((s) => ({
          cv: { ...s.cv, skills: s.cv.skills.filter((e) => e.id !== id) },
        })),

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
    }),
    {
      name: "makemycv:cv",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ cv: s.cv }),
      migrate: (persisted: unknown, version) => {
        const p = persisted as { cv?: Partial<CV> } | null;
        if (!p?.cv) return { cv: makeEmptyCV() };
        const cv: CV = {
          ...makeEmptyCV(),
          ...p.cv,
          personal: { ...makeEmptyCV().personal, ...(p.cv.personal ?? {}) },
        };
        if (version < 2 && (cv.accentColor === "#4f46e5" || !cv.accentColor)) {
          cv.accentColor = "#A3CBA9";
        }
        return { cv };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
