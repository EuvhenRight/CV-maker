import type { SectionKey } from "@/lib/cv-types";
import { translate, type Locale } from "@/lib/i18n";
import {
  dateRange,
  nonEmpty,
  placeholderName,
  resolveSkills,
  resolveStrengths,
  softTextOn,
  textOn,
  type TemplateProps,
} from "./shared";
import { ContactRows, PageFooter, PersonalDetails } from "./blocks";

export function CreativeTemplate({ cv, lang = "nl" }: TemplateProps) {
  const accent = cv.accentColor;
  const t = (k: string) => translate(lang as Locale, k);
  const render = (k: SectionKey) => {
    if (!nonEmpty(cv, k)) return null;
    switch (k) {
      case "summary":
        return (
          <Block key={k} title={t("tpl.section.aboutMe")} accent={accent}>
            <p className="text-[12px] leading-relaxed whitespace-pre-wrap break-words text-neutral-700">
              {cv.summary}
            </p>
          </Block>
        );
      case "experience":
        return (
          <Block key={k} title={t("tpl.section.experience")} accent={accent}>
            <div className="space-y-3">
              {cv.experience.map((e) => (
                <div key={e.id} className="relative pl-4">
                  <span
                    className="absolute left-0 top-[7px] h-2 w-2 rounded-full"
                    style={{ background: accent }}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[13px] font-bold text-neutral-900 break-words">
                      {e.role}
                    </div>
                    <div className="text-[11px] text-neutral-500 whitespace-nowrap">
                      {dateRange(e.startDate, e.endDate, e.current, lang)}
                    </div>
                  </div>
                  <div
                    className="text-[12px] font-medium break-words"
                    style={{ color: accent }}
                  >
                    {e.company}
                    {e.location && (
                      <span className="text-neutral-500"> · {e.location}</span>
                    )}
                  </div>
                  {e.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed text-neutral-700">
                      {e.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} className="whitespace-pre-wrap break-words">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Block>
        );
      case "education":
        return (
          <Block key={k} title={t("tpl.section.education")} accent={accent}>
            <div className="space-y-2">
              {cv.education.map((ed) => (
                <div key={ed.id}>
                  <div className="text-[13px] font-bold break-words">
                    {[ed.degree, ed.field].filter(Boolean).join(" · ")}
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-[12px] text-neutral-700">
                    <span className="break-words">{ed.school}</span>
                    <span className="text-[11px] text-neutral-500 whitespace-nowrap">
                      {dateRange(ed.startDate, ed.endDate, undefined, lang)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Block>
        );
      case "skills":
        return (
          <Block key={k} title={t("tpl.section.skills")} accent={accent}>
            <div className="flex flex-wrap gap-1.5">
              {resolveSkills(cv, lang).map((label, i) => (
                <span
                  key={`${label}-${i}`}
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium break-words"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  {label}
                </span>
              ))}
            </div>
          </Block>
        );
      case "strengths":
        return (
          <Block key={k} title={t("tpl.section.strengths")} accent={accent}>
            <div className="flex flex-wrap gap-1.5">
              {resolveStrengths(cv, lang).map((label, i) => (
                <span
                  key={`${label}-${i}`}
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium break-words border"
                  style={{ borderColor: `${accent}55`, color: accent }}
                >
                  {label}
                </span>
              ))}
            </div>
          </Block>
        );
      case "projects":
        return (
          <Block key={k} title={t("tpl.section.projects")} accent={accent}>
            <div className="space-y-2">
              {cv.projects.map((p) => (
                <div key={p.id}>
                  <div className="text-[13px] font-bold break-words">
                    {p.name}
                    {p.link && (
                      <span
                        className="ml-2 text-[11px] font-normal break-all"
                        style={{ color: accent }}
                      >
                        {p.link}
                      </span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-[12px] text-neutral-700 break-words">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Block>
        );
      case "languages":
        return (
          <Block key={k} title={t("tpl.section.languages")} accent={accent}>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] break-words">
              {cv.languages.map((l) => (
                <span key={l.id}>
                  <span className="font-bold">{l.name}</span>
                  {l.level && (
                    <span className="text-neutral-500"> — {l.level}</span>
                  )}
                </span>
              ))}
            </div>
          </Block>
        );
      case "certifications":
        return (
          <Block key={k} title={t("tpl.section.certifications")} accent={accent}>
            <div className="space-y-0.5 text-[12px] break-words">
              {cv.certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-bold">{c.name}</span>
                  {c.issuer && ` — ${c.issuer}`}
                  {c.date && (
                    <span className="text-neutral-500"> · {c.date}</span>
                  )}
                </div>
              ))}
            </div>
          </Block>
        );
    }
  };

  const headerText = textOn(accent);
  const headerMuted = softTextOn(accent);
  return (
    <article className="flex flex-1 flex-col font-sans text-neutral-900">
      <header
        className="mb-5 px-10 pb-5 pt-10"
        style={{ background: accent, color: headerText }}
      >
        <h1 className="text-[28px] font-extrabold leading-tight break-words">
          {cv.personal.fullName || placeholderName(lang)}
        </h1>
        {cv.personal.title && (
          <div
            className="text-[14px] break-words"
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
        <PersonalDetails
          cv={cv}
          lang={lang}
          layout="inline"
          color={headerMuted}
          accent={headerText}
          className="mt-1"
        />
      </header>
      <div className="space-y-4 px-10">{cv.sectionOrder.map(render)}</div>
      <div className="px-10 pb-10">
        <PageFooter accent={accent} lang={lang} />
      </div>
    </article>
  );
}

function Block({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="mb-2 text-[14px] font-extrabold break-words"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
