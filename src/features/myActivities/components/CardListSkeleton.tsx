import Skeleton from "@/components/Skeleton/Skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-between gap-6 rounded-3xl bg-white p-7.5 shadow-[0_4px_24px_rgba(156,180,202,0.3)]">
      <div className="flex w-full flex-col items-start justify-center gap-3">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-6 w-13" />
        <Skeleton className="h-7 w-39" />
        <div className="flex items-center gap-3 pt-3 lg:pt-5">
          <Skeleton className="h-7.25 w-17.5" />
          <Skeleton className="h-7.25 w-17.5" />
        </div>
      </div>
      <Skeleton className="h-20.5 w-20.5 shrink-0 rounded-3xl md:h-35.5 md:w-35.5" />
    </div>
  );
};

const CardListSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardListSkeleton;
