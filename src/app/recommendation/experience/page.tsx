import { Back } from "@/constants/icons";
import RecommendationTest from "@/features/recommendation/experience/components/RecommendationTest";

import Link from "next/link";

const RecommendationPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="absolute md:top-24 md:left-56 top-32">
        <Link
          href="/recommendation"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-14-bold text-gray-700 transition hover:bg-primary-100"
        >
          <Back className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
          추천 목록
        </Link>
      </div>
      <RecommendationTest />
    </main>
  );
};

export default RecommendationPage;
