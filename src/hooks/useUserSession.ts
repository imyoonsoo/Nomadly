"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  userKeys,
  userSessionQueryOptions,
  type UserSession,
} from "@/features/auth/query";

export const useUserSession = () => {
  return useQuery(userSessionQueryOptions());
};

export const useSetUserSession = () => {
  const queryClient = useQueryClient();

  return (userSession: UserSession) => {
    queryClient.setQueryData(userKeys.session(), userSession);
  };
};

export const useClearUserSession = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.removeQueries({ queryKey: userKeys.session() });
  };
};
