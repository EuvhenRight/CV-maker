import * as React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
  Code as CodeIcon,
  type LucideIcon,
} from "lucide-react";
import type { CV, SectionKey } from "@/lib/cv-types";
import { translate, type Locale } from "@/lib/i18n";
import {
  contactHref,
  contactItems,
  dateRange,
  linkLabel,
  nonEmpty,
  normalizeUrl,
  personalDetailItems,
  resolveSkills,
  resolveStrengths,
  type ContactItem,
  type ContactKind,
} from "./shared";

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
  lang?: Locale;
}

function langOf(opts: BlockOpts): Locale {
  return opts.lang ?? "nl";
}

// A hyperlink that stays visually identical to surrounding text (colour and
// decoration inherit unless overridden). The `data-pdf-link` attribute lets the
// PDF exporter (lib/pdf.ts) overlay a real clickable annotation at this spot,
// while the plain <a> keeps it clickable on screen and via browser print.
export function PdfLink({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const external = /^https?:/i.test(href);
  return (
    <a
      href={href}
      data-pdf-link={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      style={{ color: "inherit", textDecoration: "none", ...style }}
    >
      {children}
    </a>
  );
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
          className="mb-2 text-[15px] font-extrabold break-words"
          style={{ color: accent }}
        >
          {children}
        </h2>
      );
    case "underline":
      return (
        <h2
          className="mb-2 border-b pb-1 text-[12px] font-bold uppercase tracking-[0.16em] break-words"
          style={{ color: accent, borderColor: accent }}
        >
          {children}
        </h2>
      );
    case "side-bar":
      return (
        <h2
          className="relative mb-2 pl-3 text-[12px] font-bold uppercase tracking-[0.14em] break-words"
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
          className="mb-2 text-[13px] font-bold uppercase tracking-[0.2em] break-words"
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
          className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] break-words"
          style={{ color: accent }}
        >
          {children}
        </h2>
      );
  }
}

// Renders a project's links as labelled, clickable marks — e.g.
// "Live: myproject.com   GitHub: github.com/…" — so a reader can tell the live
// site from the source repo. The URL text is the clickable target (and carries
// the data-pdf-link marker); the label in front is a plain descriptor.
export function ProjectLinks({
  link,
  github,
  color,
  className = "text-[11px] font-normal break-all",
}: {
  link?: string;
  github?: string;
  color?: string;
  className?: string;
}) {
  const marks: Array<{ mark: string; url: string }> = [];
  if (link) marks.push({ mark: "Live", url: link });
  if (github) marks.push({ mark: "GitHub", url: github });
  if (marks.length === 0) return null;
  const colorStyle = color ? { color } : undefined;
  return (
    <>
      {marks.map(({ mark, url }) => (
        <span key={mark} className="ml-2">
          <span className="font-semibold" style={colorStyle}>
            {mark}:
          </span>{" "}
          <PdfLink href={normalizeUrl(url)} className={className} style={colorStyle}>
            {linkLabel(url)}
          </PdfLink>
        </span>
      ))}
    </>
  );
}

