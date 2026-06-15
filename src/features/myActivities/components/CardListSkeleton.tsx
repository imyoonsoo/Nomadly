const CardSkeleton = () => {
  return (
    <div className="w-full p-7.5 bg-white rounded-3xl shadow-[0_4px_24px_rgba(156,180,202,0.3)] flex justify-between items-center gap-6">
      <div className="w-full flex flex-col justify-center items-start gap-3">
        <div className="w-20 h-7 bg-gray-50 animate-pulse rounded"></div>
        <div className="w-13 h-6 bg-gray-50 animate-pulse rounded"></div>
        <div className="w-39 h-7 bg-gray-50 animate-pulse rounded"></div>
        <div className="flex items-center gap-3 pt-3 lg:pt-5">
          <div className="w-17.5 h-7.25 bg-gray-50 animate-pulse rounded"></div>
          <div className="w-17.5 h-7.25 bg-gray-50 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="shrink-0 w-20.5 h-20.5 md:w-35.5 md:h-35.5 rounded-3xl bg-gray-50 animate-pulse"></div>
    </div>
  );
};

const CardListSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardListSkeleton;
