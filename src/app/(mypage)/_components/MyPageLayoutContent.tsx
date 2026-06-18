"use client";

import { usePathname } from "next/navigation";
import SideMenu from "@/components/layout/SideMenu/SideMenu";
import Footer from "@/components/layout/Footer/Footer";

interface MyPageLayoutContentProps {
  children: React.ReactNode;
}

const MyPageLayoutContent = ({ children }: MyPageLayoutContentProps) => {
  const pathname = usePathname();

  const isWideForm = pathname.startsWith("/activities");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-250 mx-auto flex items-start gap-12 p-8 md:py-7.5 md:px-0 mt-12 mb-20 md:mt-20">
        {!isWideForm && <SideMenu />}
        <section className="flex-1 min-w-0">{children}</section>
      </main>
      <Footer />
    </div>
  );
};

export default MyPageLayoutContent;
