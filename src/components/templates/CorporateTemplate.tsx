import type { SectionKey } from "@/lib/cv-types";
import { translate, type Locale } from "@/lib/i18n";
import {
  dateRange,
  linkLabel,
  nonEmpty,
  normalizeUrl,
  placeholderName,
  resolveSkills,
  resolveStrengths,
  type TemplateProps,
} from "./shared";
import { ContactRows, PageFooter, PdfLink, PersonalDetails } from "./blocks";

export function CorporateTemplate({ cv, lang = "nl" }: TemplateProps) {
  const accent = cv.accentColor;
  const t = (k: string) => translate(lang as Locale, k);
  const render = (k: SectionKey) => {
    if (!nonEmpty(cv, k)) return null;
    switch (k) {
      case "summary":
        return (
          <Block
            key={k}
            title={t("tpl.section.profileSummary")}
            accent={accent}
          >
            <p className="text-[12px] leading-relaxed whitespace-pre-wrap break-words">
              {cv.summary}
            </p>
          </Block>
        );
      case "experience":
        return (
          <Block
            key={k}
            title={t("tpl.section.experience")}
            accent={accent}
          >
            <div className="space-y-3">
              {cv.experience.map((e) => (
                <div key={e.id}>
                  <div className="text-[13px] font-bold uppercase tracking-wide break-words">
                    {e.company}
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[12px] italic break-words">
                      {e.role}
                      {e.location && ` · ${e.location}`}
                    </div>
                    <div className="text-[11px] whitespace-nowrap">
                      {dateRange(e.startDate, e.endDate, e.current, lang)}
                    </div>
                  </div>
                  {e.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed">
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
          <Block
            key={k}
            title={t("tpl.section.education")}
            accent={accent}
          >
            <div className="space-y-2">
              {cv.education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[12px] break-words">
                      <span className="font-bold">{ed.school}</span>
                      {ed.degree && ` — ${ed.degree}`}
                      {ed.field && `, ${ed.field}`}
                    </div>
                    <div className="text-[11px] whitespace-nowrap">
                      {dateRange(ed.startDate, ed.endDate, undefined, lang)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Block>
        );
      case "skills":
        return (
          <Block
            key={k}
            title={t("tpl.section.coreCompetencies")}
            accent={accent}
          >
            <div className="text-[12px] leading-relaxed break-words">
              {resolveSkills(cv, lang).join(" · ")}
            </div>
          </Block>
        );
      case "strengths":
        return (
          <Block
            key={k}
            title={t("tpl.section.strengths")}
            accent={accent}
          >
            <div className="text-[12px] leading-relaxed break-words">
              {resolveStrengths(cv, lang).join(" · ")}
            </div>
          </Block>
        );
      case "projects":
        return (
          <Block
            key={k}
            title={t("tpl.section.selectedProjects")}
            accent={accent}
          >
            <div className="space-y-2 text-[12px] break-words">
              {cv.projects.map((p) => (
                <div key={p.id}>
                  <div className="font-bold">
                    {p.name}
                    {p.link && (
                      <PdfLink
                        href={normalizeUrl(p.link)}
                        className="ml-2 font-normal italic break-all"
                        style={{ color: accent }}
                      >
                        {linkLabel(p.link)}
                      </PdfLink>
                    )}
                    {p.github && (
                      <PdfLink
                        href={normalizeUrl(p.github)}
                        className="ml-2 font-normal italic break-all"
                        style={{ color: accent }}
                      >
                        {linkLabel(p.github)}
                      </PdfLink>
                    )}
                  </div>
                  {p.description && <div>{p.description}</div>}
                </div>
              ))}
            </div>
          </Block>
        );
      case "languages":
        return (
          <Block
            key={k}
            title={t("tpl.section.languages")}
            accent={accent}
          >
            <div className="text-[12px] break-words">
              {cv.languages
                .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                .join(" · ")}
            </div>
          </Block>
        );
      case "certifications":
        return (
          <Block
            key={k}
            title={t("tpl.section.certifications")}
            accent={accent}
          >
            <div className="space-y-0.5 text-[12px] break-words">
              {cv.certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-bold">
                    {c.link ? (
                      <PdfLink href={normalizeUrl(c.link)} style={{ color: accent }}>
                        {c.name}
                      </PdfLink>
                    ) : (
                      c.name
                    )}
                  </span>
                  {c.issuer && ` — ${c.issuer}`}
                  {c.date && ` (${c.date})`}
                </div>
              ))}
            </div>
          </Block>
        );
    }
  };

  return (
    <article
      className="flex flex-1 flex-col p-10 text-neutral-900"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <header className="mb-4 text-center">
        <h1 className="text-[26px] font-bold uppercase tracking-[0.08em] break-words">
          {cv.personal.fullName || placeholderName(lang)}
        </h1>
        {cv.personal.title && (
          <div className="text-[13px] italic break-words">
            {cv.personal.title}
          </div>
        )}
        <div className="mt-2 flex justify-center">
          <ContactRows
            cv={cv}
            lang={lang}
            layout="inline"
            color="#3a3a3a"
            accent={accent}
          />
        </div>
        <div className="mt-1 flex justify-center">
          <PersonalDetails
            cv={cv}
            lang={lang}
            layout="inline"
            color="#3a3a3a"
            accent={accent}
          />
        </div>
        <div className="mt-2 h-[2px] w-full" style={{ background: accent }} />
      </header>
      <div className="space-y-4">{cv.sectionOrder.map(render)}</div>
      <PageFooter accent={accent} lang={lang} />
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
        className="mb-1.5 border-b pb-0.5 text-[12px] font-bold uppercase tracking-[0.14em] break-words"
        style={{ borderColor: accent, color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
