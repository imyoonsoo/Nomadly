"use client";

import { useEffect, useRef, useState } from "react";
import { AltDown } from "@/constants/icons";

export interface ReservationDropdownOption {
  value: number;
  label: string;
}

interface ReservationDropdownProps {
  options: ReservationDropdownOption[];
  selectedValue: number;
  onChange: (value: number) => void;
}

const ReservationDropdown = ({
  options,
  selectedValue,
  onChange,
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
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-12 xl:h-16 w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-4 text-14-medium md:text-16-medium text-gray-950 outline-none"
      >
        <span>{selectedOption?.label}</span>
        <AltDown className="w-5 h-5" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-[62px] z-20 max-h-[200px] w-full overflow-y-auto rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-14-medium md:text-16-medium hover:bg-primary-100 hover:text-primary-500 ${
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

export default ReservationDropdown;
