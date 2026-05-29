"use client";

import { Google, Kakao } from "@/constants/icons";
import { ButtonProps } from "./type";

const basic =
  "flex items-center [&_svg]:shrink-0 [&_svg]:aspect-square disabled:cursor-not-allowed disabled:opacity-70";

const sizes = {
  lg: "h-13.5 rounded-2xl text-base [&_svg]:size-6",
  md: "h-12 rounded-[14px] text-base [&_svg]:size-5",
  sm: "h-10.3 rounded-xl text-sm [&_svg]:size-4",
} as const;

const iconPositionStyle = {
  start: {
    layout:
      "justify-start w-fit min-w-28.75 gap-2 tracking-[-0.35px] font-medium",
    size: {
      lg: "py-3 pr-10 pl-5",
      md: "py-3.5 pr-10 pl-5",
      sm: "py-3 pr-10 pl-5",
    },
    state: `bg-transparent text-[#1f1f22] border-none [&_svg]:text-gray-500
      active:bg-primary-100 active:text-[#1f1f22] active:[&_svg]:text-primary-500
      disabled:bg-gray-50 disabled:text-[#1f1f22] disabled:[&_svg]:text-primary-500`,
  },
  center: {
    layout:
      "justify-center w-85.5 min-w-auto gap-1 tracking-[-0.4px] font-medium",
    size: {
      lg: "py-3 px-10",
      md: "py-3.5 px-10",
      sm: "py-1 px-5 h-8.5",
    },
    state: `bg-white text-[#3c1e1e] border border-gray-200
      [&_svg]:text-[#3c1e1e]
      active:bg-white active:border-1.7 active:border-[#e6cf00]
      disabled:bg-white disabled:text-gray-200 disabled:border-gray-200
      disabled:[&_svg]:text-gray-500`,
  },
} as const;

const basicStyle = {
  layout: "justify-center w-85.5 min-w-auto gap-1 tracking-[-0.4px] font-bold",
  size: {
    lg: "py-3.5 px-10",
    md: "py-3.5 px-10",
    sm: "py-3 px-10",
  },
  state: `bg-primary-500 text-white border-none
    active:bg-[#2b8de0]
    disabled:bg-gray-200 disabled:text-gray-50`,
};

const socialStyle = {
  kakao: {
    icon: <Kakao />,
    state: `bg-white text-[#e6cf00] border border-gray-200
      [&_svg]:text-[#3c1e1e]
      active:bg-white active:border-1.7 active:border-[#e6cf00]
      disabled:bg-white disabled:text-gray-200 disabled:border-gray-200
      disabled:[&_svg]:text-gray-500`,
  },
  google: {
    icon: <Google />,
    state: `bg-white text-[#1f1f22] border border-gray-200
      active:bg-gray-25
      disabled:bg-gray-200 disabled:text-gray-50`,
  },
} as const;

const Button = ({
  iconPosition,
  size = "lg",
  icon,
  social,
  className,
  ...restProps
}: ButtonProps) => {
  const currentSocial = social && socialStyle[social];

  const buttonStyle = currentSocial
    ? { ...iconPositionStyle.center, state: currentSocial.state }
    : iconPosition
      ? iconPositionStyle[iconPosition]
      : basicStyle;

  const selfMergeButtonStyle = [
    basic,
    sizes[size],
    buttonStyle.layout,
    buttonStyle.size[size],
    buttonStyle.state,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const socialIcon = currentSocial ? currentSocial.icon : icon;
  const hasIcon = !!socialIcon || !!iconPosition;

  return (
    <button className={selfMergeButtonStyle} {...restProps}>
      {hasIcon ? (
        <>
          {socialIcon}
          {restProps.children}
        </>
      ) : (
        restProps.children
      )}
    </button>
  );
};

export default Button;
