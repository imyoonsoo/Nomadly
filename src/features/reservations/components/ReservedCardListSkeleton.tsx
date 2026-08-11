import Skeleton from "@/components/Skeleton/Skeleton";

export const ReservedCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 pt-5">
      <Skeleton className="h-5 w-30 lg:h-6" />
      <div className="relative h-34 w-full overflow-hidden rounded-4xl shadow-[0_4px_24px_0_rgba(156,180,202,0.20)] lg:h-45 lg:w-[90%] lg:max-w-screen-sm">
        <div className="relative z-10 flex h-full w-[70%] flex-col justify-between rounded-4xl bg-white p-5 lg:px-10 lg:py-[30px]">
          <Skeleton className="h-6 w-15 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-4/5 lg:h-5" />
            <Skeleton className="h-3.5 w-3/5 lg:h-4" />
          </div>
          <Skeleton className="h-[18px] w-25 lg:h-5" />
        </div>
        <div className="absolute top-0 right-0 h-full w-2/5">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
      </div>
      <div className="flex w-full gap-3 lg:hidden">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </div>
    </div>
  );
};

const ReservedCardListSkeleton = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-24 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <ReservedCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ReservedCardListSkeleton;
