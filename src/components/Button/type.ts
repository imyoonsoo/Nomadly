import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "fillTransparent"
    | "fillWhite"
    | "fillPrimaryBlue"
    | "fillGray50"
    | "fillGray200"
    | "fillGray300"
    | "kakaoButton";

  heightSize: "lg54" | "md47" | "sm41" | "h29" | "h50" | "custom";
  icon?: ReactNode;
  iconPosition?: "left" | "center";
}
