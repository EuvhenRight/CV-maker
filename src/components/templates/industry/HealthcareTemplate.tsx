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

export function HealthcareTemplate({
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
    heading: "side-bar",
    textColor: "#2a2a2a",
    lang,
  };
  const main = cv.sectionOrder.filter((k) => !SIDE.includes(k));
  const side = cv.sectionOrder.filter((k) => SIDE.includes(k));

  return (
    <article className="grid flex-1 grid-cols-[1fr_210px] gap-6 p-10 text-[#1a1a1a]">
      <div className="flex flex-col space-y-4">
        <header>
          <h1 className="font-display text-[26px] font-bold leading-tight break-words">
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
          <div className="mt-2">
            <ContactRows
              cv={cv}
              lang={lang}
              layout="inline"
              color="#555"
              accent={accent}
            />
          </div>
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
            return (
              <ExperienceBlock
                key={k}
                cv={cv}
                opts={opts}
                title={t("tpl.section.clinical")}
              />
            );
          if (k === "education")
            return <EducationBlock key={k} cv={cv} opts={opts} />;
          if (k === "projects")
            return <ProjectsBlock key={k} cv={cv} opts={opts} />;
          return null;
        })}
        <PageFooter accent={accent} lang={lang} />
      </div>
      <aside
        className="space-y-5 rounded-lg p-4"
        style={{ background: "#f0f6fb" }}
      >
        <div className="flex justify-center">
          <PhotoFrame
            src={cv.personal.photo}
            size={130}
            shape="circle"
            borderColor={accent}
            lang={lang}
            hidden={cv.photoHidden}
          />
        </div>
        {side.map((k) => (
          <div key={k}>
            {k === "skills" && (
              <SkillsBlock
                cv={cv}
                opts={sideOpts}
                title={t("tpl.section.competencies")}
              />
            )}
            {k === "strengths" && (
              <StrengthsBlock cv={cv} opts={sideOpts} />
            )}
            {k === "languages" && (
              <LanguagesBlock cv={cv} opts={sideOpts} stacked />
            )}
            {k === "certifications" && (
              <CertificationsBlock
                cv={cv}
                opts={sideOpts}
                title={t("tpl.section.diplomas")}
              />
            )}
          </div>
        ))}
      </aside>
    </article>
  );
}
