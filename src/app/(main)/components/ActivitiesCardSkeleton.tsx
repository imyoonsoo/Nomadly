// 로딩 중 보여줄 카드 스켈레톤
const ActivitiesCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse rounded-[18px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] md:rounded-4xl">
      <div className="aspect-[1/1.1] rounded-[18px] bg-gray-200 md:rounded-4xl" />
      <div className="relative -mt-12.5 rounded-[18px] bg-white px-4.25 py-4 md:rounded-4xl md:px-7.5 md:py-5">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
        <div className="mt-3 h-5 w-1/3 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export { ActivitiesCardSkeleton };
