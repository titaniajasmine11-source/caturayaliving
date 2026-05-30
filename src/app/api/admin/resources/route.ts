import { NextResponse } from "next/server";
import { isAdminRequest, numberInRange, text, unauthorized } from "@/lib/server-guard";

const tableMap = {
  price_rules: "price_rules",
  content_calendar: "content_calendar",
  cms_items: "cms_items",
  project_media: "project_media",
  team_members: "team_members",
  vendors: "vendors",
  invoices: "invoices",
  payments: "payments",
} as const;

type ResourceType = keyof typeof tableMap;

function isResourceType(value: string | null): value is ResourceType {
  return Boolean(value && value in tableMap);
}

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) return null;

  return { supabaseUrl, serviceKey };
}

function supabaseHeaders(serviceKey: string) {
  return {
    apikey: serviceKey,
    authorization: `Bearer ${serviceKey}`,
    "content-type": "application/json",
  };
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  if (!isResourceType(resource)) {
    return NextResponse.json({ ok: false, error: "Invalid resource" }, { status: 400 });
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, configured: false, items: [] }, { status: 202 });
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${tableMap[resource]}?select=*&order=created_at.desc&limit=100`, {
      headers: supabaseHeaders(config.serviceKey),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, configured: true, error: await response.text(), items: [] }, { status: 202 });
    }

    return NextResponse.json({ ok: true, configured: true, items: await response.json() });
  } catch {
    return NextResponse.json({ ok: false, configured: true, error: "Failed to reach Supabase", items: [] }, { status: 202 });
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  if (!isResourceType(resource)) {
    return NextResponse.json({ ok: false, error: "Invalid resource" }, { status: 400 });
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, configured: false, error: "Supabase environment is not configured" }, { status: 202 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const safePayload = sanitizeResource(resource, payload);

  if (!safePayload) {
    return NextResponse.json({ ok: false, error: "Invalid resource payload" }, { status: 400 });
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${tableMap[resource]}`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(config.serviceKey),
        prefer: "return=representation",
      },
      body: JSON.stringify(safePayload),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: await response.text() }, { status: 202 });
    }

    return NextResponse.json({ ok: true, item: (await response.json())[0] ?? null });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to reach Supabase" }, { status: 202 });
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");
  const id = searchParams.get("id");

  if (!isResourceType(resource) || !id) {
    return NextResponse.json({ ok: false, error: "Invalid resource update" }, { status: 400 });
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, configured: false, error: "Supabase environment is not configured" }, { status: 202 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const safePayload = sanitizeResource(resource, payload, true);

  if (!safePayload) {
    return NextResponse.json({ ok: false, error: "Invalid resource payload" }, { status: 400 });
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${tableMap[resource]}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: {
        ...supabaseHeaders(config.serviceKey),
        prefer: "return=representation",
      },
      body: JSON.stringify({ ...safePayload, updated_at: new Date().toISOString() }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: await response.text() }, { status: 202 });
    }

    return NextResponse.json({ ok: true, item: (await response.json())[0] ?? null });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to reach Supabase" }, { status: 202 });
  }
}

function sanitizeResource(resource: ResourceType, payload: Record<string, unknown>, partial = false) {
  const output: Record<string, unknown> = {};

  if (resource === "price_rules") {
    const basePrice = numberInRange(payload.base_price, 0, 1_000_000_000);
    const minimumOrder = numberInRange(payload.minimum_order, 0, 1_000_000);
    const marginPercent = numberInRange(payload.margin_percent, 0, 500);
    if (!partial && (!text(payload.service) || !text(payload.package) || !text(payload.unit) || basePrice === null)) return null;
    if (payload.service !== undefined) output.service = text(payload.service, 120);
    if (payload.package !== undefined) output.package = text(payload.package, 80);
    if (payload.unit !== undefined) output.unit = text(payload.unit, 60);
    if (payload.base_price !== undefined) output.base_price = basePrice;
    if (payload.minimum_order !== undefined) output.minimum_order = minimumOrder;
    if (payload.margin_percent !== undefined) output.margin_percent = marginPercent;
    if (payload.notes !== undefined) output.notes = text(payload.notes, 1000);
    if (payload.is_active !== undefined) output.is_active = payload.is_active === true || payload.is_active === "true";
    return output;
  }

  if (resource === "content_calendar") {
    if (!partial && (!text(payload.publish_date) || !text(payload.channel) || !text(payload.topic) || !text(payload.format))) return null;
    for (const key of ["publish_date", "channel", "topic", "format", "status", "owner", "notes"]) output[key] = text(payload[key], key === "notes" ? 1000 : 160);
    return output;
  }

  if (resource === "project_media") {
    if (!partial && !text(payload.media_url)) return null;
    for (const key of ["portfolio_slug", "media_url", "media_type", "caption", "status"]) output[key] = text(payload[key], key === "caption" ? 300 : 180);
    if (payload.sort_order !== undefined) output.sort_order = numberInRange(payload.sort_order, 0, 10_000) ?? 0;
    if (payload.is_before !== undefined) output.is_before = payload.is_before === true || payload.is_before === "true";
    if (payload.is_after !== undefined) output.is_after = payload.is_after === true || payload.is_after === "true";
    return output;
  }

  if (resource === "team_members") {
    if (!partial && (!text(payload.name) || !text(payload.role))) return null;
    for (const key of ["name", "role", "phone", "status", "notes"]) output[key] = text(payload[key], key === "notes" ? 1000 : 160);
    return output;
  }

  if (resource === "vendors") {
    if (!partial && (!text(payload.name) || !text(payload.category))) return null;
    for (const key of ["name", "category", "contact", "status", "notes"]) output[key] = text(payload[key], key === "notes" ? 1000 : 160);
    return output;
  }

  if (resource === "invoices") {
    const amount = numberInRange(payload.amount, 0, 1_000_000_000);
    if (!partial && (!text(payload.customer_name) || !text(payload.invoice_number) || amount === null)) return null;
    for (const key of ["customer_name", "invoice_number", "status", "due_date", "notes"]) output[key] = text(payload[key], key === "notes" ? 1000 : 160);
    if (payload.amount !== undefined) output.amount = amount;
    if (payload.lead_id !== undefined) output.lead_id = text(payload.lead_id, 80) || null;
    return output;
  }

  if (resource === "payments") {
    const amount = numberInRange(payload.amount, 0, 1_000_000_000);
    if (!partial && amount === null) return null;
    for (const key of ["invoice_id", "method", "paid_at", "status", "notes"]) output[key] = text(payload[key], key === "notes" ? 1000 : 160);
    if (payload.amount !== undefined) output.amount = amount;
    return output;
  }

  if (!partial && (!text(payload.type) || !text(payload.title) || !text(payload.slug))) return null;
  for (const key of ["type", "title", "slug", "status", "summary", "seo_title", "seo_description"]) output[key] = text(payload[key], key === "summary" || key === "seo_description" ? 300 : 160);
  if (payload.body !== undefined) output.body = payload.body && typeof payload.body === "object" && !Array.isArray(payload.body) ? payload.body : {};
  return output;
}
