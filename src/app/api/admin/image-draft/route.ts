import { NextResponse } from "next/server";
import { isAdminRequest, text, unauthorized } from "@/lib/server-guard";

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  let payload: { prompt?: string };

  try {
    payload = (await request.json()) as { prompt?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const prompt = text(payload.prompt, 1000);
  const apiUrl = process.env.IMAGE_API_URL;
  const apiKey = process.env.IMAGE_API_KEY;

  if (!prompt) {
    return NextResponse.json({ ok: false, error: "Prompt is required" }, { status: 400 });
  }

  if (apiUrl && apiKey) {
    const parsedApiUrl = URL.canParse(apiUrl) ? new URL(apiUrl) : null;

    if (!parsedApiUrl || parsedApiUrl.protocol !== "https:") {
      return NextResponse.json({ ok: false, error: "IMAGE_API_URL must be HTTPS" }, { status: 400 });
    }

    const customImage = await fetchCustomImage(parsedApiUrl, apiKey, prompt);
    if (customImage) return NextResponse.json(customImage);
  }

  const fallbackImage = await fetchPollinationsImage(prompt);
  if (fallbackImage) return NextResponse.json(fallbackImage);

  return NextResponse.json({ ok: false, error: "Failed to reach image provider" }, { status: 202 });
}

async function fetchCustomImage(apiUrl: URL, apiKey: string, prompt: string) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      signal: AbortSignal.timeout(30_000),
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) return null;
    return responseToImageData(response, "custom");
  } catch {
    return null;
  }
}

async function fetchPollinationsImage(prompt: string) {
  try {
    const url = new URL(`/prompt/${encodeURIComponent(prompt)}`, "https://image.pollinations.ai");
    url.searchParams.set("width", "1024");
    url.searchParams.set("height", "1024");
    url.searchParams.set("nologo", "true");
    url.searchParams.set("safe", "true");

    const response = await fetch(url, { signal: AbortSignal.timeout(45_000) });
    if (!response.ok) return null;
    return responseToImageData(response, "pollinations");
  } catch {
    return null;
  }
}

async function responseToImageData(response: Response, provider: string) {
  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const buffer = Buffer.from(await response.arrayBuffer());

  return {
    ok: true,
    configured: true,
    provider,
    imageDataUrl: `data:${contentType};base64,${buffer.toString("base64")}`,
  };
}
