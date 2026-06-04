import type { CV, SectionKey } from "@/lib/cv-types";
import type { Locale } from "@/lib/i18n";
import {
  CertificationsBlock,
  ContactRows,
  EducationBlock,
  ExperienceBlock,
  LanguagesBlock,
  PageFooter,
  PhotoFrame,
  ProjectsBlock,
  SkillsBlock,
  StrengthsBlock,
  SummaryBlock,
  type BlockOpts,
} from "../blocks";
import { placeholderName, softTextOn, textOn } from "../shared";

const SIDE: SectionKey[] = ["skills", "strengths", "languages", "certifications"];

export function CreativeBoldTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "bold-large", lang };
  const sideOpts: BlockOpts = {
    accent,
    heading: "side-bar",
    textColor: "#2a2a2a",
    lang,
  };
  const main = cv.sectionOrder.filter((k) => !SIDE.includes(k));
  const side = cv.sectionOrder.filter((k) => SIDE.includes(k));
  const headerText = textOn(accent);
  const headerMuted = softTextOn(accent);
  const endColor = headerText === "#1A1919" ? "#3a3a3a" : "#1a1a1a";

  return (
    <article className="flex flex-1 flex-col text-[#1a1a1a]">
      <header
        className="mb-5 px-10 pb-8 pt-10"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 60%, ${endColor} 100%)`,
          color: headerText,
        }}
      >
        <div className="flex flex-wrap items-center gap-5">
          <PhotoFrame
            src={cv.personal.photo}
            size={130}
            shape="circle"
            borderColor={headerText}
            lang={lang}
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[34px] font-extrabold leading-tight break-words">
              {cv.personal.fullName || placeholderName(lang)}
            </h1>
            {cv.personal.title && (
              <div
                className="text-[15px] font-medium break-words"
                style={{ color: headerMuted }}
              >
                {cv.personal.title}
              </div>
            )}
            <div className="mt-2">
              <ContactRows
                cv={cv}
                lang={lang}
                layout="inline"
                color={headerMuted}
                accent={headerMuted}
              />
            </div>
          </div>
        </div>
      </header>
      <div className="grid flex-1 grid-cols-[1fr_200px] gap-6 px-10 pb-10">
        <div className="flex flex-col space-y-5">
          {main.map((k) => {
            if (k === "summary")
              return <SummaryBlock key={k} cv={cv} opts={opts} />;
            if (k === "experience")
              return <ExperienceBlock key={k} cv={cv} opts={opts} />;
            if (k === "education")
              return <EducationBlock key={k} cv={cv} opts={opts} />;
            if (k === "projects")
              return <ProjectsBlock key={k} cv={cv} opts={opts} />;
            return null;
          })}
          <PageFooter accent={accent} lang={lang} />
        </div>
        <aside
          className="space-y-5 border-l pl-5"
          style={{ borderColor: `${accent}33` }}
        >
          {side.map((k) => (
            <div key={k}>
              {k === "skills" && (
                <SkillsBlock cv={cv} opts={sideOpts} chips />
              )}
              {k === "strengths" && (
                <StrengthsBlock cv={cv} opts={sideOpts} chips />
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
      </div>
    </article>
  );
}
