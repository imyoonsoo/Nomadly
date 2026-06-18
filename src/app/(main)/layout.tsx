import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import getProfileAction from "@/features/mypage/actions/getProfileAction";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const user = await getProfileAction().catch(() => null);

  return (
    <div>
      <Header user={user} />
      {children}
      <Footer />
    </div>
  );
};
export default MainLayout;
