import { BalanceResultItem } from "../type";

const CATEGORY_DESCRIPTION = {
  문화예술: "전시, 공방, 만들기 체험처럼 감성을 채우는 활동이 잘 맞아요.",
  식음료: "맛집 탐방, 쿠킹 클래스, 베이킹 체험처럼 먹는 즐거움이 잘 맞아요.",
  스포츠: "클라이밍, 라이딩, 액티비티처럼 몸을 움직이는 체험이 잘 맞아요.",
  투어: "가이드 투어, 로컬 탐방처럼 새로운 장소를 알아가는 체험이 잘 맞아요.",
  관광: "랜드마크, 명소, 야경처럼 여행 분위기를 느끼는 활동이 잘 맞아요.",
  웰빙: "요가, 명상, 스파처럼 편안하게 쉬는 체험이 잘 맞아요.",
};

interface BalanceResultProps {
  results: BalanceResultItem[];
  onRestart: () => void;
}

const BalanceResult = ({ results, onRestart }: BalanceResultProps) => {
  const topResult = results[0];

  return (
    <section className="w-full max-w-[700px]">
      <h2 className="text-center text-24-bold text-gray-900">
        당신의 여행 취향
      </h2>

      {topResult && (
        <div className="mt-6 rounded-3xl bg-white p-6 text-center shadow-md">
          <p className="text-14-bold text-primary-500">가장 잘 맞는 카테고리</p>
          <h3 className="mt-2 text-24-bold text-gray-900">
            {topResult.category}
          </h3>
          <p className="mt-3 text-14-medium leading-6 text-gray-500">
            {CATEGORY_DESCRIPTION[topResult.category]}
          </p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {results.map((result, index) => (
          <div
            key={result.category}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-16-bold text-gray-900">
                {index + 1}. {result.category}
              </p>
              <p className="text-14-bold text-primary-500">{result.percent}%</p>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-primary-500"
                style={{ width: `${result.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 h-12 w-full rounded-xl bg-primary-500 text-16-bold text-white transition hover:bg-primary-600"
      >
        다시하기
      </button>
    </section>
  );
};

export default BalanceResult;
