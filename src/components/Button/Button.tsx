"use client";

import { Kakao as KakaoIcon } from "@/constants/icons";
import { ButtonProps } from "./type";

const based = `flex items-center 
  disabled:cursor-not-allowed disabled:opacity-70 
  [&_svg]:shrink-0 [&_svg]:aspect-square`;

const variantStyle: { [key: string]: string } = {
  fillTransparent: `bg-transparent
  border-2 border-primary-100
  text-gray-600 font-medium tracking-[-0.1px]
    active:bg-primary-100 active:border-primary-500 active:text-primary-500 active:[&_svg]:text-primary-500
    [&_svg]:text-gray-600`,

  fillWhite: `bg-white
    border-2 border-gray-50
    text-gray-600 
    active:bg-[#FCFCFC] active:border-[#B2B1B9] active:text-gray-600
    disabled:bg-gray-200 disabled:text-gray-50`,

  fillPrimaryBlue: `bg-primary-500
    text-white font-bold tracking-[0.1px]
    active:bg-[#2b8de0] active:text-white
    disabled:bg-gray-200 disabled:text-gray-50 disabled:[&_svg]:text-gray-400`,

  fillGray50: `bg-gray-50
    text-gray-300 font-medium tracking-[-0.35px]
    active:bg-[#F6F6F6] active:text-gray-400
    disabled:bg-white disabled:border-gray-300 disabled:text-gray-200 disabled:[&_svg]:text-gray-500`,

  fillGray200: `bg-gray-200
    text-white font-bold tracking-[-0.1px]
    active:bg-gray-300 active:text-white
    disabled:bg-gray-100 disabled:text-gray-300 disabled:[&_svg]:text-gray-300`,

  fillGray300: `bg-gray-300
    text-gray-50 font-bold tracking-[-0.1px]
    active:bg-gray-400 active:text-gray-50
    disabled:bg-gray-100 disabled:text-gray-300 disabled:[&_svg]:text-gray-300`,

  kakaoButton: `bg-white
  border-2 border-[#FFF9A3]
    text-[#E8D800]
    [&_svg]:text-[#3c1e1e]
    active:bg-white active:border active:border-[#e6cf00]
    disabled:bg-white disabled:border disabled:border-gray-200 disabled:text-gray-200 disabled:[&_svg]:text-gray-500`,
};

const sizeStyle: { [key: string]: string } = {
  lg54: `h-[54px] rounded-2xl text-base [&_svg]:size-6`,
  md47: `h-[47px] rounded-[14px] text-base [&_svg]:size-5`,
  sm41: `h-[41px] rounded-xl text-sm [&_svg]:size-6`,
  h29: `h-[29px] rounded-lg text-sm`,
  h50: `h-[50px] rounded-[14px] text-base`,
  custom: ``,
};

const iconJustify = {
  left: {
    lg54: `justify-start py-3 pr-10 pl-5 gap-2`,
    md47: `justify-start py-3.5 pr-10 pl-5 gap-2`,
    sm41: `justify-start py-3 px-10 pl-5 gap-[6px]`,
    h29: `justify-start py-1 pr-6 pl-3 gap-1`,
    h50: `justify-start py-3 pr-10 pl-5 gap-2`,
  },
  center: {
    lg54: `justify-center py-3 px-10 gap-1`,
    md47: `justify-center py-[14px] px-10 gap-1`,
    sm41: `justify-center py-1 px-5`,
    h29: `justify-center py-1 px-6 gap-1`,
    h50: `justify-center py-3 px-10 gap-2`,
  },
};

const Button = ({
  styleVariant,
  heightSize,
  setIcon,
  iconPosition,
  className,
  ...restProps
}: ButtonProps) => {
  const { children, ...restDefaultButtonAttributes } = restProps;
  const iconStatusValue =
    styleVariant === "kakaoButton" ? <KakaoIcon /> : setIcon;
  const isIconWhere = iconPosition ?? (iconStatusValue ? "center" : undefined);

  return (
    <button
      className={[
        based,
        styleVariant ? variantStyle[styleVariant] : null,
        sizeStyle[heightSize],
        isIconWhere && heightSize !== "custom"
          ? iconJustify[isIconWhere][heightSize]
          : isIconWhere
            ? "justify-center"
            : "justify-center px-3.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...restDefaultButtonAttributes}
    >
      {iconStatusValue}
      {children}
    </button>
  );
};

export default Button;
