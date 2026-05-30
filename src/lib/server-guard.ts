import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

const buckets = new Map<string, { count: number; resetAt: number }>();

export const adminCookieName = "eko-workshop-admin-token";
export const adminRoleCookieName = "eko-workshop-admin-role";

export function adminSessionValue(adminToken: string) {
  return createHash("sha256").update(adminToken).digest("hex");
}

export function isAdminRequest(request: Request) {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) return false;

  const cookie = request.headers.get("cookie") ?? "";
  const cookieToken = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${adminCookieName}=`))
    ?.slice(adminCookieName.length + 1);

  return decodeURIComponent(cookieToken ?? "") === adminSessionValue(adminToken);
}

export function getAdminRole(request: Request) {
  if (!isAdminRequest(request)) return null;
  const cookie = request.headers.get("cookie") ?? "";
  const role = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${adminRoleCookieName}=`))
    ?.slice(adminRoleCookieName.length + 1);

  return decodeURIComponent(role ?? "super_admin");
}

export function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export function text(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function numberInRange(value: unknown, min: number, max: number) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

export function rateLimit(request: Request, limit = 12, windowMs = 60_000) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip") || "local";
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  bucket.count += 1;
  if (bucket.count <= limit) return null;

  return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
}
