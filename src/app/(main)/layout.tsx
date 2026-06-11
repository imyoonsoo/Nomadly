import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default MainLayout;
