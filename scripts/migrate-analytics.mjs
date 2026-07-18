// One-off migration: copies the counters from data/analytics.json (the old
// file-based store) into Upstash Redis. Safe to re-run — hsetnx only writes
// fields that don't exist yet, so live counters are never overwritten.
//
// Usage: node --env-file=.env.local scripts/migrate-analytics.mjs

import { readFile } from "node:fs/promises";
import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error(
    "Missing Redis credentials. Fill in .env.local, then run:\n" +
      "  node --env-file=.env.local scripts/migrate-analytics.mjs",
  );
  process.exit(1);
}

const redis = new Redis({ url, token });
const data = JSON.parse(
  await readFile(new URL("../data/analytics.json", import.meta.url), "utf8"),
);

async function migrateField(key, field, value) {
  const wrote = await redis.hsetnx(key, field, value);
  console.log(
    `${key} ${field} = ${value} ${wrote ? "→ migrated" : "→ already in Redis, skipped"}`,
  );
}

for (const [type, count] of Object.entries(data.totals ?? {})) {
  await migrateField("analytics:totals", type, count);
}
for (const [day, counts] of Object.entries(data.byDay ?? {})) {
  for (const [type, count] of Object.entries(counts)) {
    await migrateField("analytics:byDay", `${day}:${type}`, count);
  }
}

const totals = await redis.hgetall("analytics:totals");
console.log("\nDone. Redis totals are now:", totals);
