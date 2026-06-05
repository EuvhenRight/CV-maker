"use client";

export type AnalyticsEventType = "download" | "print";

export async function trackAnalyticsEvent(
  type: AnalyticsEventType,
): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
      keepalive: true,
    });
  } catch {
    // Best-effort: don't disrupt UX if analytics is offline.
  }
}
