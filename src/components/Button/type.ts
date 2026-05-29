import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "lg" | "md" | "sm";
  social?: "kakao" | "google";
  icon?: ReactNode;
  iconPosition?: "start" | "center";
}
