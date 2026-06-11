import "server-only";
import { cookies } from "next/headers";

const serverFetchAuth = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
    {
      ...options,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json() as Promise<T>;
};

export default serverFetchAuth;
