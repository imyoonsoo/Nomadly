"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import UserSessionHydrator from "@/features/auth/components/UserSessionHydrator";
import { getQueryClient } from "./get-query-client";
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
