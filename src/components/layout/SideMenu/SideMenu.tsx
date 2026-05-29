"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  User as UserIcon,
  List as ReservationIcon,
  Setting as SettingIcon,
  Calendar as CalendarIcon,
  AltRight as ArrowRight,
  AltLeft as ArrowLeft,
} from "@/constants/icons";

const MENU_LIST = [
  {
    id: "profile",
    href: "/mypage",
    icon: UserIcon,
    label: "내 정보",
  },
  {
    id: "reservations",
    href: "/mypage/reservations",
    icon: ReservationIcon,
    label: "예약내역",
  },
  {
    id: "activities",
    href: "/mypage/activities",
    icon: SettingIcon,
    label: "내 체험 관리",
  },
  {
    id: "reservation-status",
    href: "/mypage/reservation-status",
    icon: CalendarIcon,
    label: "예약 현황",
  },
];

const SideMenu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSideMenu = () => {
    setIsOpen(false);
  };

  const handleToggleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleCloseSideMenu}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        />
      )}

      <nav
        className={`fixed top-[20%] left-0 z-50 w-55 px-3.5 py-6 flex justify-center items-center gap-6 bg-white border border-gray-50 rounded-r-xl shadow-[0_4px_24px_rgba(156,180,202,0.2)] transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%-5px)]"}
          lg:w-72.5 md:relative md:translate-x-0 md:rounded-xl`}
      >
        <ul className="w-full flex flex-col justify-center items-start gap-3.5">
          {MENU_LIST.map((menu) => {
            const Icon = menu.icon;
            const isActive =
              menu.href === "/mypage"
                ? pathname === "/mypage"
                : pathname.startsWith(menu.href);

            return (
              <li key={menu.id} className="w-full h-full">
                <Link
                  href={menu.href}
                  onClick={handleCloseSideMenu}
                  className={`
                    w-full px-5 py-3.5 flex items-center gap-2 rounded-2xl text-16-medium hover:text-gray-700 hover:bg-gray-50 active:scale-95 transition
                    ${
                      isActive
                        ? "bg-primary-100 text-gray-950"
                        : "bg-transparent text-gray-600"
                    }`}
                >
                  <Icon
                    width={24}
                    height={24}
                    className={isActive ? "text-primary-500" : "text-gray-600"}
                  />
                  <span>{menu.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={handleToggleButtonClick}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isOpen}
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full z-[999] w-8.75 h-40 rounded-r-xl flex items-center justify-center bg-white border border-gray-50 shadow-[0_4px_24px_rgba(156,180,202,0.2)] md:hidden"
        >
          {isOpen ? (
            <ArrowLeft width={24} height={24} />
          ) : (
            <ArrowRight width={24} height={24} />
          )}
        </button>
      </nav>
    </>
  );
};

export default SideMenu;
