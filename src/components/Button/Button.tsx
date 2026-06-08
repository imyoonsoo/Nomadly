"use client";

import { Kakao as KakaoIcon } from "@/constants/icons";
import { ButtonProps } from "./type";

const DEFAULT_SETTING = `flex items-center 
  disabled:cursor-not-allowed disabled:opacity-70 
  [&_svg]:shrink-0 [&_svg]:aspect-square`;

const VARIANTS: { [key: string]: string } = {
  mainBlue: `bg-primary-500
    text-white
    active:bg-[#2b8de0]
    disabled:bg-gray-200 disabled:text-gray-50 disabled:[&_svg]:text-gray-400`,

  whitenBlue: `bg-white
    border border-gray-200
    text-gray-600
    active:bg-primary-500 active:border-none active:text-white
    disabled:bg-gray-25 disabled:text-gray-200`,

  whitenGray: `bg-white
    border border-gray-200
    text-gray-600
    active:bg-[#FCFCFC] active:border-[#B2B1B9] active:text-gray-600
    disabled:bg-gray-200 disabled:text-gray-50`,

  onlyGray: `bg-gray-50
    text-gray-600
    active:bg-[#d8d9e0] active:border active:border active:border-[#B2B1B9]
    disabled:bg-[#f3f3f5] disabled:text-[#c0c0c5]`,

  clear: `bg-transparent
  border border-primary-100
  text-gray-600
  [&_svg]:text-gray-600
  active:bg-primary-100 active:text-gray-950 active:[&_svg]:text-[#2b8de0]`,

  easyKakao: `bg-white 
  border border-[#FCE000] 
    text-[#fae100]
    [&_svg]:text-[#3c1e1e]
    active:bg-white active:border active:border-[#FAF285]
    disabled:bg-white disabled:border disabled:border-gray-200 disabled:text-gray-200 disabled:[&_svg]:text-gray-500`,

  reviewMore: `bg-white
  border border-[#79747E]
  text-[#808080]
  active:bg-[#FCFCFC] active:border-[#4A4550] active:text-[#4A4550]
  disabled:border disabled:border-[#C4C4C4] disabled:text-[#C4C4C4]
  `,
};

const SIZES: { [key: string]: string } = {
  "54lg": `h-[54px] rounded-2xl text-base font-bold py-[14px] px-[40px] [&_svg]:size-6 gap-1`,
  "47md": `h-[47px] rounded-[14px] text-base font-bold py-[14px] px-[40px] [&_svg]:size-5 gap-1`,
  "41sm": `h-[41px] rounded-xl text-sm font-normal py-[12px] px-[40px] [&_svg]:size-4 gap-1`,
  h50: `h-[50px] rounded-[14px] text-base font-bold py-[14px] px-[40px] [&_svg]:size-6 gap-1`,
  h37: `h-[37px] rounded-lg text-sm font-normal p-[10px] [&_svg]:size-5 gap-1`,
  h29: `h-[29px] rounded-lg text-sm font-normal py-[6px] px-[10px] [&_svg]:size-4 gap-1`,
  h23: `h-[23px] rounded-lg text-sm font-normal py-[6px] px-[10px] [&_svg]:size-4 gap-1`,
  custom: ``,
};

const Button = ({
  variant,
  height,
  icon,
  className,
  ...restProps
}: ButtonProps) => {
  const { children: text, ...restDefaultButtonAttributes } = restProps;
  const displayIcon = variant === "easyKakao" ? <KakaoIcon /> : icon;
  const isJustifyCustomized = className
    ? /\bjustify-(start|end|center|between|around|evenly|normal|stretch)\b/.test(
        className,
      )
    : false;

  return (
    <button
      className={[
        DEFAULT_SETTING,
        variant ? VARIANTS[variant] : null,
        height ? SIZES[height] : null,
        isJustifyCustomized ? null : "justify-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...restDefaultButtonAttributes}
    >
      {displayIcon}
      {text}
    </button>
  );
};

export default Button;