export function SummaryBlock({
  cv,
  opts,
  title,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "summary")) return null;
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(langOf(opts), "tpl.section.summary")}
      </Heading>
      <p
        className="text-[12px] leading-relaxed whitespace-pre-wrap break-words"
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
  title,
  compact = false,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
  compact?: boolean;
}) {
  if (!nonEmpty(cv, "experience")) return null;
  const lang = langOf(opts);
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(lang, "tpl.section.experience")}
      </Heading>
      <div className={compact ? "space-y-2" : "space-y-3"}>
        {cv.experience.map((e) => (
          <div key={e.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <div
                className="text-[13px] font-semibold break-words"
                style={{ color: opts.textColor }}
              >
                {e.role}
                {e.company && (
                  <span style={{ color: opts.accent }}> · {e.company}</span>
                )}
              </div>
              <div
                className="text-[11px] whitespace-nowrap"
                style={{ color: opts.mutedColor ?? "#6b6b6b" }}
              >
                {dateRange(e.startDate, e.endDate, e.current, lang)}
              </div>
            </div>
            {e.location && (
              <div
                className="text-[11px] break-words"
                style={{ color: opts.mutedColor ?? "#6b6b6b" }}
              >
                {e.location}
              </div>
            )}
            {e.bullets.filter(Boolean).length > 0 && (
              <ul
                className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed break-words"
                style={{ color: opts.textColor ?? "#3a3a3a" }}
              >
                {e.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="whitespace-pre-wrap">
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

export function EducationBlock({
  cv,
  opts,
  title,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "education")) return null;
  const lang = langOf(opts);
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(lang, "tpl.section.education")}
      </Heading>
      <div className="space-y-2">
        {cv.education.map((ed) => (
          <div key={ed.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <div
                className="text-[13px] font-semibold break-words"
                style={{ color: opts.textColor }}
              >
                {[ed.degree, ed.field].filter(Boolean).join(" · ") || ed.school}
              </div>
              <div
                className="text-[11px] whitespace-nowrap"
                style={{ color: opts.mutedColor ?? "#6b6b6b" }}
              >
                {dateRange(ed.startDate, ed.endDate, undefined, lang)}
              </div>
            </div>
            <div
              className="text-[12px] break-words"
              style={{ color: opts.mutedColor ?? "#6b6b6b" }}
            >
              {ed.school}
            </div>
            {ed.description && (
              <div
                className="text-[11px] italic break-words"
                style={{ color: opts.mutedColor }}
              >
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
  title,
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
  const lang = langOf(opts);
  const labels = resolveSkills(cv, lang);
  if (chips) {
    return (
      <section>
        <Heading opts={opts}>
          {title ?? translate(lang, "tpl.section.skills")}
        </Heading>
        <div className="flex flex-wrap gap-1.5">
          {labels.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="rounded-full px-2 py-0.5 text-[11px] font-medium break-words"
              style={{ background: `${opts.accent}18`, color: opts.accent }}
            >
              {label}
            </span>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(lang, "tpl.section.skills")}
      </Heading>
      <div
        className={
          inline
            ? "text-[12px] break-words"
            : "text-[12px] leading-relaxed break-words"
        }
        style={{ color: opts.textColor ?? "#3a3a3a" }}
      >
        {labels.join(" · ")}
      </div>
    </section>
  );
}

export function StrengthsBlock({
  cv,
  opts,
  title,
  chips = false,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
  chips?: boolean;
}) {
  if (!nonEmpty(cv, "strengths")) return null;
  const lang = langOf(opts);
  const labels = resolveStrengths(cv, lang);
  if (chips) {
    return (
      <section>
        <Heading opts={opts}>
          {title ?? translate(lang, "tpl.section.strengths")}
        </Heading>
        <div className="flex flex-wrap gap-1.5">
          {labels.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="rounded-full px-2 py-0.5 text-[11px] font-medium break-words"
              style={{ background: `${opts.accent}18`, color: opts.accent }}
            >
              {label}
            </span>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(lang, "tpl.section.strengths")}
      </Heading>
      <div
        className="text-[12px] leading-relaxed break-words"
        style={{ color: opts.textColor ?? "#3a3a3a" }}
      >
        {labels.join(" · ")}
      </div>
    </section>
  );
}

export function ProjectsBlock({
  cv,
  opts,
  title,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "projects")) return null;
  const lang = langOf(opts);
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(lang, "tpl.section.projects")}
      </Heading>
      <div className="space-y-2">
        {cv.projects.map((p) => (
          <div key={p.id}>
            <div
              className="text-[13px] font-semibold break-words"
              style={{ color: opts.textColor }}
            >
              {p.name}
              <ProjectLinks
                link={p.link}
                github={p.github}
                color={opts.accent}
              />
            </div>
            {p.description && (
              <p
                className="text-[12px] break-words"
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
  title,
  stacked = false,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
  stacked?: boolean;
}) {
  if (!nonEmpty(cv, "languages")) return null;
  const lang = langOf(opts);
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(lang, "tpl.section.languages")}
      </Heading>
      {stacked ? (
        <div className="space-y-0.5 text-[12px] break-words">
          {cv.languages.map((l) => (
            <div key={l.id}>
              <strong>{l.name}</strong>
              {l.level && (
                <span style={{ color: opts.mutedColor ?? "#6b6b6b" }}>
                  {" "}
                  — {l.level}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-[12px] break-words"
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
  title,
}: {
  cv: CV;
  opts: BlockOpts;
  title?: string;
}) {
  if (!nonEmpty(cv, "certifications")) return null;
  const lang = langOf(opts);
  return (
    <section>
      <Heading opts={opts}>
        {title ?? translate(lang, "tpl.section.certifications")}
      </Heading>
      <div className="space-y-0.5 text-[12px]">
        {cv.certifications.map((c) => (
          <div
            key={c.id}
            className="flex flex-wrap items-baseline justify-between gap-x-3 break-words"
            style={{ color: opts.textColor ?? "#3a3a3a" }}
          >
            <span>
              <strong>
                {c.link ? (
                  <PdfLink
                    href={normalizeUrl(c.link)}
                    style={{ color: opts.accent }}
                  >
                    {c.name}
                  </PdfLink>
                ) : (
                  c.name
                )}
              </strong>
              {c.issuer && ` · ${c.issuer}`}
            </span>
            {c.date && (
              <span
                className="text-[11px] whitespace-nowrap"
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

export function PageFooter({}: {
  accent?: string;
  variant?: "light" | "dark";
  lang?: Locale;
} = {}) {
  return <div className="mt-auto" />;
}

export function PhotoFrame({
  src,
  size = 96,
  shape = "circle",
  borderColor,
  className = "",
  lang = "nl",
  hidden = false,
}: {
  src?: string;
  size?: number;
  shape?: "circle" | "square" | "rounded" | "wedge";
  borderColor?: string;
  className?: string;
  lang?: Locale;
  hidden?: boolean;
}) {
  if (hidden) return null;
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
          alt={translate(lang, "personal.photo.alt")}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-wider text-[#bcbcbc]">
          {translate(lang, "tpl.photo.placeholder")}
        </div>
      )}
    </div>
  );
}

const ICONS: Record<ContactKind, LucideIcon> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  website: Globe,
  linkedin: LinkIcon,
  github: CodeIcon,
};

export type ContactLayout = "inline" | "rows" | "labeled-rows" | "iconRows";

export function ContactRows({
  cv,
  lang = "nl",
  layout = "labeled-rows",
  color,
  accent,
  iconSize = 11,
  className = "",
}: {
  cv: CV;
  lang?: Locale;
  layout?: ContactLayout;
  color?: string;
  accent?: string;
  iconSize?: number;
  className?: string;
}) {
  const items = contactItems(cv, lang);
  if (items.length === 0) return null;

  // Email → mailto:, phone → tel:, website/linkedin → https:// — all clickable.
  const renderValue = (c: ContactItem): React.ReactNode => {
    const href = contactHref(c.kind, c.value);
    return href ? <PdfLink href={href}>{c.value}</PdfLink> : c.value;
  };

  if (layout === "inline") {
    return (
      <div
        className={`flex flex-wrap gap-x-3 gap-y-1 text-[11px] ${className}`}
        style={{ color }}
      >
        {items.map((c) => {
          const Icon = ICONS[c.kind];
          return (
            <span
              key={c.kind}
              className="inline-flex items-center gap-1 break-all"
            >
              <Icon
                style={{ width: iconSize, height: iconSize, color: accent ?? color }}
              />
              <span>{renderValue(c)}</span>
            </span>
          );
        })}
      </div>
    );
  }

  if (layout === "iconRows") {
    return (
      <div className={`space-y-1 text-[11px] ${className}`} style={{ color }}>
        {items.map((c) => {
          const Icon = ICONS[c.kind];
          return (
            <div
              key={c.kind}
              className="flex items-start gap-2 break-all"
            >
              <Icon
                className="mt-0.5 shrink-0"
                style={{ width: iconSize, height: iconSize, color: accent ?? color }}
              />
              <span>{renderValue(c)}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (layout === "rows") {
    return (
      <div className={`space-y-0.5 text-[11px] ${className}`} style={{ color }}>
        {items.map((c) => (
          <div key={c.kind} className="break-all">
            {renderValue(c)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-0.5 text-[11px] ${className}`} style={{ color }}>
      {items.map((c) => (
        <div
          key={c.kind}
          className="grid grid-cols-[auto_1fr] gap-x-1.5 break-all"
        >
          <span
            className="font-semibold uppercase tracking-wider text-[10px]"
            style={{ color: accent }}
          >
            {c.label}:
          </span>
          <span>{renderValue(c)}</span>
        </div>
      ))}
    </div>
  );
}

export type PersonalDetailsLayout = "inline" | "labeled-rows";

export function PersonalDetails({
  cv,
  lang = "nl",
  layout = "inline",
  color,
  accent,
  className = "",
}: {
  cv: CV;
  lang?: Locale;
  layout?: PersonalDetailsLayout;
  color?: string;
  accent?: string;
  className?: string;
}) {
  const items = personalDetailItems(cv, lang);
  if (items.length === 0) return null;

  if (layout === "inline") {
    return (
      <div
        className={`flex flex-wrap gap-x-3 gap-y-1 text-[11px] ${className}`}
        style={{ color }}
      >
        {items.map((it) => (
          <span key={it.kind} className="inline-flex items-baseline gap-1 break-words">
            <span
              className="font-semibold"
              style={{ color: accent ?? color }}
            >
              {it.label}:
            </span>
            <span>{it.value}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-0.5 text-[11px] ${className}`} style={{ color }}>
      {items.map((it) => (
        <div
          key={it.kind}
          className="grid grid-cols-[auto_1fr] gap-x-1.5 break-words"
        >
          <span
            className="font-semibold uppercase tracking-wider text-[10px]"
            style={{ color: accent }}
          >
            {it.label}:
          </span>
          <span>{it.value}</span>
        </div>
      ))}
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
    case "strengths":
      return <StrengthsBlock key={key} cv={cv} opts={opts} />;
    case "projects":
      return <ProjectsBlock key={key} cv={cv} opts={opts} />;
    case "languages":
      return <LanguagesBlock key={key} cv={cv} opts={opts} />;
    case "certifications":
      return <CertificationsBlock key={key} cv={cv} opts={opts} />;
  }
}
