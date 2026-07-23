import type { SectionKey } from "@/lib/cv-types";
import { translate, type Locale } from "@/lib/i18n";
import {
  dateRange,
  nonEmpty,
  normalizeUrl,
  placeholderName,
  resolveStrengths,
  splitSkills,
  type TemplateProps,
} from "./shared";
import {
  ContactRows,
  PageFooter,
  PdfLink,
  PersonalDetails,
  ProjectLinks,
  SkillGroups,
} from "./blocks";

export function MinimalTemplate({ cv, lang = "nl" }: TemplateProps) {
  const accent = cv.accentColor;
  const t = (k: string) => translate(lang as Locale, k);
  const renderSection = (key: SectionKey) => {
    if (!nonEmpty(cv, key)) return null;
    switch (key) {
      case "summary":
        return (
          <Section
            key={key}
            title={t("tpl.section.summary")}
            accent={accent}
          >
            <p className="text-[12px] leading-relaxed whitespace-pre-wrap break-words text-neutral-700">
              {cv.summary}
            </p>
          </Section>
        );
      case "experience":
        return (
          <Section
            key={key}
            title={t("tpl.section.experience")}
            accent={accent}
          >
            <div className="space-y-3">
              {cv.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[13px] font-semibold text-neutral-900 break-words">
                      {e.role}
                      {e.company ? ` · ${e.company}` : ""}
                    </div>
                    <div className="text-[11px] text-neutral-500 whitespace-nowrap">
                      {dateRange(e.startDate, e.endDate, e.current, lang)}
                    </div>
                  </div>
                  {e.location && (
                    <div className="text-[11px] text-neutral-500 break-words">
                      {e.location}
                    </div>
                  )}
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
          </Section>
        );
      case "education":
        return (
          <Section
            key={key}
            title={t("tpl.section.education")}
            accent={accent}
          >
            <div className="space-y-2">
              {cv.education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[13px] font-semibold text-neutral-900 break-words">
                      {[ed.degree, ed.field].filter(Boolean).join(" · ")}
                    </div>
                    <div className="text-[11px] text-neutral-500 whitespace-nowrap">
                      {dateRange(ed.startDate, ed.endDate, undefined, lang)}
                    </div>
                  </div>
                  <div className="text-[12px] text-neutral-700 break-words">
                    {ed.school}
                  </div>
                  {ed.description && (
                    <div className="text-[11px] text-neutral-500 break-words">
                      {ed.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        );
      case "skills": {
        const { technical, professional } = splitSkills(cv, lang);
        return (
          <Section
            key={key}
            title={t("tpl.section.skills")}
            accent={accent}
          >
            <SkillGroups
              technical={technical}
              professional={professional}
              lang={lang}
              labelStyle={{ color: accent }}
              renderList={(items) => (
                <div className="text-[12px] leading-relaxed text-neutral-700 break-words">
                  {items.join(" · ")}
                </div>
              )}
            />
          </Section>
        );
      }
      case "strengths":
        return (
          <Section
            key={key}
            title={t("tpl.section.strengths")}
            accent={accent}
          >
            <div className="text-[12px] leading-relaxed text-neutral-700 break-words">
              {resolveStrengths(cv, lang).join(" · ")}
            </div>
          </Section>
        );
      case "projects":
        return (
          <Section
            key={key}
            title={t("tpl.section.projects")}
            accent={accent}
          >
            <div className="space-y-2">
              {cv.projects.map((p) => (
                <div key={p.id}>
                  <div className="text-[13px] font-semibold text-neutral-900 break-words">
                    {p.name}
                    <ProjectLinks
                      link={p.link}
                      github={p.github}
                      color="#737373"
                    />
                  </div>
                  {p.description && (
                    <p className="text-[12px] text-neutral-700 break-words">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        );
      case "languages":
        return (
          <Section
            key={key}
            title={t("tpl.section.languages")}
            accent={accent}
          >
            <div className="text-[12px] text-neutral-700 break-words">
              {cv.languages
                .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                .join(" · ")}
            </div>
          </Section>
        );
      case "certifications":
        return (
          <Section
            key={key}
            title={t("tpl.section.certifications")}
            accent={accent}
          >
            <div className="space-y-1">
              {cv.certifications.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 text-[12px] text-neutral-700 break-words"
                >
                  <span>
                    <span className="font-semibold text-neutral-900">
                      {c.link ? (
                        <PdfLink href={normalizeUrl(c.link)} style={{ color: accent }}>
                          {c.name}
                        </PdfLink>
                      ) : (
                        c.name
                      )}
                    </span>
                    {c.issuer && ` · ${c.issuer}`}
                  </span>
                  {c.date && (
                    <span className="text-[11px] text-neutral-500 whitespace-nowrap">
                      {c.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        );
    }
  };

  return (
    <article className="flex flex-1 flex-col p-10 font-sans text-neutral-900">
      <header className="border-b border-neutral-200 pb-3">
        <h1 className="text-2xl font-bold leading-tight break-words">
          {cv.personal.fullName || placeholderName(lang)}
        </h1>
        {cv.personal.title && (
          <div className="text-[13px] text-neutral-600 break-words">
            {cv.personal.title}
          </div>
        )}
        <div className="mt-2">
          <ContactRows
            cv={cv}
            lang={lang}
            layout="inline"
            color="#6b6b6b"
            accent={accent}
          />
        </div>
        <PersonalDetails
          cv={cv}
          lang={lang}
          layout="inline"
          color="#6b6b6b"
          accent={accent}
          className="mt-1"
        />
      </header>
      <div className="mt-4 space-y-4">
        {cv.sectionOrder.map((k) => renderSection(k))}
      </div>
      <PageFooter accent={accent} lang={lang} />
    </article>
  );
}

function Section({
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
        className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] break-words"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
