import Skeleton from "@/components/Skeleton/Skeleton";

const ReservedCardSkeleton = () => {
  return (
    <div className="pt-5 flex flex-col gap-3">
      <Skeleton className="h-5 w-[120px] lg:h-6" />
      <div className="relative rounded-[32px] h-[136px] w-full lg:w-[90%] lg:max-w-screen-sm lg:h-[181px] overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.20)]">
        <div className="flex flex-col justify-between relative z-10 w-[70%] h-full p-5 rounded-[32px] bg-white lg:px-10 lg:py-[30px]">
          <Skeleton className="h-6 w-[60px] rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-4/5 lg:h-5" />
            <Skeleton className="h-3.5 w-3/5 lg:h-4" />
          </div>
          <Skeleton className="h-[18px] w-[100px] lg:h-5" />
        </div>
        <div className="absolute right-0 top-0 h-full w-2/5">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
      </div>
      <div className="flex w-full gap-3 lg:hidden">
        <Skeleton className="flex-1 h-9 rounded-lg" />
        <Skeleton className="flex-1 h-9 rounded-lg" />
      </div>
    </div>
  );
};

const ReservedCardListSkeleton = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="rounded-full w-24 h-11 shrink-0" />
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
