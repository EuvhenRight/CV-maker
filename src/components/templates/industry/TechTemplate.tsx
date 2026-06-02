import type { CV, SectionKey } from "@/lib/cv-types";
import {
  CertificationsBlock,
  EducationBlock,
  ExperienceBlock,
  LanguagesBlock,
  PageFooter,
  PhotoFrame,
  ProjectsBlock,
  SkillsBlock,
  SummaryBlock,
  type BlockOpts,
} from "../blocks";
import { contactLine } from "../shared";

const SIDE: SectionKey[] = ["skills", "languages", "certifications"];

export function TechTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = {
    accent,
    heading: "bold-large",
    textColor: "#1a1919",
    mutedColor: "#7a7a7a",
  };
  const sideOpts: BlockOpts = {
    accent: "#ffffff",
    heading: "uppercase-thin",
    textColor: "#e8eaed",
    mutedColor: "#9ba0a8",
  };

  const main = cv.sectionOrder.filter((k) => !SIDE.includes(k));
  const side = cv.sectionOrder.filter((k) => SIDE.includes(k));

  return (
    <article
      className="grid flex-1"
      style={{
        gridTemplateColumns: "230px 1fr",
        gap: "0",
      }}
    >
      <aside
        className="flex flex-col gap-5 p-6 text-[12px] text-white"
        style={{ background: "#101418" }}
      >
        <div className="flex justify-center">
          <PhotoFrame
            src={cv.personal.photo}
            size={148}
            shape="circle"
            borderColor={accent}
          />
        </div>
        <div className="space-y-0.5 text-center">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {"// contact"}
          </div>
          {cv.personal.email && <div>{cv.personal.email}</div>}
          {cv.personal.phone && <div>{cv.personal.phone}</div>}
          {cv.personal.location && <div>{cv.personal.location}</div>}
          {cv.personal.website && <div>{cv.personal.website}</div>}
          {cv.personal.linkedin && <div>{cv.personal.linkedin}</div>}
        </div>
        {side.map((k) => (
          <div key={k}>
            {k === "skills" && (
              <SkillsBlock cv={cv} opts={sideOpts} chips />
            )}
            {k === "languages" && (
              <LanguagesBlock cv={cv} opts={sideOpts} stacked />
            )}
            {k === "certifications" && (
              <CertificationsBlock cv={cv} opts={sideOpts} />
            )}
          </div>
        ))}
      </aside>
      <div className="flex flex-col p-8">
        <header className="mb-5">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            $ whoami
          </div>
          <h1 className="font-display text-[28px] font-extrabold leading-tight">
            {cv.personal.fullName || "Jouw naam"}
          </h1>
          {cv.personal.title && (
            <div className="text-[14px]" style={{ color: accent }}>
              {cv.personal.title}
            </div>
          )}
        </header>
        <div className="my-auto space-y-5">
          {main.map((k) => {
            if (k === "summary") return <SummaryBlock key={k} cv={cv} opts={opts} title="// samenvatting" />;
            if (k === "experience") return <ExperienceBlock key={k} cv={cv} opts={opts} title="// werkervaring" />;
            if (k === "education") return <EducationBlock key={k} cv={cv} opts={opts} title="// opleiding" />;
            if (k === "projects") return <ProjectsBlock key={k} cv={cv} opts={opts} title="// projecten" />;
            return null;
          })}
        </div>
        {contactLine(cv).length === 0 && (
          <div className="mt-6 text-[11px] text-[#9a9a9a]">
            Vul je contactgegevens in voor de zijbalk.
          </div>
        )}
        <PageFooter accent={accent} />
      </div>
    </article>
  );
}
