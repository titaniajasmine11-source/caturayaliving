import { NextResponse } from "next/server";
import { adminCookieName, adminRoleCookieName, adminSessionValue, rateLimit } from "@/lib/server-guard";

export async function POST(request: Request) {
  const limited = rateLimit(request, 5, 60_000);
  if (limited) return limited;

  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return NextResponse.json({ ok: false, configured: false, error: "ADMIN_TOKEN is not configured" }, { status: 503 });
  }

  let payload: { token?: string };

  try {
    payload = (await request.json()) as { token?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  if (payload.token !== adminToken) {
    return NextResponse.json({ ok: false, error: "Token admin salah" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, configured: true });
  response.cookies.set(adminCookieName, adminSessionValue(adminToken), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  response.cookies.set(adminRoleCookieName, "super_admin", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(adminCookieName);
  response.cookies.delete(adminRoleCookieName);
  return response;
}
