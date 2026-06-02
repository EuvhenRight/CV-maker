import type { SectionKey } from "@/lib/cv-types";
import { dateRange, nonEmpty, type TemplateProps } from "./shared";

const SIDEBAR_KEYS = new Set<SectionKey>(["skills", "languages", "certifications"]);

export function ModernTemplate({ cv }: TemplateProps) {
  const accent = cv.accentColor;
  const main = cv.sectionOrder.filter((k) => !SIDEBAR_KEYS.has(k));
  const side = cv.sectionOrder.filter((k) => SIDEBAR_KEYS.has(k));

  return (
    <article className="font-sans text-neutral-900">
      <header className="mb-4 rounded-md p-4" style={{ background: `${accent}10` }}>
        <h1 className="text-2xl font-bold leading-tight" style={{ color: accent }}>
          {cv.personal.fullName || "Jouw naam"}
        </h1>
        {cv.personal.title && (
          <div className="text-[13px] text-neutral-700">{cv.personal.title}</div>
        )}
      </header>
      <div className="grid grid-cols-[1fr_220px] gap-6">
        <div className="space-y-4">
          {main.map((k) => (
            <MainBlock key={k} k={k} cv={cv} accent={accent} />
          ))}
        </div>
        <aside className="space-y-4 border-l border-neutral-100 pl-5 text-[11px]">
          <div className="space-y-1">
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              Contact
            </h3>
            {cv.personal.email && <div>{cv.personal.email}</div>}
            {cv.personal.phone && <div>{cv.personal.phone}</div>}
            {cv.personal.location && <div>{cv.personal.location}</div>}
            {cv.personal.website && <div>{cv.personal.website}</div>}
            {cv.personal.linkedin && <div>{cv.personal.linkedin}</div>}
          </div>
          {side.map((k) => (
            <SideBlock key={k} k={k} cv={cv} accent={accent} />
          ))}
        </aside>
      </div>
    </article>
  );
}

function H({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2
      className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
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
}: {
  k: SectionKey;
  cv: TemplateProps["cv"];
  accent: string;
}) {
  if (!nonEmpty(cv, k)) return null;
  if (k === "summary") {
    return (
      <section>
        <H accent={accent}>Summary</H>
        <p className="text-[12px] leading-relaxed text-neutral-700">{cv.summary}</p>
      </section>
    );
  }
  if (k === "experience") {
    return (
      <section>
        <H accent={accent}>Experience</H>
        <div className="space-y-3">
          {cv.experience.map((e) => (
            <div key={e.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <div className="text-[13px] font-semibold">
                  {e.role}
                  {e.company ? ` · ${e.company}` : ""}
                </div>
                <div className="text-[11px] text-neutral-500">
                  {dateRange(e.startDate, e.endDate, e.current)}
                </div>
              </div>
              {e.location && (
                <div className="text-[11px] text-neutral-500">{e.location}</div>
              )}
              {e.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed text-neutral-700">
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
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
        <H accent={accent}>Education</H>
        <div className="space-y-2">
          {cv.education.map((ed) => (
            <div key={ed.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <div className="text-[13px] font-semibold">
                  {[ed.degree, ed.field].filter(Boolean).join(" · ")}
                </div>
                <div className="text-[11px] text-neutral-500">
                  {dateRange(ed.startDate, ed.endDate)}
                </div>
              </div>
              <div className="text-[12px] text-neutral-700">{ed.school}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (k === "projects") {
    return (
      <section>
        <H accent={accent}>Projects</H>
        <div className="space-y-2">
          {cv.projects.map((p) => (
            <div key={p.id}>
              <div className="text-[13px] font-semibold">
                {p.name}
                {p.link && (
                  <span className="ml-2 text-[11px] font-normal text-neutral-500">
                    {p.link}
                  </span>
                )}
              </div>
              {p.description && (
                <p className="text-[12px] text-neutral-700">{p.description}</p>
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
}: {
  k: SectionKey;
  cv: TemplateProps["cv"];
  accent: string;
}) {
  if (!nonEmpty(cv, k)) return null;
  if (k === "skills") {
    return (
      <div className="space-y-1">
        <H accent={accent}>Skills</H>
        {cv.skills.map((s) => (
          <div key={s.id}>
            {s.category && (
              <div className="font-semibold text-neutral-800">{s.category}</div>
            )}
            <div className="text-neutral-600">{s.items}</div>
          </div>
        ))}
      </div>
    );
  }
  if (k === "languages") {
    return (
      <div className="space-y-0.5">
        <H accent={accent}>Languages</H>
        {cv.languages.map((l) => (
          <div key={l.id}>
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
        <H accent={accent}>Certifications</H>
        {cv.certifications.map((c) => (
          <div key={c.id}>
            <div className="font-semibold text-neutral-800">{c.name}</div>
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
