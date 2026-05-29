import type { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
}
