import Link from "next/link";
import { LogoPcTablet, LogoMobile } from "@/constants/images";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-dvh">
      <main
        className="flex-1 flex items-center justify-center w-full bg-white
        pt-16 pb-36
        md:pt-35 md:pb-30 md:px-13
        lg:px-0"
      >
        <div className="w-full md:w-160 mx-auto flex flex-col items-center gap-10 md:gap-16 px-6 md:px-0">
          <Link
            href="/"
            aria-label="메인페이지"
            className="flex flex-col items-center gap-3"
          >
            <LogoPcTablet
              className="hidden md:block w-74 h-57.75"
              aria-hidden="true"
            />
            <LogoMobile
              className="block md:hidden w-36 h-36"
              aria-hidden="true"
            />
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
