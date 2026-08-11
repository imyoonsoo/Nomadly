"use client";

import { usePathname } from "next/navigation";
import SideMenu from "@/components/layout/SideMenu/SideMenu";

interface MyPageLayoutContentProps {
  children: React.ReactNode;
}

const MyPageLayoutContent = ({ children }: MyPageLayoutContentProps) => {
  const pathname = usePathname();

  const isWideForm = pathname.startsWith("/activities");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto mt-12 mb-20 flex w-full max-w-250 flex-1 items-start gap-12 p-8 md:mt-20 md:px-0 md:py-7.5">
        {!isWideForm && <SideMenu />}
        <section className="min-w-0 flex-1">{children}</section>
      </main>
    </div>
  );
};

export default MyPageLayoutContent;
