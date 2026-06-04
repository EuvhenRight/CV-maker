import type { CV, SectionKey } from "@/lib/cv-types";
import { translate, type Locale } from "@/lib/i18n";
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
import { placeholderName } from "../shared";

const SIDE: SectionKey[] = ["skills", "strengths", "languages", "certifications"];

export function AdminTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const t = (k: string) => translate(lang, k);
  const opts: BlockOpts = { accent, heading: "underline", lang };
  const sideOpts: BlockOpts = {
    accent,
    heading: "underline",
    textColor: "#1a1a1a",
    lang,
  };
  const main = cv.sectionOrder.filter((k) => !SIDE.includes(k));
  const side = cv.sectionOrder.filter((k) => SIDE.includes(k));

  return (
    <article className="grid flex-1 grid-cols-[210px_1fr] gap-6 p-10 text-[#1a1a1a]">
      <aside className="space-y-5">
        <PhotoFrame
          src={cv.personal.photo}
          size={180}
          shape="rounded"
          borderColor={accent}
          className="mx-auto"
          lang={lang}
        />
        <ContactRows
          cv={cv}
          lang={lang}
          layout="iconRows"
          color="#3a3a3a"
          accent={accent}
          iconSize={12}
        />
        {side.map((k) => (
          <div key={k}>
            {k === "skills" && <SkillsBlock cv={cv} opts={sideOpts} />}
            {k === "strengths" && (
              <StrengthsBlock cv={cv} opts={sideOpts} />
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
      <div className="flex flex-col space-y-5">
        <header className="border-b pb-2" style={{ borderColor: accent }}>
          <h1 className="font-display text-[28px] font-bold leading-tight break-words">
            {cv.personal.fullName || placeholderName(lang)}
          </h1>
          {cv.personal.title && (
            <div
              className="text-[14px] break-words"
              style={{ color: accent }}
            >
              {cv.personal.title}
            </div>
          )}
        </header>
        {main.map((k) => {
          if (k === "summary")
            return (
              <SummaryBlock
                key={k}
                cv={cv}
                opts={opts}
                title={t("tpl.section.profile")}
              />
            );
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
    </article>
  );
}
