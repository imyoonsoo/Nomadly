import type { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText?: string;
}

export interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonTextLeft?: string;
  buttonTextRight?: string;
}
