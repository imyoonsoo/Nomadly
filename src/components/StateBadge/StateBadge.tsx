"use client";

import { StateBadgeProps } from "./type";

interface ExtendedStateBadgeProps extends StateBadgeProps {
  className?: string;
}

const STATUS_MAP = {
  pending: {
    label: "예약 승인",
    className: "bg-[#DDF9F9] text-[#1790A0]",
  },
  confirmed: {
    label: "예약 완료",
    className: "bg-[#E9FBE4] text-[#2BA90D]",
  },
  declined: {
    label: "예약 거절",
    className: "bg-[#FCECEA] text-[#F96767]",
  },
  canceled: {
    label: "예약 취소",
    className: "bg-gray-100 text-gray-600",
  },
  completed: {
    label: "체험 완료",
    className: "bg-[#DAF0FF] text-[#0D6CD1]",
  },
} as const;

const StateBadge = ({ status, className = "" }: ExtendedStateBadgeProps) => {
  const state = STATUS_MAP[status];

  return (
    <span
      className={`
      inline-flex
      items-center
      justify-center
      rounded-full
      w-[63px]
      h-6
      text-13-bold
      leading-none
      tracking-[-0.5px]
      cursor-default
      ${state.className}
      ${className}
    `}
    >
      {state.label}
    </span>
  );
};

export default StateBadge;
