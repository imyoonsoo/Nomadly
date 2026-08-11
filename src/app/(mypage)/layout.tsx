import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import getProfileAction from "@/features/mypage/actions/getProfileAction";
import MyPageLayoutContent from "./_components/MyPageLayoutContent";

interface MyPageLayoutProps {
  children: React.ReactNode;
}

const MyPageLayout = async ({ children }: MyPageLayoutProps) => {
  const user = await getProfileAction().catch(() => null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <MyPageLayoutContent>{children}</MyPageLayoutContent>
      <Footer />
    </div>
  );
};

export default MyPageLayout;
