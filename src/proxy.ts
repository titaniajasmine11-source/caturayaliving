import { NextResponse, type NextRequest } from "next/server";
import { adminCookieName, adminSessionValue } from "@/lib/server-guard";

export function proxy(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;

  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isAdminPage = request.nextUrl.pathname === "/admin" || request.nextUrl.pathname.startsWith("/admin/");

  if (!isAdminPage || isLoginPage) {
    return NextResponse.next();
  }

  if (!adminToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  const session = request.cookies.get(adminCookieName)?.value;

  if (session === adminSessionValue(adminToken)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
