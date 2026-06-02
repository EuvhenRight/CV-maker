import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const TEMPLATES = [
  { id: "minimal", name: "Minimal", tone: "bg-neutral-100" },
  { id: "modern", name: "Modern", tone: "bg-indigo-50" },
  { id: "corporate", name: "Corporate", tone: "bg-amber-50" },
  { id: "creative", name: "Creative", tone: "bg-rose-50" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Built in under 5 minutes",
    body: "Pick a template, drop in your details, ship. No signup, no friction.",
  },
  {
    icon: ShieldCheck,
    title: "Recruiter & ATS approved",
    body: "Templates use the structure ATS parsers expect — no images, no broken layouts.",
  },
  {
    icon: Sparkles,
    title: "AI assists you (soon)",
    body: "One-click summaries and stronger bullet points. Stub UI ships today.",
  },
  {
    icon: FileText,
    title: "Clean PDF export",
    body: "Print-to-PDF in your browser. What you see is exactly what gets sent.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-base font-bold tracking-tight">
            Make<span className="text-indigo-600">MyCV</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm text-neutral-600">
            <a href="#features" className="hidden hover:text-neutral-900 sm:inline">
              Features
            </a>
            <a href="#templates" className="hidden hover:text-neutral-900 sm:inline">
              Templates
            </a>
            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Open builder
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          Build a CV recruiters actually read
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          A job-ready CV in <span className="text-indigo-600">five minutes</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
          Pick a recruiter-approved template, drop in your details, download a
          clean PDF. No signup, no paywall, just a good CV.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
          >
            Start building
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
          >
            See templates
          </a>
        </div>
        <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-neutral-500">
          {[
            "Free to use",
            "No account",
            "Saves locally",
            "ATS-friendly",
            "PDF export",
          ].map((x) => (
            <li key={x} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              {x}
            </li>
          ))}
        </ul>
      </section>

      <section id="features" className="border-t border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">
            Minimize effort. Maximize employability.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-600">
            Every feature exists to reduce friction between you and your next offer.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-neutral-200 bg-white p-5"
              >
                <f.icon className="h-5 w-5 text-indigo-600" />
                <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="border-t border-neutral-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">
            Four templates. Switch any time.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-600">
            All templates share the same content — pick the look that fits the role.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.map((t) => (
              <Link
                href="/builder"
                key={t.id}
                className="group block rounded-lg border border-neutral-200 bg-white p-3 transition-shadow hover:shadow-md"
              >
                <div
                  className={`relative aspect-[210/297] overflow-hidden rounded-md ${t.tone}`}
                >
                  <div className="absolute inset-3 rounded-sm bg-white shadow-sm">
                    <TemplateThumb name={t.name} />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between px-1">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-neutral-500 group-hover:text-indigo-600">
                    Use →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Ready to ship your CV?</h3>
            <p className="text-sm text-neutral-400">
              No signup. Local autosave. Print to PDF when you&apos;re happy.
            </p>
          </div>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Open the builder
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-100">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} MakeMyCV · Built with Next.js + Tailwind
        </div>
      </footer>
    </div>
  );
}

function TemplateThumb({ name }: { name: string }) {
  if (name === "Modern") {
    return (
      <div className="grid h-full grid-cols-[1fr_55%] gap-1 p-2">
        <div className="space-y-1">
          <div className="h-2 w-2/3 rounded bg-indigo-300" />
          <div className="h-1 w-1/2 rounded bg-neutral-200" />
          <div className="mt-2 space-y-0.5">
            <div className="h-0.5 w-full rounded bg-neutral-200" />
            <div className="h-0.5 w-5/6 rounded bg-neutral-200" />
            <div className="h-0.5 w-4/5 rounded bg-neutral-200" />
          </div>
        </div>
        <div className="space-y-1 border-l border-neutral-100 pl-1">
          <div className="h-1.5 w-3/4 rounded bg-indigo-200" />
          <div className="h-0.5 w-full rounded bg-neutral-200" />
          <div className="h-0.5 w-2/3 rounded bg-neutral-200" />
          <div className="mt-1.5 h-1.5 w-2/3 rounded bg-indigo-200" />
          <div className="h-0.5 w-full rounded bg-neutral-200" />
          <div className="h-0.5 w-3/4 rounded bg-neutral-200" />
        </div>
      </div>
    );
  }
  if (name === "Corporate") {
    return (
      <div className="flex h-full flex-col items-center p-2">
        <div className="h-2 w-1/2 rounded bg-neutral-700" />
        <div className="mt-1 h-0.5 w-1/3 rounded bg-neutral-300" />
        <div className="mt-1.5 h-px w-full bg-amber-400" />
        <div className="mt-2 w-full space-y-0.5">
          <div className="h-1 w-1/3 rounded bg-amber-600/80" />
          <div className="h-0.5 w-full rounded bg-neutral-200" />
          <div className="h-0.5 w-5/6 rounded bg-neutral-200" />
          <div className="mt-1.5 h-1 w-1/3 rounded bg-amber-600/80" />
          <div className="h-0.5 w-full rounded bg-neutral-200" />
          <div className="h-0.5 w-4/5 rounded bg-neutral-200" />
        </div>
      </div>
    );
  }
  if (name === "Creative") {
    return (
      <div className="flex h-full flex-col">
        <div className="h-7 bg-rose-500 p-1.5">
          <div className="h-2 w-1/2 rounded bg-white/90" />
          <div className="mt-0.5 h-1 w-1/3 rounded bg-white/60" />
        </div>
        <div className="flex-1 space-y-1 p-2">
          <div className="h-1.5 w-1/3 rounded bg-rose-500" />
          <div className="h-0.5 w-full rounded bg-neutral-200" />
          <div className="h-0.5 w-5/6 rounded bg-neutral-200" />
          <div className="mt-1 flex gap-1">
            <span className="h-1 w-6 rounded-full bg-rose-200" />
            <span className="h-1 w-5 rounded-full bg-rose-200" />
            <span className="h-1 w-7 rounded-full bg-rose-200" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col p-2">
      <div className="h-2 w-1/2 rounded bg-neutral-700" />
      <div className="mt-0.5 h-1 w-1/3 rounded bg-neutral-300" />
      <div className="mt-2 h-px w-full bg-neutral-200" />
      <div className="mt-2 space-y-0.5">
        <div className="h-1 w-1/4 rounded bg-indigo-500" />
        <div className="h-0.5 w-full rounded bg-neutral-200" />
        <div className="h-0.5 w-5/6 rounded bg-neutral-200" />
        <div className="mt-1.5 h-1 w-1/4 rounded bg-indigo-500" />
        <div className="h-0.5 w-full rounded bg-neutral-200" />
        <div className="h-0.5 w-2/3 rounded bg-neutral-200" />
      </div>
    </div>
  );
}
