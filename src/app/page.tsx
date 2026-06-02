import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Camera,
  FileText,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { TEMPLATE_IDS, TEMPLATE_META } from "@/components/templates";

const FEATURES = [
  {
    icon: Zap,
    title: "Klaar in 5 minuten",
    body: "Kies een template, vul je gegevens in, download. Geen account, geen gedoe.",
  },
  {
    icon: ShieldCheck,
    title: "Recruiter & ATS-proof",
    body: "Templates volgen de structuur die ATS-systemen verwachten — geen rare layouts.",
  },
  {
    icon: Camera,
    title: "Met of zonder foto",
    body: "10 branche-templates met portret. 4 klassieke ATS-pure templates zonder foto.",
  },
  {
    icon: FileText,
    title: "Nette PDF",
    body: "Print-naar-PDF in je browser. Wat je ziet is precies wat je verstuurt.",
  },
];

const INDUSTRY_TEMPLATES = TEMPLATE_IDS.filter(
  (id) => TEMPLATE_META[id].category === "industry",
);
const CLASSIC_TEMPLATES = TEMPLATE_IDS.filter(
  (id) => TEMPLATE_META[id].category === "classic",
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F0EFEA] text-[#1A1919]">
      <header className="border-b border-[#e8e6df] bg-[#F0EFEA]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
          <nav className="flex items-center gap-5 text-sm text-[#3a3a3a]">
            <a
              href="#features"
              className="hidden hover:text-[#1A1919] sm:inline"
            >
              Functies
            </a>
            <a
              href="#templates"
              className="hidden hover:text-[#1A1919] sm:inline"
            >
              Templates
            </a>
            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#A3CBA9] px-4 py-1.5 font-display text-sm font-semibold text-[#1A1919] shadow-sm transition-colors hover:bg-[#7fa689] hover:text-white"
            >
              Open editor
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e6df] bg-white px-3 py-1 text-xs font-medium text-[#3a3a3a]">
              <Sparkles className="h-3.5 w-3.5 text-[#7FA689]" />
              Een CV waar recruiters bij stilstaan
            </span>
            <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Een werk-klaar CV in{" "}
              <span className="text-[#7FA689]">vijf minuten</span>.
            </h1>
            <p className="mt-4 max-w-xl text-base text-[#444]">
              Kies uit 14 templates — van strak voor IT tot warm voor zorg en
              horeca. Vul je gegevens in, voeg een foto toe en download een
              professionele PDF.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-full bg-[#A3CBA9] px-5 py-3 font-display text-sm font-semibold text-[#1A1919] shadow-sm transition-colors hover:bg-[#7fa689] hover:text-white"
              >
                Start gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 rounded-full border border-[#e8e6df] bg-white px-5 py-3 font-display text-sm font-semibold text-[#1A1919] hover:bg-white/70"
              >
                Bekijk templates
              </a>
            </div>
            <ul className="mt-7 flex max-w-2xl flex-wrap gap-x-5 gap-y-1 text-xs text-[#666]">
              {[
                "Gratis",
                "Geen account",
                "Auto-opslag",
                "ATS-vriendelijk",
                "Met foto",
                "PDF-export",
              ].map((x) => (
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
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Minder moeite. Meer kans op een baan.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#555]">
            Elk onderdeel is bedacht om de afstand tussen jou en je volgende
            baan te verkleinen.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
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
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Templates voor 10 branches.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#555]">
                Elk template volgt de standaard van die branche. Allemaal met
                ruimte voor je foto.
              </p>
            </div>
            <Link
              href="/builder"
              className="hidden text-sm font-semibold text-[#7FA689] hover:underline sm:inline"
            >
              Open editor →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRY_TEMPLATES.map((id) => (
              <TemplateCard key={id} id={id} />
            ))}
          </div>
          <div className="mt-12">
            <h3 className="font-display text-base font-bold uppercase tracking-[0.16em] text-[#6b6b6b]">
              Klassieke ATS-templates (zonder foto)
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {CLASSIC_TEMPLATES.map((id) => (
                <TemplateCard key={id} id={id} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1919] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold">
              Klaar om je CV te versturen?
            </h3>
            <p className="text-sm text-[#cbcbcb]">
              Geen account. Lokale opslag. Print naar PDF wanneer je tevreden
              bent.
            </p>
          </div>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-full bg-[#A3CBA9] px-5 py-3 font-display text-sm font-semibold text-[#1A1919] shadow-sm transition-colors hover:bg-[#7fa689] hover:text-white"
          >
            Open de editor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#e8e6df] bg-[#F0EFEA]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-[#7a7a7a]">
          <div>
            © {new Date().getFullYear()} MaakMijnCV · CV-tool voor{" "}
            <a
              href="https://cybersoek.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7FA689] hover:underline"
            >
              cybersoek.nl
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TemplateCard({ id }: { id: keyof typeof TEMPLATE_META }) {
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
            Foto
          </span>
        )}
      </div>
      <div className="px-3 py-2.5">
        <div className="font-display text-sm font-semibold leading-tight">
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
