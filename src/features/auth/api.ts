import type { LoginResponse } from "@/features/login/type";

export const getMyUserSession = async (): Promise<{
  userId: number;
} | null> => {
  const response = await fetch("/api/proxy/users/me", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user session");
  }

  const data = (await response.json()) as LoginResponse["user"];

  return { userId: data.id };
};
