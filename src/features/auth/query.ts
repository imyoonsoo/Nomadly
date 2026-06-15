import { queryOptions } from "@tanstack/react-query";
import { getMyUserSession } from "@/features/auth/api";

export type UserSession = {
  userId: number;
};

export const userKeys = {
  all: ["user"] as const,
  session: () => [...userKeys.all, "session"] as const,
};

export const userSessionQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.session(),
    queryFn: getMyUserSession,
    retry: false,
    staleTime: Infinity,
  });
