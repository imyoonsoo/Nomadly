import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

interface MyPageLayoutProps {
  children: React.ReactNode;
}

const MyPageLayout = ({ children }: MyPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-300 mx-auto flex items-start gap-12 p-7.5 mt-12 md:mt-20">
        <section className="flex-1 min-w-0">{children}</section>
      </main>
      <Footer />
    </div>
  );
};

export default MyPageLayout;
