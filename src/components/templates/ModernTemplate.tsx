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

const SIDEBAR_KEYS = new Set<SectionKey>([
  "skills",
  "strengths",
  "languages",
  "certifications",
]);

export function ModernTemplate({ cv, lang = "nl" }: TemplateProps) {
  const accent = cv.accentColor;
  const t = (k: string) => translate(lang as Locale, k);
  const main = cv.sectionOrder.filter((k) => !SIDEBAR_KEYS.has(k));
  const side = cv.sectionOrder.filter((k) => SIDEBAR_KEYS.has(k));

  return (
    <article className="flex flex-1 flex-col p-10 font-sans text-neutral-900">
      <header
        className="mb-4 rounded-md p-4"
        style={{ background: `${accent}10` }}
      >
        <h1
          className="text-2xl font-bold leading-tight break-words"
          style={{ color: accent }}
        >
          {cv.personal.fullName || placeholderName(lang)}
        </h1>
        {cv.personal.title && (
          <div className="text-[13px] text-neutral-700 break-words">
            {cv.personal.title}
          </div>
        )}
      </header>
      <div className="grid grid-cols-[1fr_220px] gap-6">
        <div className="space-y-4">
          {main.map((k) => (
            <MainBlock key={k} k={k} cv={cv} accent={accent} lang={lang} t={t} />
          ))}
        </div>
        <aside className="space-y-4 border-l border-neutral-100 pl-5 text-[11px]">
          <div className="space-y-1.5">
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {t("preview.contact.label")}
            </h3>
            <ContactRows
              cv={cv}
              lang={lang}
              layout="iconRows"
              color="#3a3a3a"
              accent={accent}
              iconSize={11}
            />
          </div>
          <PersonalDetails
            cv={cv}
            lang={lang}
            layout="labeled-rows"
            color="#3a3a3a"
            accent={accent}
          />
          {side.map((k) => (
            <SideBlock key={k} k={k} cv={cv} accent={accent} lang={lang} t={t} />
          ))}
        </aside>
      </div>
      <PageFooter accent={accent} lang={lang} />
    </article>
  );
}

function H({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2
      className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] break-words"
      style={{ color: accent }}
    >
      {children}
    </h2>
  );
}

function MainBlock({
  k,
  cv,
  accent,
  lang,
  t,
}: {
  k: SectionKey;
  cv: TemplateProps["cv"];
  accent: string;
  lang: Locale;
  t: (key: string) => string;
}) {
  if (!nonEmpty(cv, k)) return null;
  if (k === "summary") {
    return (
      <section>
        <H accent={accent}>{t("tpl.section.summary")}</H>
        <p className="text-[12px] leading-relaxed whitespace-pre-wrap break-words text-neutral-700">
          {cv.summary}
        </p>
      </section>
    );
  }
  if (k === "experience") {
    return (
      <section>
        <H accent={accent}>{t("tpl.section.experience")}</H>
        <div className="space-y-3">
          {cv.experience.map((e) => (
            <div key={e.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <div className="text-[13px] font-semibold break-words">
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
      </section>
    );
  }
  if (k === "education") {
    return (
      <section>
        <H accent={accent}>{t("tpl.section.education")}</H>
        <div className="space-y-2">
          {cv.education.map((ed) => (
            <div key={ed.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <div className="text-[13px] font-semibold break-words">
                  {[ed.degree, ed.field].filter(Boolean).join(" · ")}
                </div>
                <div className="text-[11px] text-neutral-500 whitespace-nowrap">
                  {dateRange(ed.startDate, ed.endDate, undefined, lang)}
                </div>
              </div>
              <div className="text-[12px] text-neutral-700 break-words">
                {ed.school}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (k === "projects") {
    return (
      <section>
        <H accent={accent}>{t("tpl.section.projects")}</H>
        <div className="space-y-2">
          {cv.projects.map((p) => (
            <div key={p.id}>
              <div className="text-[13px] font-semibold break-words">
                {p.name}
                {p.link && (
                  <PdfLink
                    href={normalizeUrl(p.link)}
                    className="ml-2 text-[11px] font-normal text-neutral-500 break-all"
                  >
                    {linkLabel(p.link)}
                  </PdfLink>
                )}
                {p.github && (
                  <PdfLink
                    href={normalizeUrl(p.github)}
                    className="ml-2 text-[11px] font-normal text-neutral-500 break-all"
                  >
                    {linkLabel(p.github)}
                  </PdfLink>
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
      </section>
    );
  }
  return null;
}

function SideBlock({
  k,
  cv,
  accent,
  lang,
  t,
}: {
  k: SectionKey;
  cv: TemplateProps["cv"];
  accent: string;
  lang: Locale;
  t: (key: string) => string;
}) {
  if (!nonEmpty(cv, k)) return null;
  if (k === "skills") {
    return (
      <div className="space-y-1">
        <H accent={accent}>{t("tpl.section.skills")}</H>
        <div className="flex flex-wrap gap-1">
          {resolveSkills(cv, lang).map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="rounded-full px-1.5 py-0.5 text-[10px] font-medium break-words"
              style={{ background: `${accent}1f`, color: accent }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (k === "strengths") {
    return (
      <div className="space-y-1">
        <H accent={accent}>{t("tpl.section.strengths")}</H>
        <div className="text-neutral-700 break-words leading-relaxed">
          {resolveStrengths(cv, lang).join(" · ")}
        </div>
      </div>
    );
  }
  if (k === "languages") {
    return (
      <div className="space-y-0.5">
        <H accent={accent}>{t("tpl.section.languages")}</H>
        {cv.languages.map((l) => (
          <div key={l.id} className="break-words">
            <span className="font-semibold text-neutral-800">{l.name}</span>
            {l.level && <span className="text-neutral-500"> — {l.level}</span>}
          </div>
        ))}
      </div>
    );
  }
  if (k === "certifications") {
    return (
      <div className="space-y-1">
        <H accent={accent}>{t("tpl.section.certifications")}</H>
        {cv.certifications.map((c) => (
          <div key={c.id} className="break-words">
            <div className="font-semibold text-neutral-800">
              {c.link ? (
                <PdfLink href={normalizeUrl(c.link)} style={{ color: accent }}>
                  {c.name}
                </PdfLink>
              ) : (
                c.name
              )}
            </div>
            <div className="text-neutral-500">
              {[c.issuer, c.date].filter(Boolean).join(" · ")}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
