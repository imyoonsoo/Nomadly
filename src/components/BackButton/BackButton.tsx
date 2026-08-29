"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "@/constants/icons";
import { IN_APP_NAV_COUNT_KEY } from "@/constants/session";
import { BackButtonProps } from "./type";

export const BackButton = ({ label = "", className = "" }: BackButtonProps) => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    // 앱 안에서 한 번이라도 이동했으면 뒤로가기, 아니면 홈으로
    const isFromInApp =
      Number(sessionStorage.getItem(IN_APP_NAV_COUNT_KEY) ?? "0") > 0;

    // 카운트와 별개로 실제 히스토리가 있어야 뒤로가기 가능
    if (isFromInApp && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleBackButtonClick}
      aria-label={label ? undefined : "뒤로가기"}
      className={`-ml-2 flex items-center gap-1 p-1 text-gray-900 transition-opacity hover:opacity-60 md:-ml-1 ${className}`}
    >
      <ChevronLeft aria-hidden="true" className="h-8.25 w-8.25 md:h-9 md:w-9" />
      {label && (
        <span className="text-14-medium md:text-16-medium">{label}</span>
      )}
    </button>
  );
};
