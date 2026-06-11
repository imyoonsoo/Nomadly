import { ButtonHTMLAttributes, ReactNode } from "react";

export interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "pcTb" | "mo";
  icon?: ReactNode;
  isActive?: boolean;
}
