"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { makeQueryClient } from "./get-query-client";
import { useRef } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const clientRef = useRef<QueryClient | null>(null);
  if (!clientRef.current) {
    clientRef.current = makeQueryClient();
  }
  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
};
export default Providers;
