"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ReservationSlideUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ReservationSlideUpModal = ({
  isOpen,
  onClose,
  children,
}: ReservationSlideUpModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      const timer = window.setTimeout(() => setIsMounted(false), 300);

      return () => window.clearTimeout(timer);
    }

    setIsMounted(true);

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isMounted, onClose]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-100 lg:hidden">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onMouseDown={onClose}
        aria-hidden
      />

      <div
        className={`scrollbar-hide max-h-92vh fixed inset-x-0 bottom-0 overflow-y-auto rounded-t-3xl bg-white shadow-xl transition-transform duration-300 ease-out ${isVisible ? "translate-y-0" : "translate-y-full"}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="px-6 py-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default ReservationSlideUpModal;
