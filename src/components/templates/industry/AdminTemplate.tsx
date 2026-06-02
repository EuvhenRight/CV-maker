import type { CV, SectionKey } from "@/lib/cv-types";
import {
  CertificationsBlock,
  EducationBlock,
  ExperienceBlock,
  LanguagesBlock,
  PhotoFrame,
  ProjectsBlock,
  SkillsBlock,
  SummaryBlock,
  type BlockOpts,
} from "../blocks";

const SIDE: SectionKey[] = ["skills", "languages", "certifications"];

export function AdminTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "underline" };
  const sideOpts: BlockOpts = {
    accent,
    heading: "underline",
    textColor: "#1a1a1a",
  };
  const main = cv.sectionOrder.filter((k) => !SIDE.includes(k));
  const side = cv.sectionOrder.filter((k) => SIDE.includes(k));

  return (
    <article className="grid grid-cols-[210px_1fr] gap-6 text-[#1a1a1a]">
      <aside className="space-y-5">
        <PhotoFrame
          src={cv.personal.photo}
          size={180}
          shape="rounded"
          borderColor={accent}
          className="mx-auto"
        />
        <div className="space-y-0.5 text-[12px] text-[#444]">
          {cv.personal.email && <div>{cv.personal.email}</div>}
          {cv.personal.phone && <div>{cv.personal.phone}</div>}
          {cv.personal.location && <div>{cv.personal.location}</div>}
          {cv.personal.website && <div>{cv.personal.website}</div>}
          {cv.personal.linkedin && <div>{cv.personal.linkedin}</div>}
        </div>
        {side.map((k) => (
          <div key={k}>
            {k === "skills" && <SkillsBlock cv={cv} opts={sideOpts} />}
            {k === "languages" && <LanguagesBlock cv={cv} opts={sideOpts} stacked />}
            {k === "certifications" && <CertificationsBlock cv={cv} opts={sideOpts} />}
          </div>
        ))}
      </aside>
      <div className="space-y-5">
        <header className="border-b pb-2" style={{ borderColor: accent }}>
          <h1 className="font-display text-[28px] font-bold leading-tight">
            {cv.personal.fullName || "Your Name"}
          </h1>
          {cv.personal.title && (
            <div className="text-[14px]" style={{ color: accent }}>
              {cv.personal.title}
            </div>
          )}
        </header>
        {main.map((k) => {
          if (k === "summary") return <SummaryBlock key={k} cv={cv} opts={opts} title="Profile" />;
          if (k === "experience") return <ExperienceBlock key={k} cv={cv} opts={opts} />;
          if (k === "education") return <EducationBlock key={k} cv={cv} opts={opts} />;
          if (k === "projects") return <ProjectsBlock key={k} cv={cv} opts={opts} />;
          return null;
        })}
      </div>
    </article>
  );
}
