"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { IN_APP_NAV_COUNT_KEY } from "@/constants/session";

// 앱 내부 이동 횟수를 세서 BackButton의 뒤로가기 판단에 사용
export const useInAppNavCount = () => {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 최초 마운트는 새로고침으로도 실행되므로 내부 이동에서 제외
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const navCount = Number(
      sessionStorage.getItem(IN_APP_NAV_COUNT_KEY) ?? "0",
    );
    sessionStorage.setItem(IN_APP_NAV_COUNT_KEY, String(navCount + 1));
  }, [pathname]);
};
