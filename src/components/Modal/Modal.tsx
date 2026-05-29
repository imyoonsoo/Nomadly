"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { ModalProps } from "./type";

const SIZE_CLASSES = {
  sm: "w-[320px] min-h-[140px] rounded-[24px] p-[30px] md:w-[400px] md:min-h-[170px] md:rounded-[30px] md:p-10",
  md: "w-[320px] min-h-[185px] rounded-[24px] p-[30px] pb-[24px] md:w-[400px] md:min-h-[242px] md:rounded-[30px] md:p-[30px]",
  lg: "w-[321px] min-h-[493px] rounded-[30px] px-6 py-5 md:w-[385px] md:min-h-[549px] md:py-[30px]",
};

const Modal = ({
  isOpen,
  onClose,
  size = "sm",
  className,
  overlayClassName,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [onClose, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${overlayClassName ?? ""}`}
      onMouseDown={onClose}
    >
      <div
        className={`${SIZE_CLASSES[size]} bg-white ${className ?? ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
