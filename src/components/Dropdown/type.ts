import { ReactNode } from "react";

export interface DropdownChildrenProps {
  toggle: () => void;
}

export interface DropdownOption {
  label: string;
  onSelect: () => void;
}

export interface DropdownProps {
  options: DropdownOption[];
  children: (props: DropdownChildrenProps) => ReactNode;
}
