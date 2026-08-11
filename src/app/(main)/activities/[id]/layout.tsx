interface ActivityLayoutProps {
  children: React.ReactNode;
}

const ActivityLayout = ({ children }: ActivityLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto mt-12 flex w-full max-w-300 flex-1 items-start gap-12 p-7.5 md:mt-20">
        <section className="min-w-0 flex-1">{children}</section>
      </main>
    </div>
  );
};
export default ActivityLayout;
