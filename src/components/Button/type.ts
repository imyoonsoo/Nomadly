import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "mainBlue"
    | "whitenBlue"
    | "whitenGray"
    | "onlyGray"
    | "clear"
    | "kakao"
    | "reviewMore";

  height?: "54lg" | "47md" | "41sm" | "h23" | "h29" | "h37" | "h50" | "custom";
  icon?: ReactNode;
  iconJustify?: "left" | "center";
}
