"use client";

import { FilterButtonProps } from "./type";

const sizes = {
  pcTb: {
    padding: "py-2.5 px-4",
    gap: "gap-1.5",
    iconSize: "[&_svg]:size-6",
    fontSize: "text-base",
    letterSpacing: "tracking-[-0.4px]",
  },
  mo: {
    padding: "py-2.5 px-3.5",
    gap: "gap-1",
    iconSize: "[&_svg]:size-4",
    fontSize: "text-sm",
    letterSpacing: "tracking-[-0.35px]",
  },
} as const;

const STATE_STYLE = {
  active:
    "bg-[#333333] text-white [&_svg]:text-white border border-transparent font-medium",
  inactive:
    "bg-white text-gray-950 [&_svg]:text-black border border-[#d8d8d8] font-medium",
} as const;

const FilterButton = ({
  size = "pcTb",
  icon,
  isActive = false,
  className,
  ...restProps
}: FilterButtonProps) => {
  const sizeStyle = sizes[size];

  const selfMergeFilterButtonStyle = [
    "inline-flex justify-center items-center rounded-full whitespace-nowrap",
    "[&_svg]:shrink-0 [&_svg]:aspect-square",
    "disabled:cursor-not-allowed disabled:opacity-70",
    sizeStyle.padding,
    sizeStyle.gap,
    sizeStyle.iconSize,
    sizeStyle.fontSize,
    sizeStyle.letterSpacing,
    isActive ? STATE_STYLE.active : STATE_STYLE.inactive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={selfMergeFilterButtonStyle} {...restProps}>
      {icon}
      {restProps.children}
    </button>
  );
};

export default FilterButton;
