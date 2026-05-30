import { NextResponse } from "next/server";
import { isAdminRequest, text, unauthorized } from "@/lib/server-guard";

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  let payload: { phone?: string; message?: string };

  try {
    payload = (await request.json()) as { phone?: string; message?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const phone = text(payload.phone, 30).replace(/[^0-9]/g, "");
  const message = text(payload.message, 1000);

  if (phone.length < 10 || !message) {
    return NextResponse.json({ ok: false, error: "Valid phone and message are required" }, { status: 400 });
  }

  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_CLOUD_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    return NextResponse.json({ ok: true, configured: false, waUrl: `https://wa.me/${phone}?text=${encodeURIComponent(message)}` });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: await response.text() }, { status: 202 });
    }

    return NextResponse.json({ ok: true, configured: true, result: await response.json() });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to reach WhatsApp Cloud API" }, { status: 202 });
  }
}
