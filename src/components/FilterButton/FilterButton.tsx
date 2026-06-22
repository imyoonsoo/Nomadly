"use client";

import { FilterButtonProps } from "./type";

const sizes = {
  pcTb: {
    padding: "py-[10px] px-4",
    gap: "gap-[6px]",
    iconSize: "[&_svg]:size-6",
    fontSize: "text-base",
    letterSpacing: "tracking-[-0.4px]",
  },
  mo: {
    padding: "py-[10px] px-[14px]",
    gap: "gap-1",
    iconSize: "[&_svg]:size-4",
    fontSize: "text-sm",
    letterSpacing: "tracking-[-0.35px]",
  },
} as const;

const stateStyle = {
  active:
    "bg-gray-850 text-white [&_svg]:text-white border border-transparent font-medium",
  inactive:
    "bg-white text-gray-950 [&_svg]:text-black border border-gray-160 font-medium",
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
    isActive ? stateStyle.active : stateStyle.inactive,
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
