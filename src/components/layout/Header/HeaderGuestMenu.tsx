import Link from "next/link";
import type { AuthLink } from "./type";

const AUTH_LINKS: AuthLink[] = [
  {
    href: "/login",
    text: "로그인",
  },
  {
    href: "/signup",
    text: "회원가입",
  },
];

const HeaderGuestMenu = () => {
  return (
    <ul className="flex justify-center items-center gap-2.5 md:gap-3">
      {AUTH_LINKS.map(({ href, text }) => (
        <li
          key={href}
          className="px-3 py-2 text-14-medium text-gray-950 md:px-4 md:py-3 rounded hover:text-primary-500 active:scale-95 active:opacity-70 transition"
        >
          <Link href={href}>{text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderGuestMenu;
