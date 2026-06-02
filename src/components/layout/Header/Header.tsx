"use client";

import { useState, useEffect } from "react";
import type { HeaderProps } from "./type";
import Link from "next/link";

import HeaderUserMenu from "./HeaderUserMenu";
import HeaderGuestMenu from "./HeaderGuestMenu";

import LogoVertical from "@/assets/images/logo-vertical.svg";
import LogoSymbol from "@/assets/images/logo-symbol.svg";

const Header = ({ user }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full h-12 fixed top-0 left-0 z-100 md:h-20 flex justify-center transition-colors duration-300 ${isScrolled ? "bg-white" : "bg-transparent"}`}
    >
      <div className="w-full max-w-380 flex items-center justify-between mx-auto px-6 md:px-7.5">
        <Link href="/" className="flex items-center py-2.5 cursor-pointer">
          <LogoVertical
            aria-label="로고"
            width={174}
            height={28}
            className="hidden md:block"
          />
          <LogoSymbol
            aria-label="로고"
            width={28}
            height={28}
            className="block md:hidden"
          />
        </Link>
        <nav>
          {/* Todo: 로그인 기능 완료 후 수정 */}
          {user ? <HeaderUserMenu user={user} /> : <HeaderGuestMenu />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
