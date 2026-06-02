import type { SectionKey } from "@/lib/cv-types";
import { contactLine, dateRange, nonEmpty, type TemplateProps } from "./shared";
import { PageFooter } from "./blocks";

export function MinimalTemplate({ cv }: TemplateProps) {
  const accent = cv.accentColor;
  const renderSection = (key: SectionKey) => {
    if (!nonEmpty(cv, key)) return null;
    switch (key) {
      case "summary":
        return (
          <Section key={key} title="Samenvatting" accent={accent}>
            <p className="text-[12px] leading-relaxed text-neutral-700">
              {cv.summary}
            </p>
          </Section>
        );
      case "experience":
        return (
          <Section key={key} title="Werkervaring" accent={accent}>
            <div className="space-y-3">
              {cv.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[13px] font-semibold text-neutral-900">
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
          </Section>
        );
      case "education":
        return (
          <Section key={key} title="Opleiding" accent={accent}>
            <div className="space-y-2">
              {cv.education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[13px] font-semibold text-neutral-900">
                      {[ed.degree, ed.field].filter(Boolean).join(" · ")}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {dateRange(ed.startDate, ed.endDate)}
                    </div>
                  </div>
                  <div className="text-[12px] text-neutral-700">{ed.school}</div>
                  {ed.description && (
                    <div className="text-[11px] text-neutral-500">
                      {ed.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        );
      case "skills":
        return (
          <Section key={key} title="Vaardigheden" accent={accent}>
            <div className="space-y-1">
              {cv.skills.map((s) => (
                <div key={s.id} className="text-[12px] text-neutral-700">
                  {s.category && (
                    <span className="font-semibold text-neutral-900">
                      {s.category}:{" "}
                    </span>
                  )}
                  {s.items}
                </div>
              ))}
            </div>
          </Section>
        );
      case "projects":
        return (
          <Section key={key} title="Projecten" accent={accent}>
            <div className="space-y-2">
              {cv.projects.map((p) => (
                <div key={p.id}>
                  <div className="text-[13px] font-semibold text-neutral-900">
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
          </Section>
        );
      case "languages":
        return (
          <Section key={key} title="Talen" accent={accent}>
            <div className="text-[12px] text-neutral-700">
              {cv.languages
                .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                .join(" · ")}
            </div>
          </Section>
        );
      case "certifications":
        return (
          <Section key={key} title="Certificaten" accent={accent}>
            <div className="space-y-1">
              {cv.certifications.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 text-[12px] text-neutral-700"
                >
                  <span>
                    <span className="font-semibold text-neutral-900">{c.name}</span>
                    {c.issuer && ` · ${c.issuer}`}
                  </span>
                  {c.date && <span className="text-[11px] text-neutral-500">{c.date}</span>}
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
        <h1 className="text-2xl font-bold leading-tight">
          {cv.personal.fullName || "Jouw naam"}
        </h1>
        {cv.personal.title && (
          <div className="text-[13px] text-neutral-600">{cv.personal.title}</div>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-neutral-600">
          {contactLine(cv).map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>
      <div className="mt-4 space-y-4">
        {cv.sectionOrder.map((k) => renderSection(k))}
      </div>
      <PageFooter accent={accent} />
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
        className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
