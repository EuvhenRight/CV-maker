import type { SectionKey } from "@/lib/cv-types";
import { contactLine, dateRange, nonEmpty, type TemplateProps } from "./shared";
import { PageFooter } from "./blocks";

export function CorporateTemplate({ cv }: TemplateProps) {
  const accent = cv.accentColor;
  const render = (k: SectionKey) => {
    if (!nonEmpty(cv, k)) return null;
    switch (k) {
      case "summary":
        return (
          <Block key={k} title="Profielsamenvatting" accent={accent}>
            <p className="text-[12px] leading-relaxed">{cv.summary}</p>
          </Block>
        );
      case "experience":
        return (
          <Block key={k} title="Werkervaring" accent={accent}>
            <div className="space-y-3">
              {cv.experience.map((e) => (
                <div key={e.id}>
                  <div className="text-[13px] font-bold uppercase tracking-wide">
                    {e.company}
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[12px] italic">
                      {e.role}
                      {e.location && ` · ${e.location}`}
                    </div>
                    <div className="text-[11px]">
                      {dateRange(e.startDate, e.endDate, e.current)}
                    </div>
                  </div>
                  {e.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed">
                      {e.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
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
          <Block key={k} title="Opleiding" accent={accent}>
            <div className="space-y-2">
              {cv.education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[12px]">
                      <span className="font-bold">{ed.school}</span>
                      {ed.degree && ` — ${ed.degree}`}
                      {ed.field && `, ${ed.field}`}
                    </div>
                    <div className="text-[11px]">
                      {dateRange(ed.startDate, ed.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Block>
        );
      case "skills":
        return (
          <Block key={k} title="Kerncompetenties" accent={accent}>
            <div className="space-y-1 text-[12px]">
              {cv.skills.map((s) => (
                <div key={s.id}>
                  {s.category && <span className="font-bold">{s.category}: </span>}
                  {s.items}
                </div>
              ))}
            </div>
          </Block>
        );
      case "projects":
        return (
          <Block key={k} title="Geselecteerde projecten" accent={accent}>
            <div className="space-y-2 text-[12px]">
              {cv.projects.map((p) => (
                <div key={p.id}>
                  <div className="font-bold">
                    {p.name}
                    {p.link && (
                      <span className="ml-2 font-normal italic">{p.link}</span>
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
          <Block key={k} title="Talen" accent={accent}>
            <div className="text-[12px]">
              {cv.languages
                .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                .join(" · ")}
            </div>
          </Block>
        );
      case "certifications":
        return (
          <Block key={k} title="Certificaten" accent={accent}>
            <div className="space-y-0.5 text-[12px]">
              {cv.certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-bold">{c.name}</span>
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
    <article className="flex flex-1 flex-col p-10 text-neutral-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <header className="mb-4 text-center">
        <h1 className="text-[26px] font-bold uppercase tracking-[0.08em]">
          {cv.personal.fullName || "Jouw naam"}
        </h1>
        {cv.personal.title && (
          <div className="text-[13px] italic">{cv.personal.title}</div>
        )}
        <div className="mt-1.5 text-[11px]">
          {contactLine(cv).join("  ·  ")}
        </div>
        <div className="mt-2 h-[2px] w-full" style={{ background: accent }} />
      </header>
      <div className="my-auto space-y-4">{cv.sectionOrder.map(render)}</div>
      <PageFooter accent={accent} />
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
        className="mb-1.5 border-b pb-0.5 text-[12px] font-bold uppercase tracking-[0.14em]"
        style={{ borderColor: accent, color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
