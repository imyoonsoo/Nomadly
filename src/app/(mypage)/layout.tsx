"use client";

import { usePathname } from "next/navigation";
import SideMenu from "@/components/layout/SideMenu/SideMenu";

interface MyPageLayoutProps {
  children: React.ReactNode;
}

const MyPageLayout = ({ children }: MyPageLayoutProps) => {
  const pathname = usePathname();

  const isWideForm = pathname.startsWith("/activities");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-[1200px] mx-auto flex items-start gap-12 p-7.5 mt-12 md:mt-20">
        {!isWideForm && <SideMenu />}
        <section className="flex-1 min-w-0">{children}</section>
      </main>
    </div>
  );
};

export default MyPageLayout;
