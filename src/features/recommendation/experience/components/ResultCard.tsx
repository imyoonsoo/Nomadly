import { RecommendationResult } from "@/features/recommendation/experience/type";

const CATEGORY_DESCRIPTION = {
  문화예술: "전시, 공방, 만들기 클래스처럼 감성을 채우는 체험이 잘 맞아요.",
  식음료:
    "쿠킹 클래스, 베이킹, 맛집 탐방처럼 먹는 즐거움이 있는 체험이 잘 맞아요.",
  스포츠: "액티브하고 몸을 움직이는 활동적인 체험이 잘 맞아요.",
  투어: "가이드 투어, 로컬 탐방처럼 새로운 장소를 알아가는 체험이 잘 맞아요.",
  관광: "랜드마크, 명소, 도시 탐방처럼 여행 분위기를 느끼는 체험이 잘 맞아요.",
  웰빙: "휴식, 힐링, 명상처럼 몸과 마음을 편하게 하는 체험이 잘 맞아요.",
};

interface ResultCardProps {
  result: RecommendationResult;
  rank: number;
}

const ResultCard = ({ result, rank }: ResultCardProps) => {
  const medal = ["🥇", "🥈", "🥉"][rank];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-28-bold">{medal}</span>
        <h2 className="text-22-bold text-gray-900">{result.category}</h2>
      </div>

      <p className="text-15-medium mt-3 leading-6 text-gray-500">
        {CATEGORY_DESCRIPTION[result.category]}
      </p>
    </div>
  );
};

export default ResultCard;
