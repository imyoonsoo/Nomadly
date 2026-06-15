import Skeleton from "@/components/Skeleton/Skeleton";

const ReservedCardSkeleton = () => {
  return (
    <div className="pt-[20px] flex flex-col gap-[12px]">
      <Skeleton className="h-[20px] w-[120px] lg:h-[24px]" />
      <div className="relative rounded-[32px] h-[136px] w-[100%] lg:w-[90%] lg:max-w-[640px] lg:h-[181px] overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.20)]">
        <div className="flex flex-col justify-between relative z-10 w-[70%] h-full p-5 rounded-[32px] bg-white lg:px-[40px] lg:py-[30px]">
          <Skeleton className="h-[24px] w-[60px] rounded-full" />
          <div className="flex flex-col gap-[4px]">
            <Skeleton className="h-[16px] w-[80%] lg:h-[20px]" />
            <Skeleton className="h-[14px] w-[60%] lg:h-[16px]" />
          </div>
          <Skeleton className="h-[18px] w-[100px] lg:h-[20px]" />
        </div>
        <div className="absolute right-0 top-0 h-full w-[40%]">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
      </div>
      <div className="flex w-full gap-[12px] lg:hidden">
        <Skeleton className="flex-1 h-[37px] rounded-lg" />
        <Skeleton className="flex-1 h-[37px] rounded-lg" />
      </div>
    </div>
  );
};

const ReservedCardListSkeleton = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex gap-[8px] overflow-x-auto scrollbar-hide">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`animate-pulse bg-gray-200 rounded-[100px] w-[94px] h-[45px] shrink-0`}
          />
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
