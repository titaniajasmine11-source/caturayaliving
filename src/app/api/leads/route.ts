import { NextResponse } from "next/server";
import { rateLimit, text } from "@/lib/server-guard";

type LeadPayload = {
  name: string;
  phone: string;
  location: string;
  need: string;
  area: string;
  size?: string;
  budget?: string;
  notes?: string;
  source?: string;
};

export async function POST(request: Request) {
  const limited = rateLimit(request);
  if (limited) return limited;

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const lead = {
    name: text(payload.name, 120),
    phone: text(payload.phone, 30).replace(/[^0-9+]/g, ""),
    location: text(payload.location, 160),
    need: text(payload.need, 160),
    area: text(payload.area, 120),
    size: text(payload.size, 120),
    budget: text(payload.budget, 120),
    notes: text(payload.notes, 1000),
    source: text(payload.source, 80) || "website",
  };

  if (!lead.name || lead.phone.length < 10 || lead.phone.length > 16 || !lead.location || !lead.need || !lead.area) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Supabase environment is not configured" }, { status: 202 });
  }

  let response: Response;

  try {
    response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        authorization: `Bearer ${serviceKey}`,
        "content-type": "application/json",
        prefer: "return=representation",
      },
      body: JSON.stringify({
        ...lead,
        status: "new",
      }),
    });
  } catch {
    return NextResponse.json({ ok: false, stored: false, error: "Failed to reach Supabase" }, { status: 202 });
  }

  if (!response.ok) {
    return NextResponse.json({ ok: false, stored: false, error: await response.text() }, { status: 202 });
  }

  return NextResponse.json({ ok: true, stored: true, data: await response.json() });
}
