import Link from "next/link";
import BalanceGame from "@/features/recommendation/balance/components/BalanceGame";
import { Back } from "@/constants/icons";

const BalanceGamePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-40">
      <div className="absolute md:top-24 md:left-40 lg:left-56 top-10">
        <Link
          href="/recommendation"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-14-bold text-gray-700 transition hover:bg-primary-100"
        >
          <Back className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
          추천 목록
        </Link>
      </div>

      <BalanceGame />
    </main>
  );
};

export default BalanceGamePage;
