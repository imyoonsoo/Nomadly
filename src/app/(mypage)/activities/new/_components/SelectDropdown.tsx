"use client";

import { useEffect, useRef, useState } from "react";
import { AltDown } from "@/constants/icons";

export interface ReservationDropdownOption {
  value: number | string;
  label: string;
}

interface ReservationDropdownProps {
  options: ReservationDropdownOption[];
  selectedValue: number | string;
  onChange: (value: number | string) => void;
  placeholder?: string;
  label?: string;
}

const SelectDropdown = ({
  options,
  selectedValue,
  onChange,
  placeholder,
  label,
}: ReservationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  useEffect(() => {
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
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {label && (
        <label className="text-16-medium mb-[10px] block">{label}</label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-[54px] flex justify-between items-center text-16-medium px-4 py-5 border-2 border-gray-100 rounded-[16px] shadow-[0_2px_6px_0_rgba(0,0,0,0.02)] ${selectedOption ? "text-gray-950" : "text-gray-400"}`}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <AltDown className="w-5 h-5" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-[60px] z-20 max-h-[280px] w-full overflow-y-auto rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-16-medium hover:bg-primary-100 hover:text-primary-500 ${
                  selectedValue === option.value
                    ? "text-white bg-primary-500/70"
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
