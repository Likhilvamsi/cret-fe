import { NextResponse } from "next/server";

export function middleware(req) {
  const auth = req.cookies.get("auth") || req.headers.get("auth") || null;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  // Prevent un-auth users from dashboard
  if (!auth && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
