import { NextResponse } from "next/server";
import { readStats } from "@/lib/analytics-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_PASSWORD = "Cybersoek2026";

function expectedPassword(): string {
  return process.env.ANALYTICS_PASSWORD?.trim() || DEFAULT_PASSWORD;
}

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

async function authorize(request: Request): Promise<boolean> {
  const header = request.headers.get("x-analytics-password")?.trim();
  if (header && header === expectedPassword()) return true;
  if (request.method === "POST") {
    try {
      const body = (await request.clone().json()) as { password?: unknown };
      const submitted =
        typeof body?.password === "string" ? body.password.trim() : "";
      if (submitted && submitted === expectedPassword()) return true;
    } catch {
      // fall through
    }
  }
  return false;
}

export async function GET(request: Request) {
  if (!(await authorize(request))) return unauthorized();
  const data = await readStats();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await authorize(request))) return unauthorized();
  const data = await readStats();
  return NextResponse.json(data);
}
