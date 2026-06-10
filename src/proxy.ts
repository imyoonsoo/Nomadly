import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let response = NextResponse.next();

  // 토큰 재발급 로직 (Access 토큰이 없고, Refresh 토큰은 있을 때)
  if (!accessToken && refreshToken) {
    console.log("미들웨어: 토큰 재발급 시도");

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

        console.log("토큰 재발급 성공!");

        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });

        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });

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
  if (accessToken && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/mypage", request.url));
  }

  if (!accessToken && request.nextUrl.pathname.startsWith("/mypage")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/login", "/mypage/:path*"],
};
