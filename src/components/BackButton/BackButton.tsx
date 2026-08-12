"use client";

import { useRouter } from "next/navigation";
import { Back } from "@/constants/icons";

interface BackButtonProps {
  /** 버튼 옆 텍스트 (기본 "뒤로가기", 빈 문자열이면 아이콘만) */
  label?: string;
  className?: string;
}

const BackButton = ({ label = "뒤로가기", className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="뒤로 가기"
      className={`flex items-center gap-1 text-gray-700 transition hover:text-gray-950 ${className}`}
    >
      <Back />
      {label && (
        <span className="text-14-medium md:text-16-medium">{label}</span>
      )}
    </button>
  );
};

export default BackButton;
