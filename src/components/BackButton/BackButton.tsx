"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "@/constants/icons";
import { BackButtonProps } from "./type";

export const BackButton = ({ label = "", className = "" }: BackButtonProps) => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    const isFromInApp =
      Number(sessionStorage.getItem("inAppNavCount") ?? "0") > 1;

    if (isFromInApp) {
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
