import { useEffect } from "react";

interface UseLeaveBlockerProps {
  isDirty: boolean;
  onBlock: (targetUrl: string) => void; // 이동이 차단되었을 때 모달을 열어줄 함수
}

export const useLeaveBlocker = ({ isDirty, onBlock }: UseLeaveBlockerProps) => {
  // 브라우저 새로고침 및 창 닫기 방어
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // 뒤로 가기 및 내부 링크 클릭 가로채기
  useEffect(() => {
    if (!isDirty) return;

    // 뒤로 가기 방어
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      onBlock("back");
    };

    // 내부 네비게이션 링크 클릭 방어
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");

        // 내부 링크이면서, 현재 페이지와 다른 곳으로 갈 때만 차단
        if (
          href &&
          !href.startsWith("#") &&
          href !== window.location.pathname
        ) {
          e.preventDefault();
          onBlock(href);
        }
      }
    };

    // 초기 상태 세팅 및 이벤트 등록
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [isDirty, onBlock]);
};
