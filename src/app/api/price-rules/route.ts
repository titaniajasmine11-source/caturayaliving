import { NextResponse } from "next/server";

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !apiKey) return null;
  return { supabaseUrl, apiKey };
}

export async function GET() {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: false, configured: false, rules: [] }, { status: 202 });
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/price_rules?select=service,package,unit,base_price,minimum_order,margin_percent,notes&is_active=eq.true&order=created_at.desc&limit=100`, {
      headers: {
        apikey: config.apiKey,
        authorization: `Bearer ${config.apiKey}`,
        "content-type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, configured: true, error: await response.text(), rules: [] }, { status: 202 });
    }

    return NextResponse.json({ ok: true, configured: true, rules: await response.json() });
  } catch {
    return NextResponse.json({ ok: false, configured: true, error: "Failed to reach Supabase", rules: [] }, { status: 202 });
  }
}
