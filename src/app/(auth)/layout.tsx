import Link from "next/link";
import { LogoPcTablet, LogoMobile } from "@/constants/images";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex items-center justify-center w-full min-h-screen bg-white
      py-14 pb-25 px-6
      md:py-17.25 md:px-13 md:pb-30
      lg:px-0"
    >
      <div className="w-full md:w-160 lg:w-160 mx-auto flex flex-col items-center gap-4 md:gap-5 px-6 md:px-0">
        <Link
          href="/"
          aria-label="메인페이지"
          className="flex flex-col items-center gap-3"
        >
          <LogoPcTablet
            className="hidden md:block w-63.75 h-49.75"
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
};

export default AuthLayout;
