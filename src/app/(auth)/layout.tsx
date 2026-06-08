import Link from "next/link";
import { LogoPcTablet, LogoMobile } from "@/constants/images";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-center w-full
      pt-10 pb-20 px-6
      md:pt-20 md:pb-25 md:px-13
      lg:px-0"
    >
      {/* 로고 클릭: 메인(/) 이동 */}
      <div className="w-full md:w-160 lg:w-160 mx-auto flex flex-col items-center gap-6 md:gap-7.5 px-6 md:px-0">
        <Link
          href="/"
          aria-label="GlobalNomad 메인으로 이동"
          className="flex flex-col items-center gap-6"
        >
          <LogoPcTablet
            className="hidden md:block w-63.75 h-50"
            aria-hidden="true"
          />
          <LogoMobile
            className="block md:hidden w-36 h-36"
            aria-hidden="true"
          />
        </Link>

        {children}
      </div>
    </div>
  );
}
