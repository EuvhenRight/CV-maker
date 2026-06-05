"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Lock,
  Printer,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Stats {
  totals: { download: number; print: number };
  byDay: Record<string, { download?: number; print?: number }>;
}

interface PeriodSummary {
  download: number;
  print: number;
}

interface DayRow {
  day: string;
  download: number;
  print: number;
}

type PeriodValue = number | "all";

const PRESETS: Array<{ id: string; label: string; value: PeriodValue }> = [
  { id: "1d", label: "Today", value: 1 },
  { id: "7d", label: "7 days", value: 7 },
  { id: "30d", label: "30 days", value: 30 },
  { id: "90d", label: "90 days", value: 90 },
  { id: "all", label: "All time", value: "all" },
];

const SESSION_KEY = "maakmijncv:analytics-pw";

function readSessionPassword(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.sessionStorage.getItem(SESSION_KEY) ?? "";
  } catch {
    return "";
  }
}

function writeSessionPassword(value: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, value);
  } catch {}
}

function clearSessionPassword() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

async function fetchStats(password: string): Promise<Stats> {
  const res = await fetch("/api/analytics/stats", {
    method: "GET",
    headers: { "x-analytics-password": password },
    cache: "no-store",
  });
  if (res.status === 401) {
    const err = new Error("unauthorized");
    (err as Error & { code?: number }).code = 401;
    throw err;
  }
  if (!res.ok) throw new Error(`stats_failed_${res.status}`);
  return (await res.json()) as Stats;
}

