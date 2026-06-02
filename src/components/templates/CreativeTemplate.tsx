import type { SectionKey } from "@/lib/cv-types";
import { contactLine, dateRange, nonEmpty, type TemplateProps } from "./shared";

export function CreativeTemplate({ cv }: TemplateProps) {
  const accent = cv.accentColor;
  const render = (k: SectionKey) => {
    if (!nonEmpty(cv, k)) return null;
    switch (k) {
      case "summary":
        return (
          <Block key={k} title="About" accent={accent}>
            <p className="text-[12px] leading-relaxed text-neutral-700">
              {cv.summary}
            </p>
          </Block>
        );
      case "experience":
        return (
          <Block key={k} title="Experience" accent={accent}>
            <div className="space-y-3">
              {cv.experience.map((e) => (
                <div key={e.id} className="relative pl-4">
                  <span
                    className="absolute left-0 top-[7px] h-2 w-2 rounded-full"
                    style={{ background: accent }}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <div className="text-[13px] font-bold text-neutral-900">
                      {e.role}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {dateRange(e.startDate, e.endDate, e.current)}
                    </div>
                  </div>
                  <div className="text-[12px] font-medium" style={{ color: accent }}>
                    {e.company}
                    {e.location && (
                      <span className="text-neutral-500"> · {e.location}</span>
                    )}
                  </div>
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
          </Block>
        );
      case "education":
        return (
          <Block key={k} title="Education" accent={accent}>
            <div className="space-y-2">
              {cv.education.map((ed) => (
                <div key={ed.id}>
                  <div className="text-[13px] font-bold">
                    {[ed.degree, ed.field].filter(Boolean).join(" · ")}
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-[12px] text-neutral-700">
                    <span>{ed.school}</span>
                    <span className="text-[11px] text-neutral-500">
                      {dateRange(ed.startDate, ed.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Block>
        );
      case "skills":
        return (
          <Block key={k} title="Skills" accent={accent}>
            <div className="flex flex-wrap gap-1.5">
              {cv.skills.flatMap((s) =>
                s.items
                  .split(",")
                  .map((it) => it.trim())
                  .filter(Boolean)
                  .map((it, i) => (
                    <span
                      key={`${s.id}-${i}`}
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ background: `${accent}18`, color: accent }}
                    >
                      {it}
                    </span>
                  )),
              )}
            </div>
          </Block>
        );
      case "projects":
        return (
          <Block key={k} title="Projects" accent={accent}>
            <div className="space-y-2">
              {cv.projects.map((p) => (
                <div key={p.id}>
                  <div className="text-[13px] font-bold">
                    {p.name}
                    {p.link && (
                      <span
                        className="ml-2 text-[11px] font-normal"
                        style={{ color: accent }}
                      >
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
          </Block>
        );
      case "languages":
        return (
          <Block key={k} title="Languages" accent={accent}>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
              {cv.languages.map((l) => (
                <span key={l.id}>
                  <span className="font-bold">{l.name}</span>
                  {l.level && <span className="text-neutral-500"> — {l.level}</span>}
                </span>
              ))}
            </div>
          </Block>
        );
      case "certifications":
        return (
          <Block key={k} title="Certifications" accent={accent}>
            <div className="space-y-0.5 text-[12px]">
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

  return (
    <article className="font-sans text-neutral-900">
      <header
        className="-mx-10 -mt-10 mb-5 px-10 pb-5 pt-8 text-white"
        style={{ background: accent }}
      >
        <h1 className="text-[28px] font-extrabold leading-tight">
          {cv.personal.fullName || "Your Name"}
        </h1>
        {cv.personal.title && (
          <div className="text-[14px] opacity-90">{cv.personal.title}</div>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] opacity-90">
          {contactLine(cv).map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>
      <div className="space-y-4">{cv.sectionOrder.map(render)}</div>
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
        className="mb-2 text-[14px] font-extrabold"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
