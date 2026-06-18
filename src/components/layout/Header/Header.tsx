"use client";

import { useState, useEffect } from "react";
import type { HeaderProps } from "./type";
import Link from "next/link";

import HeaderUserMenu from "./HeaderUserMenu";
import HeaderGuestMenu from "./HeaderGuestMenu";

import LogoVertical from "@/assets/images/logo-vertical.svg";
import LogoSymbol from "@/assets/images/logo-symbol.svg";

import Recommendation from "@/assets/icons/recommendation.svg";
import Game from "@/assets/icons/game.svg";

const TEST_USER = {
  id: 1,
  email: "test@test.com",
  nickname: "정만철",
  profileImageUrl: "",
};

const Header = ({ user }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const testUser = user ?? TEST_USER;

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
      className={`w-full h-12 fixed top-0 left-0 z-[110] md:z-100 md:h-20 flex justify-center transition-colors duration-300 ${isScrolled ? "bg-white" : "bg-transparent"}`}
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
        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            href="/recommendation"
            className="
              flex
              items-center
              justify-center
              transition-transform
              hover:scale-115
              active:scale-100
            "
            aria-label="추천 페이지"
          >
            <Recommendation className="w-5 h-5 md:w-6 md:h-6 text-cyan-500 hover:text-indigo-500" />
          </Link>

          <Link
            href="/game"
            className="
              flex
              items-center
              justify-center
              transition-transform
              hover:scale-110
              active:scale-95
            "
            aria-label="게임 페이지"
          >
            <Game className="w-6 h-6 md:w-7 md:h-7 text-yellow-500 hover:rotate-12 transition-all duration-200 hover:text-primary-500" />
          </Link>

          {/* Todo: 로그인 기능 완료 후 수정 */}
          {user ? <HeaderUserMenu user={user} /> : <HeaderGuestMenu />}
          {/* <HeaderUserMenu user={testUser} /> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
