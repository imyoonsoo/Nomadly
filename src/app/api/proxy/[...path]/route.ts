import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function proxy(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { path: pathSegments } = await params;
  const path = pathSegments.join("/");
  const search = new URL(request.url).search;
  const body = request.method !== "GET" ? await request.text() : undefined;

  try {
    const res = await axios({
      method: request.method,
      url: `${BASE_URL}/${path}${search}`,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      data: body,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }

    const refreshToken = cookieStore.get("refreshToken")?.value;

    try {
      const tokenRes = await axios.post(`${BASE_URL}/auth/tokens`, null, {
        headers: {
          ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }),
        },
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        tokenRes.data;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      cookieStore.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      const retryRes = await axios({
        method: request.method,
        url: `${BASE_URL}/${path}${search}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        data: body,
      });

      return NextResponse.json(retryRes.data, { status: retryRes.status });
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
}

export {
  proxy as GET,
  proxy as POST,
  proxy as PATCH,
  proxy as PUT,
  proxy as DELETE,
};
