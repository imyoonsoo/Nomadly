import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function proxy(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const { path: pathSegments } = await params;
  const path = pathSegments.join("/");
  const search = new URL(request.url).search;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}${search}`,
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: request.method !== "GET" ? await request.text() : undefined,
    },
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export {
  proxy as GET,
  proxy as POST,
  proxy as PATCH,
  proxy as PUT,
  proxy as DELETE,
};
