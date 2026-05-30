import { NextResponse } from "next/server";
import { isAdminRequest, text, unauthorized } from "@/lib/server-guard";

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  let payload: { topic?: string; channel?: string; type?: string };

  try {
    payload = (await request.json()) as { topic?: string; channel?: string; type?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const topic = text(payload.topic, 160);
  const channel = text(payload.channel, 80) || "Artikel";
  const type = text(payload.type, 80) || "caption";

  if (!topic) {
    return NextResponse.json({ ok: false, error: "Topic is required" }, { status: 400 });
  }

  const apiKey = process.env.RIZQUNA_API_KEY ?? process.env.OPENAI_API_KEY;
  const apiUrl = process.env.RIZQUNA_API_URL;

  if (!apiKey || !apiUrl) {
    return NextResponse.json({
      ok: true,
      configured: false,
      draft: buildFallbackDraft(topic, channel, type),
    });
  }

  const parsedApiUrl = URL.canParse(apiUrl) ? new URL(apiUrl) : null;
  const allowedHosts = new Set(["api.openai.com", "openrouter.ai"]);

  if (!parsedApiUrl || parsedApiUrl.protocol !== "https:" || !allowedHosts.has(parsedApiUrl.hostname)) {
    return NextResponse.json({ ok: false, error: "AI provider URL is not allowed" }, { status: 400 });
  }

  try {
    const response = await fetch(parsedApiUrl, {
      method: "POST",
      signal: AbortSignal.timeout(15_000),
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.RIZQUNA_TEXT_MODEL ?? "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tulis draft marketing ringkas Bahasa Indonesia untuk Eko Suyanto Workshop, brand interior dan aluminium Sidareja Cilacap." },
          { role: "user", content: `Buat ${type} untuk channel ${channel}. Topik: ${topic}` },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: await response.text() }, { status: 202 });
    }

    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    return NextResponse.json({ ok: true, configured: true, draft: data.choices?.[0]?.message?.content ?? buildFallbackDraft(topic, channel, type) });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to reach AI provider" }, { status: 202 });
  }
}

function buildFallbackDraft(topic: string, channel: string, type: string) {
  return `${type} ${channel}: ${topic}\n\nEko Suyanto Workshop membantu kebutuhan interior, aluminium, kitchen set, plafon, kanopi, dan finishing rumah area Sidareja-Cilacap. Kirim foto lokasi, ukuran perkiraan, dan budget untuk konsultasi awal via WhatsApp.`;
}
