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
import { contactLine, placeholderName } from "../shared";

const SIDE: SectionKey[] = ["skills", "strengths", "languages", "certifications"];

export function TechTemplate({ cv, lang = "nl" }: { cv: CV; lang?: Locale }) {
  const accent = cv.accentColor;
  const t = (k: string) => translate(lang, k);
  const opts: BlockOpts = {
    accent,
    heading: "bold-large",
    textColor: "#1a1919",
    mutedColor: "#7a7a7a",
    lang,
  };
  const sideOpts: BlockOpts = {
    accent: "#ffffff",
    heading: "uppercase-thin",
    textColor: "#e8eaed",
    mutedColor: "#9ba0a8",
    lang,
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
            lang={lang}
          />
        </div>
        <div>
          <div
            className="mb-1 text-center font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {t("tpl.tech.contact")}
          </div>
          <ContactRows
            cv={cv}
            lang={lang}
            layout="iconRows"
            color="#e8eaed"
            accent={accent}
            iconSize={11}
          />
        </div>
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
      <div className="flex flex-col p-8">
        <header className="mb-5">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {t("tpl.tech.whoami")}
          </div>
          <h1 className="font-display text-[28px] font-extrabold leading-tight break-words">
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
        <div className="space-y-5">
          {main.map((k) => {
            if (k === "summary")
              return (
                <SummaryBlock
                  key={k}
                  cv={cv}
                  opts={opts}
                  title={t("tpl.tech.summary")}
                />
              );
            if (k === "experience")
              return (
                <ExperienceBlock
                  key={k}
                  cv={cv}
                  opts={opts}
                  title={t("tpl.tech.experience")}
                />
              );
            if (k === "education")
              return (
                <EducationBlock
                  key={k}
                  cv={cv}
                  opts={opts}
                  title={t("tpl.tech.education")}
                />
              );
            if (k === "projects")
              return (
                <ProjectsBlock
                  key={k}
                  cv={cv}
                  opts={opts}
                  title={t("tpl.tech.projects")}
                />
              );
            return null;
          })}
        </div>
        {contactLine(cv).length === 0 && (
          <div className="mt-6 text-[11px] text-[#9a9a9a]">
            {lang === "en"
              ? "Fill in your contact details for the sidebar."
              : "Vul je contactgegevens in voor de zijbalk."}
          </div>
        )}
        <PageFooter accent={accent} lang={lang} />
      </div>
    </article>
  );
}
