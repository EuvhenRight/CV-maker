import { Redis } from "@upstash/redis";

export type AnalyticsEventType = "download" | "print";

export interface AnalyticsData {
  totals: Record<AnalyticsEventType, number>;
  byDay: Record<string, Record<AnalyticsEventType, number>>;
  version: 1;
}

const TOTALS_KEY = "analytics:totals";
const BYDAY_KEY = "analytics:byDay";

const EMPTY_DATA: AnalyticsData = {
  totals: { download: 0, print: 0 },
  byDay: {},
  version: 1,
};

const redis = (() => {
  // The Vercel↔Upstash marketplace integration injects UPSTASH_REDIS_REST_*;
  // manual setups historically used KV_REST_API_*. Accept either.
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.warn(
      "analytics: Redis is not configured (set KV_REST_API_URL/KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN) — download/print events will NOT be saved",
    );
    return null;
  }
  return new Redis({ url, token });
})();

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function toNumber(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export async function recordEvent(type: AnalyticsEventType): Promise<void> {
  if (!redis) {
    // No KV configured (e.g. local dev without env vars). Silently no-op so the
    // /api/analytics/track route does not 500.
    return;
  }
  const day = todayKey();
  try {
    await Promise.all([
      redis.hincrby(TOTALS_KEY, type, 1),
      redis.hincrby(BYDAY_KEY, `${day}:${type}`, 1),
    ]);
  } catch (err) {
    console.warn("analytics: recordEvent failed", err);
  }
}

export async function readStats(): Promise<AnalyticsData> {
  if (!redis) return { ...EMPTY_DATA, byDay: {} };

  try {
    const [totalsRaw, byDayRaw] = await Promise.all([
      redis.hgetall<Record<string, unknown>>(TOTALS_KEY),
      redis.hgetall<Record<string, unknown>>(BYDAY_KEY),
    ]);

    const byDay: AnalyticsData["byDay"] = {};
    if (byDayRaw) {
      for (const [field, value] of Object.entries(byDayRaw)) {
        const idx = field.lastIndexOf(":");
        if (idx <= 0) continue;
        const day = field.slice(0, idx);
        const type = field.slice(idx + 1);
        if (type !== "download" && type !== "print") continue;
        if (!byDay[day]) byDay[day] = { download: 0, print: 0 };
        byDay[day][type] = toNumber(value);
      }
    }

    return {
      version: 1,
      totals: {
        download: toNumber(totalsRaw?.download),
        print: toNumber(totalsRaw?.print),
      },
      byDay,
    };
  } catch (err) {
    console.warn("analytics: readStats failed", err);
    return { ...EMPTY_DATA, byDay: {} };
  }
}
