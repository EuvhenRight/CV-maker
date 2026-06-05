import { NextResponse } from "next/server";
import { recordEvent } from "@/lib/analytics-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const type = (body as { type?: unknown })?.type;
  if (type !== "download" && type !== "print") {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  try {
    await recordEvent(type);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("analytics.track failed:", err);
    return NextResponse.json({ error: "write_failed" }, { status: 500 });
  }
}