export function AnalyticsClient() {
  const [password, setPassword] = React.useState("");
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [authed, setAuthed] = React.useState(false);

  const load = React.useCallback(async (pw: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStats(pw);
      setStats(data);
      setAuthed(true);
      writeSessionPassword(pw);
    } catch (err) {
      if ((err as { code?: number }).code === 401) {
        setError("Wrong password.");
        setAuthed(false);
        clearSessionPassword();
      } else {
        setError("Could not load stats. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const saved = readSessionPassword();
    if (!saved) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPassword(saved);
    void load(saved);
  }, [load]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void load(password);
  }

  function onLogout() {
    clearSessionPassword();
    setAuthed(false);
    setStats(null);
    setPassword("");
  }

  return (
    <div className="min-h-screen bg-[#F0EFEA] text-[#1A1919]">
      <header className="border-b border-[#e8e6df] bg-[#F0EFEA]/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3a3a3a] hover:text-[#1A1919]"
          >
            <ArrowLeft className="h-4 w-4" />
            MaakMijnCV
          </Link>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[#7a7a7a]">
            <Lock className="h-3.5 w-3.5" />
            Analytics
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {!authed ? (
          <PasswordGate
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
            loading={loading}
            error={error}
          />
        ) : (
          <StatsView
            stats={stats}
            loading={loading}
            error={error}
            onRefresh={() => void load(password)}
            onLogout={onLogout}
          />
        )}
      </main>
    </div>
  );
}

function PasswordGate({
  password,
  setPassword,
  onSubmit,
  loading,
  error,
}: {
  password: string;
  setPassword: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-[#e8e6df] bg-white p-6 shadow-sm">
      <h1 className="font-display text-xl font-bold">Restricted</h1>
      <p className="mt-1 text-sm text-[#555]">
        Enter the analytics password to view the stats.
      </p>
      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <Input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Analytics password"
          disabled={loading}
        />
        {error && (
          <div
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700"
          >
            {error}
          </div>
        )}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading || !password.trim()}
        >
          {loading ? "Checking…" : "Unlock"}
        </Button>
      </form>
    </div>
  );
}

function StatsView({
  stats,
  loading,
  error,
  onRefresh,
  onLogout,
}: {
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onLogout: () => void;
}) {
  const [period, setPeriod] = React.useState<PeriodValue>(7);
  const [customDays, setCustomDays] = React.useState("");

  const summary = React.useMemo(
    () => summarizeRange(stats, period),
    [stats, period],
  );
  const rows = React.useMemo(
    () => buildRows(stats, period),
    [stats, period],
  );
  const periodLabel = describePeriod(period);
  const total = summary.download + summary.print;
  const allTimeTotal =
    (stats?.totals.download ?? 0) + (stats?.totals.print ?? 0);

  function applyCustom(e: React.FormEvent) {
    e.preventDefault();
    const n = parseInt(customDays, 10);
    if (Number.isFinite(n) && n > 0 && n <= 3650) {
      setPeriod(n);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Completed CVs</h1>
          <p className="mt-1 text-sm text-[#555]">
            Count of confirmed downloads and prints. A download counts after the
            file is saved; a print counts after the print dialog closes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            Lock
          </Button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700"
        >
          {error}
        </div>
      )}

      <section className="rounded-2xl border border-[#e8e6df] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b6b6b]">
            Period
          </span>
          {PRESETS.map((p) => (
            <PeriodChip
              key={p.id}
              label={p.label}
              active={period === p.value}
              onClick={() => setPeriod(p.value)}
            />
          ))}
          <form
            onSubmit={applyCustom}
            className="ml-auto flex items-center gap-2"
          >
            <label className="flex items-center gap-1.5 text-xs text-[#6b6b6b]">
              <span>Custom</span>
              <Input
                type="number"
                min={1}
                max={3650}
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                placeholder="14"
                className="h-8 w-20 text-sm"
              />
              <span>days</span>
            </label>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              disabled={!customDays.trim()}
            >
              Apply
            </Button>
          </form>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Downloads (PDF)"
          value={summary.download}
          icon={<Download className="h-4 w-4" />}
          sublabel={periodLabel}
        />
        <StatCard
          label="Prints"
          value={summary.print}
          icon={<Printer className="h-4 w-4" />}
          sublabel={periodLabel}
        />
        <StatCard
          label="Total completed"
          value={total}
          accent
          sublabel={
            period === "all"
              ? "All time"
              : `${periodLabel} · all-time ${allTimeTotal.toLocaleString()}`
          }
        />
      </div>

      <section className="rounded-2xl border border-[#e8e6df] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[#6b6b6b]">
            By day · {periodLabel}
          </h2>
          {loading && (
            <span className="text-xs text-[#9a9a9a]">Loading…</span>
          )}
        </div>
        <div className="mt-4 max-h-[420px] overflow-auto">
          {rows.length === 0 ? (
            <p className="py-6 text-center text-sm text-[#9a9a9a]">
              No activity in this period yet.
            </p>
          ) : (
            <table className="w-full min-w-[480px] text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-xs uppercase tracking-wider text-[#7a7a7a]">
                  <th className="pb-2">Day</th>
                  <th className="pb-2 text-right">Downloads</th>
                  <th className="pb-2 text-right">Prints</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.day}
                    className="border-t border-[#f0efea] text-[#1a1919]"
                  >
                    <td className="py-2 font-medium">{row.day}</td>
                    <td className="py-2 text-right tabular-nums">
                      {row.download}
                    </td>
                    <td className="py-2 text-right tabular-nums">{row.print}</td>
                    <td className="py-2 text-right tabular-nums font-semibold">
                      {row.download + row.print}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

function PeriodChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold transition-colors",
        active
          ? "bg-[#1A1919] text-white shadow-sm"
          : "border border-[#e8e6df] bg-white text-[#3a3a3a] hover:bg-[#fafaf7]",
      )}
    >
      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent = false,
  sublabel,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
  accent?: boolean;
  sublabel?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        accent
          ? "border-[#A3CBA9] bg-[#A3CBA9]/15"
          : "border-[#e8e6df] bg-white",
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#7a7a7a]">
        {icon}
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-bold tabular-nums text-[#1A1919]">
        {value.toLocaleString()}
      </div>
      {sublabel && (
        <div className="mt-1 text-[11px] text-[#7a7a7a]">{sublabel}</div>
      )}
    </div>
  );
}

function describePeriod(period: PeriodValue): string {
  if (period === "all") return "All time";
  if (period === 1) return "Today";
  return `Last ${period} days`;
}

function rangeKeys(period: PeriodValue): string[] | null {
  if (period === "all") return null;
  const today = new Date();
  const keys: string[] = [];
  for (let i = 0; i < period; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

function summarizeRange(stats: Stats | null, period: PeriodValue): PeriodSummary {
  if (!stats) return { download: 0, print: 0 };
  if (period === "all") {
    return {
      download: stats.totals.download ?? 0,
      print: stats.totals.print ?? 0,
    };
  }
  const keys = rangeKeys(period);
  if (!keys) return { download: 0, print: 0 };
  let download = 0;
  let print = 0;
  for (const k of keys) {
    const slot = stats.byDay[k];
    if (!slot) continue;
    download += slot.download ?? 0;
    print += slot.print ?? 0;
  }
  return { download, print };
}

function buildRows(stats: Stats | null, period: PeriodValue): DayRow[] {
  if (!stats) return [];
  if (period === "all") {
    return Object.keys(stats.byDay)
      .sort((a, b) => (a < b ? 1 : -1))
      .map((day) => ({
        day,
        download: stats.byDay[day]?.download ?? 0,
        print: stats.byDay[day]?.print ?? 0,
      }));
  }
  const keys = rangeKeys(period);
  if (!keys) return [];
  return keys.map((day) => ({
    day,
    download: stats.byDay[day]?.download ?? 0,
    print: stats.byDay[day]?.print ?? 0,
  }));
}
