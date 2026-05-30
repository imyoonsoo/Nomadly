"use client";

import { useEffect, useRef, useState } from "react";
import type { DropdownProps } from "./type";

const Dropdown = ({ options, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      const isInsideDropdown = wrapperRef.current?.contains(targetNode);

      if (!isInsideDropdown) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      {children({ toggle: handleDropdownClick })}

      {isOpen && (
        <ul
          role="listbox"
          className={`absolute left-0 top-full mt-5 text-16-medium font-normal rounded-lg border border-gray-100 bg-white shadow-[0_16px_32px_rgba(0,0,0,0.1)] w-max`}
        >
          {options.map((option) => (
            <li key={option.label} className="px-[4px] py-[3px]">
              <button
                type="button"
                className={`block w-full rounded-[4px] px-[16px] py-[15px] text-center hover:bg-[#F2F2F2] active:bg-gray-800 active:text-gray-100`}
                onClick={() => {
                  option.onSelect();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
