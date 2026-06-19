import Link from "next/link";
import { LogoPcTablet, LogoMobile } from "@/constants/images";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main
        className="flex-1 flex items-center justify-center w-full bg-white
        pt-[100px] pb-[120px] px-6
        md:pt-[140px] md:mb-[120px] md:px-13 md:pb-30
        lg:px-0"
      >
        <div className="w-full md:w-160 lg:w-160 mx-auto flex flex-col items-center gap-4 md:gap-5 px-6 md:px-0">
          <Link
            href="/"
            aria-label="메인페이지"
            className="flex flex-col items-center gap-3"
          >
            <div className="md:block hidden">
              <LogoPcTablet className="w-63.75 h-49.75" />
            </div>
            <div className="md:hidden block">
              <LogoMobile className="w-36 h-36" />
            </div>
          </Link>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
