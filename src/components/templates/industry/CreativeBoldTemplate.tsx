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
import { textOn, softTextOn } from "../shared";

const SIDE: SectionKey[] = ["skills", "languages", "certifications"];

export function CreativeBoldTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "bold-large" };
  const sideOpts: BlockOpts = {
    accent,
    heading: "side-bar",
    textColor: "#2a2a2a",
  };
  const main = cv.sectionOrder.filter((k) => !SIDE.includes(k));
  const side = cv.sectionOrder.filter((k) => SIDE.includes(k));
  const headerText = textOn(accent);
  const headerMuted = softTextOn(accent);
  const endColor = headerText === "#1A1919" ? "#3a3a3a" : "#1a1a1a";

  return (
    <article className="text-[#1a1a1a]">
      <header
        className="-mx-10 -mt-10 mb-5 px-10 pb-8 pt-10"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 60%, ${endColor} 100%)`,
          color: headerText,
        }}
      >
        <div className="flex items-center gap-5">
          <PhotoFrame
            src={cv.personal.photo}
            size={130}
            shape="circle"
            borderColor={headerText}
          />
          <div>
            <h1 className="font-display text-[34px] font-extrabold leading-tight">
              {cv.personal.fullName || "Jouw naam"}
            </h1>
            {cv.personal.title && (
              <div
                className="text-[15px] font-medium"
                style={{ color: headerMuted }}
              >
                {cv.personal.title}
              </div>
            )}
            <div
              className="mt-2 flex flex-wrap gap-x-3 text-[11px]"
              style={{ color: headerMuted }}
            >
              {cv.personal.email && <span>{cv.personal.email}</span>}
              {cv.personal.phone && <span>{cv.personal.phone}</span>}
              {cv.personal.location && <span>{cv.personal.location}</span>}
              {cv.personal.website && <span>{cv.personal.website}</span>}
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-[1fr_200px] gap-6">
        <div className="space-y-5">
          {main.map((k) => {
            if (k === "summary") return <SummaryBlock key={k} cv={cv} opts={opts} />;
            if (k === "experience") return <ExperienceBlock key={k} cv={cv} opts={opts} />;
            if (k === "education") return <EducationBlock key={k} cv={cv} opts={opts} />;
            if (k === "projects") return <ProjectsBlock key={k} cv={cv} opts={opts} />;
            return null;
          })}
        </div>
        <aside className="space-y-5 border-l pl-5" style={{ borderColor: `${accent}33` }}>
          {side.map((k) => (
            <div key={k}>
              {k === "skills" && <SkillsBlock cv={cv} opts={sideOpts} chips />}
              {k === "languages" && <LanguagesBlock cv={cv} opts={sideOpts} stacked />}
              {k === "certifications" && <CertificationsBlock cv={cv} opts={sideOpts} />}
            </div>
          ))}
        </aside>
      </div>
    </article>
  );
}
