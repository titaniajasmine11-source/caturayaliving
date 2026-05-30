import { NextResponse } from "next/server";
import { numberInRange, rateLimit, text } from "@/lib/server-guard";

type DesignPayload = {
  name?: string;
  phone?: string;
  room: string;
  model: string;
  material: string;
  width: number;
  length: number;
  items: string[];
  notes?: string;
  source?: string;
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return null;
  }

  return { supabaseUrl, serviceKey };
}

export async function POST(request: Request) {
  const limited = rateLimit(request);
  if (limited) return limited;

  let payload: DesignPayload;

  try {
    payload = (await request.json()) as DesignPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const width = numberInRange(payload.width, 1, 50);
  const length = numberInRange(payload.length, 1, 50);
  const design = {
    name: text(payload.name, 120),
    phone: text(payload.phone, 30).replace(/[^0-9+]/g, ""),
    room: text(payload.room, 120),
    model: text(payload.model, 120),
    material: text(payload.material, 120),
    width,
    length,
    items: Array.isArray(payload.items) ? payload.items.map((item) => text(item, 80)).filter(Boolean).slice(0, 30) : [],
    notes: text(payload.notes, 1000),
    source: text(payload.source, 80) || "planner",
  };

  if (!design.room || !design.model || !design.material || width === null || length === null || design.items.length === 0) {
    return NextResponse.json({ ok: false, error: "Missing required design fields" }, { status: 400 });
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, stored: false, error: "Supabase environment is not configured" }, { status: 202 });
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/saved_designs`, {
      method: "POST",
      headers: {
        apikey: config.serviceKey,
        authorization: `Bearer ${config.serviceKey}`,
        "content-type": "application/json",
        prefer: "return=representation",
      },
      body: JSON.stringify({
        ...design,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, stored: false, error: await response.text() }, { status: 202 });
    }

    return NextResponse.json({ ok: true, stored: true, design: (await response.json())[0] ?? null });
  } catch {
    return NextResponse.json({ ok: false, stored: false, error: "Failed to reach Supabase" }, { status: 202 });
  }
}
