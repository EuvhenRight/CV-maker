"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Camera,
  FileText,
  Languages,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { TEMPLATE_IDS, TEMPLATE_META } from "@/components/templates";
import {
  LOCALES,
  LOCALE_LABELS,
  useLocale,
  type Locale,
} from "@/lib/i18n";

const INDUSTRY_TEMPLATES = TEMPLATE_IDS.filter(
  (id) => TEMPLATE_META[id].category === "industry",
);
const CLASSIC_TEMPLATES = TEMPLATE_IDS.filter(
  (id) => TEMPLATE_META[id].category === "classic",
);

export default function HomePage() {
  const { t, locale, setLocale } = useLocale();
  const features = [
    {
      icon: Zap,
      title: t("features.fast.title"),
      body: t("features.fast.body"),
    },
    {
      icon: ShieldCheck,
      title: t("features.ats.title"),
      body: t("features.ats.body"),
    },
    {
      icon: Camera,
      title: t("features.photo.title"),
      body: t("features.photo.body"),
    },
    {
      icon: FileText,
      title: t("features.pdf.title"),
      body: t("features.pdf.body"),
    },
  ];

  const usps = [
    t("hero.usp.free"),
    t("hero.usp.noAccount"),
    t("hero.usp.autosave"),
    t("hero.usp.atsFriendly"),
    t("hero.usp.withPhoto"),
    t("hero.usp.pdfExport"),
  ];

  return (
    <div className="min-h-screen bg-[#F0EFEA] text-[#1A1919]">
      <header className="border-b border-[#e8e6df] bg-[#F0EFEA]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span
              className="inline-block h-3.5 w-3.5 rounded-full"
              style={{ background: "#A3CBA9" }}
            />
            Maak<span className="text-[#7FA689]">MijnCV</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-[#3a3a3a] sm:gap-5">
            <a
              href="#features"
              className="hidden hover:text-[#1A1919] sm:inline"
            >
              {t("nav.features")}
            </a>
            <a
              href="#templates"
              className="hidden hover:text-[#1A1919] sm:inline"
            >
              {t("nav.templates")}
            </a>
            <LanguageSwitcher locale={locale} setLocale={setLocale} />
            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#A3CBA9] px-4 py-1.5 font-display text-sm font-semibold text-[#1A1919] shadow-sm transition-colors hover:bg-[#7fa689] hover:text-white"
            >
              {t("nav.openEditor")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e6df] bg-white px-3 py-1 text-xs font-medium text-[#3a3a3a]">
              <Sparkles className="h-3.5 w-3.5 text-[#7FA689]" />
              {t("hero.badge")}
            </span>
            <h1 className="font-display mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {t("hero.title1")}
              <span className="text-[#7FA689]">{t("hero.titleHighlight")}</span>
              {t("hero.title2")}
            </h1>
            <p className="mt-4 max-w-xl text-base text-[#444]">
              {t("hero.subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-full bg-[#A3CBA9] px-5 py-3 font-display text-sm font-semibold text-[#1A1919] shadow-sm transition-colors hover:bg-[#7fa689] hover:text-white"
              >
                {t("nav.startFree")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 rounded-full border border-[#e8e6df] bg-white px-5 py-3 font-display text-sm font-semibold text-[#1A1919] hover:bg-white/70"
              >
                {t("nav.viewTemplates")}
              </a>
            </div>
            <ul className="mt-7 flex max-w-2xl flex-wrap gap-x-5 gap-y-1 text-xs text-[#666]">
              {usps.map((x) => (
                <li key={x} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#7FA689]" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <HeroPreview />
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-[#e8e6df] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {t("features.title")}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#555]">
            {t("features.subtitle")}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[#e8e6df] bg-[#F0EFEA] p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A3CBA9]/25 text-[#5b8166]">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="font-display mt-3 text-sm font-bold">
                  {f.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#555]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="border-b border-[#e8e6df]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {t("templates.title")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#555]">
                {t("templates.subtitle")}
              </p>
            </div>
            <Link
              href="/builder"
              className="hidden text-sm font-semibold text-[#7FA689] hover:underline sm:inline"
            >
              {t("nav.openEditorArrow")}
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRY_TEMPLATES.map((id) => (
              <TemplateCard key={id} id={id} photoBadge={t("templates.photoBadge")} />
            ))}
          </div>
          <div className="mt-12">
            <h3 className="font-display text-base font-bold uppercase tracking-[0.16em] text-[#6b6b6b]">
              {t("templates.classicTitle")}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {CLASSIC_TEMPLATES.map((id) => (
                <TemplateCard key={id} id={id} photoBadge={t("templates.photoBadge")} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1919] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold">
              {t("cta.title")}
            </h3>
            <p className="text-sm text-[#cbcbcb]">{t("cta.subtitle")}</p>
          </div>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-full bg-[#A3CBA9] px-5 py-3 font-display text-sm font-semibold text-[#1A1919] shadow-sm transition-colors hover:bg-[#7fa689] hover:text-white"
          >
            {t("cta.button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#e8e6df] bg-[#F0EFEA]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-[#7a7a7a] sm:px-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
          <div>
            © {new Date().getFullYear()} MaakMijnCV · {t("footer.copy")}{" "}
            <a
              href="https://cybersoek.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7FA689] hover:underline"
            >
              cybersoek.nl
            </a>
            {" · "}
            <a
              href="https://github.com/EuvhenRight/CV-maker/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7FA689] hover:underline"
            >
              MIT
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{t("footer.craftedBy")}</span>
            <a
              href="https://github.com/EuvhenRight"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.viewGithub")}
              className="inline-flex items-center gap-1 rounded-full border border-[#e8e6df] bg-white px-2.5 py-1 font-medium text-[#1A1919] transition-colors hover:border-[#A3CBA9] hover:text-[#7FA689]"
            >
              <GitHubMark className="h-3 w-3" />
              Yevhen Uhnivenko
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LanguageSwitcher({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <label className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e8e6df] bg-white px-3 py-1 text-xs font-medium text-[#3a3a3a]">
      <Languages className="h-3.5 w-3.5 text-[#7FA689]" />
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="bg-transparent text-xs font-medium focus:outline-none"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
    </label>
  );
}

function TemplateCard({
  id,
  photoBadge,
}: {
  id: keyof typeof TEMPLATE_META;
  photoBadge: string;
}) {
  const meta = TEMPLATE_META[id];
  return (
    <Link
      href="/builder"
      className="group block overflow-hidden rounded-xl border border-[#e8e6df] bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[210/297] overflow-hidden bg-[#F8F8F8]">
        <TemplateThumb id={id} />
        {meta.hasPhoto && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#A3CBA9] px-2 py-0.5 text-[10px] font-semibold text-[#1A1919] shadow-sm">
            <Camera className="h-2.5 w-2.5" />
            {photoBadge}
          </span>
        )}
      </div>
      <div className="px-3 py-2.5">
        <div className="font-display text-sm font-semibold leading-tight break-words">
          {meta.name}
        </div>
        {meta.industry && (
          <div className="text-[11px] text-[#7a7a7a]">{meta.industry}</div>
        )}
      </div>
    </Link>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#A3CBA9]/30 blur-2xl" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#A3CBA9]/30 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-[#e8e6df] bg-white shadow-xl">
        <div className="grid grid-cols-[80px_1fr]">
          <div className="space-y-2 bg-[#1F2933] p-4 text-white">
            <div className="mx-auto h-12 w-12 rounded-full bg-[#A3CBA9]" />
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-white/40" />
              <div className="h-1 w-4/5 rounded bg-white/30" />
              <div className="h-1 w-3/4 rounded bg-white/30" />
            </div>
            <div className="mt-3 space-y-0.5">
              <div className="h-1.5 w-1/2 rounded bg-[#A3CBA9]" />
              <div className="h-1 w-full rounded bg-white/30" />
              <div className="h-1 w-3/4 rounded bg-white/30" />
            </div>
          </div>
          <div className="space-y-2 p-4">
            <div className="h-3 w-2/3 rounded bg-[#1A1919]" />
            <div className="h-1.5 w-1/2 rounded bg-[#A3CBA9]" />
            <div className="mt-3 space-y-1">
              <div className="h-1.5 w-1/3 rounded bg-[#A3CBA9]" />
              <div className="h-1 w-full rounded bg-[#e8e6df]" />
              <div className="h-1 w-5/6 rounded bg-[#e8e6df]" />
              <div className="h-1 w-3/4 rounded bg-[#e8e6df]" />
            </div>
            <div className="mt-3 space-y-1">
              <div className="h-1.5 w-1/3 rounded bg-[#A3CBA9]" />
              <div className="h-1 w-full rounded bg-[#e8e6df]" />
              <div className="h-1 w-2/3 rounded bg-[#e8e6df]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateThumb({ id }: { id: keyof typeof TEMPLATE_META }) {
  switch (id) {
    case "tech":
      return (
        <div className="grid h-full grid-cols-[40%_1fr]">
          <div className="space-y-1.5 bg-[#101418] p-2 text-white">
            <div className="mx-auto h-8 w-8 rounded-full bg-[#A3CBA9]" />
            <div className="h-0.5 w-2/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-white/30" />
            <div className="h-0.5 w-5/6 rounded bg-white/30" />
            <div className="mt-1 flex flex-wrap gap-0.5">
              <span className="h-1 w-4 rounded-full bg-[#A3CBA9]/60" />
              <span className="h-1 w-3 rounded-full bg-[#A3CBA9]/60" />
              <span className="h-1 w-5 rounded-full bg-[#A3CBA9]/60" />
            </div>
          </div>
          <div className="space-y-1 p-2">
            <div className="h-2 w-3/4 rounded bg-[#1A1919]" />
            <div className="h-1 w-1/2 rounded bg-[#A3CBA9]" />
            <div className="mt-1.5 h-1 w-1/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "delivery":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1.5 bg-[#A3CBA9] p-2 text-[#1A1919]">
            <div className="h-6 w-6 rounded-md bg-white" />
            <div className="flex-1 space-y-0.5">
              <div className="h-1.5 w-3/4 rounded bg-[#1A1919]" />
              <div className="h-0.5 w-1/2 rounded bg-[#1A1919]/60" />
            </div>
          </div>
          <div className="flex-1 space-y-1 p-2">
            <div className="h-1 w-1/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "housekeeping":
      return (
        <div className="flex h-full flex-col p-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#F4F1EA] p-1.5">
            <div className="h-6 w-6 rounded-full border-2 border-[#A3CBA9] bg-white" />
            <div className="flex-1 space-y-0.5">
              <div className="h-1.5 w-3/4 rounded bg-[#7FA689]" />
              <div className="h-0.5 w-1/2 rounded bg-[#888]" />
            </div>
          </div>
          <div className="mt-1.5 space-y-1">
            <div className="h-1 w-1/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "hospitality":
      return (
        <div className="flex h-full flex-col items-center p-2">
          <div className="h-7 w-7 rounded-full border-2 border-[#A3CBA9] bg-white" />
          <div className="mt-1 h-1.5 w-2/3 rounded bg-[#1A1919]" />
          <div className="h-0.5 w-1/3 rounded bg-[#A3CBA9]" />
          <div className="mt-1 h-px w-8 bg-[#A3CBA9]" />
          <div className="mt-1.5 w-full space-y-0.5">
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "healthcare":
      return (
        <div className="grid h-full grid-cols-[1fr_38%] gap-1 p-2">
          <div className="space-y-1">
            <div className="h-2 w-2/3 rounded bg-[#1A1919]" />
            <div className="h-1 w-1/2 rounded bg-[#0087FF]" />
            <div className="mt-1 h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
          <div className="rounded bg-[#f0f6fb] p-1">
            <div className="mx-auto h-6 w-6 rounded-full border-2 border-[#0087FF] bg-white" />
            <div className="mt-1 h-0.5 w-2/3 rounded bg-[#0087FF]" />
            <div className="h-0.5 w-full rounded bg-[#cdd5db]" />
          </div>
        </div>
      );
    case "construction":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1.5 bg-[#1F2933] p-2 text-white">
            <div className="h-7 w-7 rounded-sm border-2 border-[#A3CBA9] bg-white" />
            <div className="flex-1 space-y-0.5">
              <div className="h-1.5 w-full rounded bg-white" />
              <div className="h-0.5 w-1/2 rounded bg-[#A3CBA9]" />
            </div>
          </div>
          <div className="flex-1 space-y-1 p-2">
            <div className="inline-block h-1.5 w-1/4 rounded-full bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "retail":
      return (
        <div className="flex h-full flex-col p-2">
          <div className="flex gap-1.5">
            <div className="h-7 w-7 rounded-md border-2 border-[#A3CBA9] bg-white" />
            <div className="flex-1 space-y-0.5">
              <div className="h-0.5 w-1/3 rounded bg-[#A3CBA9]" />
              <div className="h-1.5 w-2/3 rounded bg-[#1A1919]" />
              <div className="h-0.5 w-1/2 rounded bg-[#888]" />
            </div>
          </div>
          <div className="my-1 h-1 w-full rounded-full bg-[#A3CBA9]/30">
            <div className="h-full w-3/5 rounded-full bg-[#A3CBA9]" />
          </div>
          <div className="space-y-0.5">
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-3/4 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "education":
      return (
        <div className="flex h-full flex-col p-2">
          <div className="flex items-center gap-1.5 rounded bg-[#FAF6EE] p-1.5">
            <div className="h-7 w-7 rounded-md border-2 border-[#A3CBA9] bg-white" />
            <div className="flex-1 space-y-0.5">
              <div className="h-1.5 w-3/4 rounded bg-[#1A1919]" />
              <div className="h-0.5 w-1/2 rounded bg-[#7FA689]" />
            </div>
          </div>
          <div className="mt-1.5 space-y-0.5">
            <div className="h-0.5 w-1/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "creative-bold":
      return (
        <div className="flex h-full flex-col">
          <div
            className="flex items-center gap-1.5 p-2 text-[#1A1919]"
            style={{
              background:
                "linear-gradient(135deg,#A3CBA9 0%,#7FA689 60%,#1A1919 100%)",
            }}
          >
            <div className="h-7 w-7 rounded-full border-2 border-[#1A1919] bg-white/60" />
            <div className="flex-1 space-y-0.5">
              <div className="h-2 w-3/4 rounded bg-[#1A1919]" />
              <div className="h-0.5 w-1/2 rounded bg-[#1A1919]/70" />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-[1fr_38%] gap-1 p-2">
            <div className="space-y-0.5">
              <div className="h-1 w-1/3 rounded bg-[#A3CBA9]" />
              <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
              <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
            </div>
            <div className="space-y-0.5 border-l border-[#A3CBA9]/30 pl-1">
              <div className="flex flex-wrap gap-0.5">
                <span className="h-1 w-3 rounded-full bg-[#A3CBA9]/50" />
                <span className="h-1 w-4 rounded-full bg-[#A3CBA9]/50" />
                <span className="h-1 w-3 rounded-full bg-[#A3CBA9]/50" />
              </div>
            </div>
          </div>
        </div>
      );
    case "admin":
      return (
        <div className="grid h-full grid-cols-[38%_1fr] gap-1 p-2">
          <div className="space-y-1">
            <div className="mx-auto h-10 w-10 rounded-md border-2 border-[#A3CBA9] bg-white" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-3/4 rounded bg-[#e8e6df]" />
            <div className="mt-1 h-0.5 w-1/2 rounded bg-[#A3CBA9]" />
          </div>
          <div className="space-y-1">
            <div className="h-2 w-2/3 rounded bg-[#1A1919]" />
            <div className="h-1 w-1/2 rounded bg-[#A3CBA9]" />
            <div className="mt-1 h-1 w-1/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "modern":
      return (
        <div className="grid h-full grid-cols-[1fr_42%] gap-1 p-2">
          <div className="space-y-1">
            <div className="h-1.5 w-2/3 rounded bg-[#A3CBA9]" />
            <div className="h-1 w-1/2 rounded bg-[#e8e6df]" />
            <div className="mt-1 h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
          <div className="space-y-0.5 border-l border-[#e8e6df] pl-1">
            <div className="h-1 w-3/4 rounded bg-[#A3CBA9]/70" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-2/3 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "corporate":
      return (
        <div className="flex h-full flex-col items-center p-2">
          <div className="h-1.5 w-1/2 rounded bg-[#1A1919]" />
          <div className="mt-0.5 h-0.5 w-1/3 rounded bg-[#888]" />
          <div className="mt-1 h-px w-full bg-[#A3CBA9]" />
          <div className="mt-1.5 w-full space-y-0.5">
            <div className="h-1 w-1/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
    case "creative":
      return (
        <div className="flex h-full flex-col">
          <div className="h-6 bg-[#A3CBA9] p-1.5">
            <div className="h-1.5 w-1/2 rounded bg-white" />
            <div className="mt-0.5 h-0.5 w-1/3 rounded bg-white/70" />
          </div>
          <div className="flex-1 space-y-1 p-2">
            <div className="h-1 w-1/3 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
            <div className="mt-1 flex gap-0.5">
              <span className="h-1 w-4 rounded-full bg-[#A3CBA9]/30" />
              <span className="h-1 w-3 rounded-full bg-[#A3CBA9]/30" />
              <span className="h-1 w-5 rounded-full bg-[#A3CBA9]/30" />
            </div>
          </div>
        </div>
      );
    case "minimal":
    default:
      return (
        <div className="flex h-full flex-col p-2">
          <div className="h-2 w-1/2 rounded bg-[#1A1919]" />
          <div className="mt-0.5 h-1 w-1/3 rounded bg-[#888]" />
          <div className="mt-2 h-px w-full bg-[#e8e6df]" />
          <div className="mt-2 space-y-0.5">
            <div className="h-1 w-1/4 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-5/6 rounded bg-[#e8e6df]" />
            <div className="mt-1 h-1 w-1/4 rounded bg-[#A3CBA9]" />
            <div className="h-0.5 w-full rounded bg-[#e8e6df]" />
            <div className="h-0.5 w-2/3 rounded bg-[#e8e6df]" />
          </div>
        </div>
      );
  }
}
