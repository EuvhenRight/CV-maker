"use client";

const TTL_MS = 60 * 60 * 1000;
const ACTIVITY_KEY = "maakmijncv:lastActiveAt";
const MANAGED_PREFIXES = ["maakmijncv:", "cybersoek:"];

let cleanedThisLoad = false;

function isManaged(key: string): boolean {
  return MANAGED_PREFIXES.some((p) => key.startsWith(p));
}

function wipeManagedData() {
  if (typeof window === "undefined") return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && isManaged(k)) keys.push(k);
    }
    for (const k of keys) window.localStorage.removeItem(k);
  } catch {}
}

export function ensureSessionFresh(): void {
  if (typeof window === "undefined" || cleanedThisLoad) return;
  cleanedThisLoad = true;
  try {
    const raw = window.localStorage.getItem(ACTIVITY_KEY);
    const ts = raw ? Number(raw) : 0;
    if (Number.isFinite(ts) && ts > 0 && Date.now() - ts > TTL_MS) {
      wipeManagedData();
    }
  } catch {}
}

export function touchSession(): void {
  if (typeof window === "undefined") return;
  ensureSessionFresh();
  try {
    window.localStorage.setItem(ACTIVITY_KEY, String(Date.now()));
  } catch {}
}

export const SESSION_TTL_MS = TTL_MS;
