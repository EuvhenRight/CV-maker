import { promises as fs } from "node:fs";
import path from "node:path";

export type AnalyticsEventType = "download" | "print";

export interface AnalyticsData {
  totals: Record<AnalyticsEventType, number>;
  byDay: Record<string, Record<AnalyticsEventType, number>>;
  version: 1;
}

const DATA_FILE = path.join(process.cwd(), "data", "analytics.json");

const EMPTY_DATA: AnalyticsData = {
  totals: { download: 0, print: 0 },
  byDay: {},
  version: 1,
};

let writeLock: Promise<unknown> = Promise.resolve();

async function readData(): Promise<AnalyticsData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<AnalyticsData>;
    return {
      version: 1,
      totals: {
        download: parsed.totals?.download ?? 0,
        print: parsed.totals?.print ?? 0,
      },
      byDay: parsed.byDay ?? {},
    };
  } catch {
    await ensureFile();
    return { ...EMPTY_DATA, byDay: {} };
  }
}

async function ensureFile(): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(EMPTY_DATA, null, 2), "utf8");
  }
}

async function writeData(data: AnalyticsData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function recordEvent(type: AnalyticsEventType): Promise<void> {
  // Serialize concurrent writes to avoid lost updates on the JSON file.
  const next = writeLock.then(async () => {
    const data = await readData();
    data.totals[type] = (data.totals[type] ?? 0) + 1;
    const day = todayKey();
    const slot = data.byDay[day] ?? { download: 0, print: 0 };
    slot[type] = (slot[type] ?? 0) + 1;
    data.byDay[day] = slot;
    await writeData(data);
  });
  writeLock = next.catch(() => undefined);
  await next;
}

export async function readStats(): Promise<AnalyticsData> {
  return readData();
}
