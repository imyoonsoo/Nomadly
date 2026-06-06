"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { makeQueryClient } from "./get-query-client";
import { useRef } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const clientRef = useRef<QueryClient | null>(null);
  if (!clientRef.current) clientRef.current = makeQueryClient();

  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
