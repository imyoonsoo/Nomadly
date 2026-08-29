"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import UserSessionHydrator from "@/features/auth/components/UserSessionHydrator";
import { useInAppNavCount } from "@/hooks/useInAppNavCount";
import { getQueryClient } from "./get-query-client";
import dynamic from "next/dynamic";

// 개발환경에서만 번들에 포함되도록 동적 import
const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(() =>
        import("@tanstack/react-query-devtools").then(
          (m) => m.ReactQueryDevtools,
        ),
      )
    : () => null;

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  // BackButton 뒤로가기 판단용 내부 이동 카운트
  useInAppNavCount();

  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionHydrator>{children}</UserSessionHydrator>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default Providers;
