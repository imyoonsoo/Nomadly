"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import UserSessionHydrator from "@/features/auth/components/UserSessionHydrator";
import { getQueryClient, makeQueryClient } from "./get-query-client";
import { useRef } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionHydrator>{children}</UserSessionHydrator>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default Providers;
