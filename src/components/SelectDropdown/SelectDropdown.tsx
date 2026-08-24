"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { SelectDropdownProps } from "./types";
import { AltDown } from "@/constants/icons";

const SelectDropdown = ({
  options,
  selectedValue,
  onChange,
  placeholder,
  fieldLabel,
}: SelectDropdownProps) => {
  const selectId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {fieldLabel && (
        <label htmlFor={selectId} className="text-16-bold mb-2.5 block">
          {fieldLabel}
        </label>
      )}

      <button
        id={selectId}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`text-16-medium flex h-13.5 w-full items-center justify-between rounded-2xl border-2 border-gray-100 px-4 py-5 whitespace-nowrap shadow-[0_2px_6px_0_rgba(0,0,0,0.02)] ${selectedOption ? "text-gray-950" : "text-gray-400"}`}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <AltDown className="h-5 w-5" />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 z-20 mt-2 flex max-h-71 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white py-3 shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`text-16-medium hover:bg-primary-100 hover:text-primary-500 w-full px-4 py-3 text-left whitespace-nowrap ${
                  selectedValue === option.value
                    ? "bg-primary-500/70 text-white"
                    : "text-gray-900"
                }`}
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

export default SelectDropdown;
