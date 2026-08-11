import Link from "next/link";
import { LogoPcTablet, LogoMobile } from "@/constants/images";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex w-full flex-1 items-center justify-center bg-white pt-16 pb-36 md:px-13 md:pt-35 md:pb-30 lg:px-0">
        <div className="mx-auto flex w-full flex-col items-center gap-10 px-6 md:w-160 md:gap-16 md:px-0">
          <Link
            href="/"
            aria-label="메인페이지"
            className="flex flex-col items-center gap-3"
          >
            <LogoPcTablet
              className="hidden h-57.75 w-74 md:block"
              aria-hidden="true"
            />
            <LogoMobile
              className="block h-36 w-36 md:hidden"
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
