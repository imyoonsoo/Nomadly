import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/mypage", request.url));
  }

  if (!accessToken && request.nextUrl.pathname.startsWith("/mypage")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/mypage/:path*"],
};
