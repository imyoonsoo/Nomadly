"use client";

import Image from "next/image";
import { ChevronDown } from "@/constants/icons";
import { PaginationProps } from "./type";

const maxVisible = 5;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);

    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center transition duration-200 hover:-translate-y-px active:scale-90 disabled:cursor-default disabled:opacity-40 disabled:hover:translate-y-0 disabled:active:scale-100"
      >
        <ChevronDown className="h-5 w-5 rotate-90" />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              text-14-medium
              transition
              active:scale-[0.92]
              after:absolute
              after:-bottom-1
              after:left-0
              after:h-0.5
              after:transition-all
              after:duration-[250ms]
              hover:text-gray-950
              hover:after:w-full
              ${
                isActive
                  ? "font-bold text-gray-950 after:w-full after:bg-primary-500 hover:after:bg-primary-500"
                  : "font-medium text-gray-400 after:w-0 after:bg-transparent hover:after:bg-[rgba(61,158,242,0.5)]"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          transition
          duration-200
          hover:-translate-y-px
          active:scale-90
          disabled:cursor-default
          disabled:opacity-40
          disabled:translate-y-0
          disabled:active:scale-100
        "
      >
        <ChevronDown className="h-5 w-5 -rotate-90" />
      </button>
    </div>
  );
};

export default Pagination;
