import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_OPTIONS } from "@/constants/cookieOptions";

function isExpired(token: string): boolean {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(base64));
    if (typeof exp !== "number") return true;
    return exp * 1000 <= Date.now() + 10_000; // 만료 10초 전이면 만료로 간주
  } catch {
    return true; // 파싱 실패 시 만료로 간주 → 재발급 시도
  }
}

export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const response = NextResponse.next();

  const needsRefresh = !accessToken || isExpired(accessToken);

  const { pathname } = request.nextUrl;

  // 토큰 재발급 로직 (Access 토큰이 없거나 만료되고, Refresh 토큰은 있을 때)
  if (needsRefresh && refreshToken) {
    try {
      // Edge Runtime 호환성을 위해 내장 fetch 사용
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
          body: null,
        },
      );

      if (res.ok) {
        const data = await res.json();
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;

        response.cookies.set("accessToken", newAccessToken, COOKIE_OPTIONS);

        response.cookies.set("refreshToken", newRefreshToken, COOKIE_OPTIONS);

        request.cookies.set("accessToken", newAccessToken);
        accessToken = newAccessToken;
      } else {
        // 백엔드에서 에러 코드를 준 경우
        const errorText = await res.text();
        console.error(`백엔드 재발급 실패 (Status: ${res.status}):`, errorText);

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        accessToken = undefined;
      }
    } catch (error) {
      // 네트워크 에러 또는 Edge Runtime 내의 원인 모를 에러 발생 시
      console.error("미들웨어 런타임/네트워크 에러:", error);

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      accessToken = undefined;
    }
  }
  if (accessToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && pathname.startsWith("/mypage")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/mypage/:path*"],
};
