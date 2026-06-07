import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "mainBlue" // bg: 블루(primary) | outline: X
    | "whitenBlue" // bg: 화이트 | outline: 블루(primary)
    | "whitenGray" // bg: 화이트 | outline: 연그레이(gray50)
    | "onlyGray" // bg: 연그레이(gray50)   | outline: 진그레이
    | "clear" // 마이페이지 사이드메뉴 버튼용 스타일
    | "easykakao" // 로그인/회원가입 페이지 간편카카오 스타일
    | "reviewMore"; // 리뷰 더보기 버튼용 스타일;

  height?: "54lg" | "47md" | "41sm" | "h23" | "h29" | "h37" | "h50" | "custom";
  icon?: ReactNode;
}
