import { NextResponse } from "next/server";
import { isAdminRequest, text, unauthorized } from "@/lib/server-guard";

const leadStatuses = ["new", "contacted", "consulting", "estimate_requested", "survey_scheduled", "survey_done", "proposal_sent", "negotiation", "won", "lost", "follow_up_later"] as const;

type LeadStatus = (typeof leadStatuses)[number];

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return null;
  }

  return { supabaseUrl, serviceKey };
}

function headers(serviceKey: string) {
  return {
    apikey: serviceKey,
    authorization: `Bearer ${serviceKey}`,
    "content-type": "application/json",
  };
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, configured: false, leads: [] }, { status: 202 });
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc&limit=100`, {
      headers: headers(config.serviceKey),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, configured: true, error: await response.text(), leads: [] }, { status: 202 });
    }

    return NextResponse.json({ ok: true, configured: true, leads: await response.json() });
  } catch {
    return NextResponse.json({ ok: false, configured: true, error: "Failed to reach Supabase", leads: [] }, { status: 202 });
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, configured: false, error: "Supabase environment is not configured" }, { status: 202 });
  }

  let payload: { id?: string; status?: LeadStatus; notes?: string; follow_up_at?: string; survey_date?: string; assigned_to?: string; offer_value?: string | number };

  try {
    payload = (await request.json()) as { id?: string; status?: LeadStatus; notes?: string; follow_up_at?: string; survey_date?: string; assigned_to?: string; offer_value?: string | number };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload.id || (payload.status && !leadStatuses.includes(payload.status))) {
    return NextResponse.json({ ok: false, error: "Invalid lead status payload" }, { status: 400 });
  }

  const updates: Record<string, string | number | null> = { updated_at: new Date().toISOString() };
  if (payload.status) updates.status = payload.status;
  if (payload.notes !== undefined) updates.notes = text(payload.notes, 1000);
  if (payload.assigned_to !== undefined) updates.assigned_to = text(payload.assigned_to, 120);
  if (payload.follow_up_at !== undefined) updates.follow_up_at = text(payload.follow_up_at, 40) || null;
  if (payload.survey_date !== undefined) updates.survey_date = text(payload.survey_date, 40) || null;
  if (payload.offer_value !== undefined) {
    const value = Number(payload.offer_value);
    updates.offer_value = Number.isFinite(value) && value >= 0 ? value : null;
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/leads?id=eq.${encodeURIComponent(payload.id)}`, {
      method: "PATCH",
      headers: {
        ...headers(config.serviceKey),
        prefer: "return=representation",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: await response.text() }, { status: 202 });
    }

    return NextResponse.json({ ok: true, lead: (await response.json())[0] ?? null });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to reach Supabase" }, { status: 202 });
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, configured: false, error: "Supabase environment is not configured" }, { status: 202 });
  }

  let payload: Record<string, string | undefined>;

  try {
    payload = (await request.json()) as Record<string, string | undefined>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const lead = {
    name: text(payload.name, 120),
    phone: text(payload.phone, 30).replace(/[^0-9+]/g, ""),
    location: text(payload.location, 160),
    need: text(payload.need, 160),
    area: text(payload.area, 120),
    size: text(payload.size, 120),
    budget: text(payload.budget, 120),
    notes: text(payload.notes, 1000),
    source: text(payload.source, 80) || "manual_admin",
  };

  if (!lead.name || !lead.phone || !lead.location || !lead.need || !lead.area) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const status = leadStatuses.includes(payload.status as LeadStatus) ? payload.status : "new";

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        ...headers(config.serviceKey),
        prefer: "return=representation",
      },
      body: JSON.stringify({
        ...lead,
        status,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: await response.text() }, { status: 202 });
    }

    return NextResponse.json({ ok: true, lead: (await response.json())[0] ?? null });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to reach Supabase" }, { status: 202 });
  }
}
