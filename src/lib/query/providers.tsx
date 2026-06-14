"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import UserSessionHydrator from "@/features/auth/components/UserSessionHydrator";
import { makeQueryClient } from "./get-query-client";
import { useRef } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const clientRef = useRef<QueryClient | null>(null);
  if (!clientRef.current) {
    clientRef.current = makeQueryClient();
  }
  return (
    <QueryClientProvider client={clientRef.current}>
      <UserSessionHydrator>{children}</UserSessionHydrator>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default Providers;
