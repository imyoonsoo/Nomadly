import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_OPTIONS } from "@/constants/cookieOptions";

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

  const body =
    request.method !== "GET" ? await request.arrayBuffer() : undefined;

  const contentType = request.headers.get("content-type") ?? "application/json";

  try {
    const res = await axios({
      method: request.method,
      url: `${BASE_URL}/${path}${search}`,
      headers: {
        "Content-Type": contentType,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      data: body,
    });

    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status !== 401
    ) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    if (!axios.isAxiosError(error) || !error.response) {
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

      cookieStore.set("accessToken", newAccessToken, COOKIE_OPTIONS);
      cookieStore.set("refreshToken", newRefreshToken, COOKIE_OPTIONS);

      const retryRes = await axios({
        method: request.method,
        url: `${BASE_URL}/${path}${search}`,
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${newAccessToken}`,
        },
        data: body,
      });

      if (retryRes.status === 204) {
        return new NextResponse(null, { status: 204 });
      }

      return NextResponse.json(retryRes.data, { status: retryRes.status });
    } catch (retryError) {
      if (axios.isAxiosError(retryError) && retryError.response) {
        return NextResponse.json(retryError.response.data, {
          status: retryError.response.status,
        });
      }
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
