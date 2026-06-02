import * as React from "react";
import type { CV, SectionKey } from "@/lib/cv-types";
import { dateRange, nonEmpty } from "./shared";

export type HeadingStyle =
  | "uppercase-thin"
  | "bold-large"
  | "underline"
  | "side-bar"
  | "serif-caps"
  | "filled-pill";

export interface BlockOpts {
  accent: string;
  heading?: HeadingStyle;
  textColor?: string;
  mutedColor?: string;
}

export function Heading({
  children,
  opts,
}: {
  children: React.ReactNode;
  opts: BlockOpts;
}) {
  const { accent, heading = "uppercase-thin" } = opts;
  switch (heading) {
    case "bold-large":
      return (
        <h2
          className="mb-2 text-[15px] font-extrabold"
          style={{ color: accent }}
        >
          {children}
        </h2>
      );
    case "underline":
      return (
        <h2
          className="mb-2 border-b pb-1 text-[12px] font-bold uppercase tracking-[0.16em]"
          style={{ color: accent, borderColor: accent }}
        >
          {children}
        </h2>
      );
    case "side-bar":
      return (
        <h2
          className="relative mb-2 pl-3 text-[12px] font-bold uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          <span
            className="absolute left-0 top-1/2 h-3 w-1 -translate-y-1/2 rounded-sm"
            style={{ background: accent }}
          />
          {children}
        </h2>
      );
    case "serif-caps":
      return (
        <h2
          className="mb-2 text-[13px] font-bold uppercase tracking-[0.2em]"
          style={{
            color: accent,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {children}
        </h2>
      );
    case "filled-pill":
      return (
        <h2
          className="mb-2 inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
          style={{ background: accent }}
        >
          {children}
        </h2>
      );
    default:
      return (
        <h2
          className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          {children}
        </h2>
      );
  }
}

export function SummaryBlock({
  cv,
  opts,
  title = "Samenvatting",
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "summary")) return null;
  return (
    <section>
      <Heading opts={opts}>{title}</Heading>
      <p
        className="text-[12px] leading-relaxed"
        style={{ color: opts.textColor ?? "#3a3a3a" }}
      >
        {cv.summary}
      </p>
    </section>
  );
}

export function ExperienceBlock({
  cv,
  opts,
  title = "Werkervaring",
  compact = false,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
  compact?: boolean;
}) {
  if (!nonEmpty(cv, "experience")) return null;
  return (
    <section>
      <Heading opts={opts}>{title}</Heading>
      <div className={compact ? "space-y-2" : "space-y-3"}>
        {cv.experience.map((e) => (
          <div key={e.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <div
                className="text-[13px] font-semibold"
                style={{ color: opts.textColor }}
              >
                {e.role}
                {e.company && (
                  <span style={{ color: opts.accent }}> · {e.company}</span>
                )}
              </div>
              <div
                className="text-[11px]"
                style={{ color: opts.mutedColor ?? "#6b6b6b" }}
              >
                {dateRange(e.startDate, e.endDate, e.current)}
              </div>
            </div>
            {e.location && (
              <div
                className="text-[11px]"
                style={{ color: opts.mutedColor ?? "#6b6b6b" }}
              >
                {e.location}
              </div>
            )}
            {e.bullets.filter(Boolean).length > 0 && (
              <ul
                className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed"
                style={{ color: opts.textColor ?? "#3a3a3a" }}
              >
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

export function EducationBlock({
  cv,
  opts,
  title = "Opleiding",
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "education")) return null;
  return (
    <section>
      <Heading opts={opts}>{title}</Heading>
      <div className="space-y-2">
        {cv.education.map((ed) => (
          <div key={ed.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <div
                className="text-[13px] font-semibold"
                style={{ color: opts.textColor }}
              >
                {[ed.degree, ed.field].filter(Boolean).join(" · ") || ed.school}
              </div>
              <div
                className="text-[11px]"
                style={{ color: opts.mutedColor ?? "#6b6b6b" }}
              >
                {dateRange(ed.startDate, ed.endDate)}
              </div>
            </div>
            <div
              className="text-[12px]"
              style={{ color: opts.mutedColor ?? "#6b6b6b" }}
            >
              {ed.school}
            </div>
            {ed.description && (
              <div className="text-[11px] italic" style={{ color: opts.mutedColor }}>
                {ed.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillsBlock({
  cv,
  opts,
  title = "Vaardigheden",
  chips = false,
  inline = false,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
  chips?: boolean;
  inline?: boolean;
}) {
  if (!nonEmpty(cv, "skills")) return null;
  if (chips) {
    return (
      <section>
        <Heading opts={opts}>{title}</Heading>
        <div className="flex flex-wrap gap-1.5">
          {cv.skills.flatMap((s) =>
            s.items
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean)
              .map((x, i) => (
                <span
                  key={`${s.id}-${i}`}
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{ background: `${opts.accent}18`, color: opts.accent }}
                >
                  {x}
                </span>
              )),
          )}
        </div>
      </section>
    );
  }
  return (
    <section>
      <Heading opts={opts}>{title}</Heading>
      <div className={inline ? "text-[12px]" : "space-y-1 text-[12px]"}>
        {cv.skills.map((s) => (
          <div key={s.id} style={{ color: opts.textColor ?? "#3a3a3a" }}>
            {s.category && <strong>{s.category}: </strong>}
            {s.items}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsBlock({
  cv,
  opts,
  title = "Projecten",
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "projects")) return null;
  return (
    <section>
      <Heading opts={opts}>{title}</Heading>
      <div className="space-y-2">
        {cv.projects.map((p) => (
          <div key={p.id}>
            <div
              className="text-[13px] font-semibold"
              style={{ color: opts.textColor }}
            >
              {p.name}
              {p.link && (
                <span
                  className="ml-2 text-[11px] font-normal"
                  style={{ color: opts.accent }}
                >
                  {p.link}
                </span>
              )}
            </div>
            {p.description && (
              <p
                className="text-[12px]"
                style={{ color: opts.textColor ?? "#3a3a3a" }}
              >
                {p.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function LanguagesBlock({
  cv,
  opts,
  title = "Talen",
  stacked = false,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
  stacked?: boolean;
}) {
  if (!nonEmpty(cv, "languages")) return null;
  return (
    <section>
      <Heading opts={opts}>{title}</Heading>
      {stacked ? (
        <div className="space-y-0.5 text-[12px]">
          {cv.languages.map((l) => (
            <div key={l.id}>
              <strong>{l.name}</strong>
              {l.level && (
                <span style={{ color: opts.mutedColor ?? "#6b6b6b" }}>
                  {" "}— {l.level}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-[12px]"
          style={{ color: opts.textColor ?? "#3a3a3a" }}
        >
          {cv.languages
            .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
            .join(" · ")}
        </div>
      )}
    </section>
  );
}

export function CertificationsBlock({
  cv,
  opts,
  title = "Certificaten",
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "certifications")) return null;
  return (
    <section>
      <Heading opts={opts}>{title}</Heading>
      <div className="space-y-0.5 text-[12px]">
        {cv.certifications.map((c) => (
          <div
            key={c.id}
            className="flex flex-wrap items-baseline justify-between gap-x-3"
            style={{ color: opts.textColor ?? "#3a3a3a" }}
          >
            <span>
              <strong>{c.name}</strong>
              {c.issuer && ` · ${c.issuer}`}
            </span>
            {c.date && (
              <span
                className="text-[11px]"
                style={{ color: opts.mutedColor ?? "#6b6b6b" }}
              >
                {c.date}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function PhotoFrame({
  src,
  size = 96,
  shape = "circle",
  borderColor,
  className = "",
}: {
  src?: string;
  size?: number;
  shape?: "circle" | "square" | "rounded" | "wedge";
  borderColor?: string;
  className?: string;
}) {
  const radius =
    shape === "circle"
      ? "9999px"
      : shape === "rounded"
        ? "12px"
        : shape === "wedge"
          ? "999px 999px 12px 12px"
          : "0";
  return (
    <div
      className={`shrink-0 overflow-hidden bg-[#f4f3ee] ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        border: borderColor ? `3px solid ${borderColor}` : undefined,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-wider text-[#bcbcbc]">
          Photo
        </div>
      )}
    </div>
  );
}

export interface SectionRenderer {
  (key: SectionKey, opts: BlockOpts, cv: CV): React.ReactNode;
}

export function defaultRenderer(
  key: SectionKey,
  opts: BlockOpts,
  cv: CV,
): React.ReactNode {
  switch (key) {
    case "summary":
      return <SummaryBlock key={key} cv={cv} opts={opts} />;
    case "experience":
      return <ExperienceBlock key={key} cv={cv} opts={opts} />;
    case "education":
      return <EducationBlock key={key} cv={cv} opts={opts} />;
    case "skills":
      return <SkillsBlock key={key} cv={cv} opts={opts} />;
    case "projects":
      return <ProjectsBlock key={key} cv={cv} opts={opts} />;
    case "languages":
      return <LanguagesBlock key={key} cv={cv} opts={opts} />;
    case "certifications":
      return <CertificationsBlock key={key} cv={cv} opts={opts} />;
  }
}
