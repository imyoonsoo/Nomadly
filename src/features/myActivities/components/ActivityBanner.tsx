import Skeleton from "@/components/Skeleton/Skeleton";
import {
  House as HouseIcon,
  Calendar as CalendarIcon,
} from "@/constants/icons";

interface ActivityBannerProps {
  count: number;
  isLoading?: boolean;
}

const ActivityBanner = ({ count = 0, isLoading }: ActivityBannerProps) => {
  return (
    <div className="bg-primary-100 mb-5 flex w-full items-center justify-between gap-4 rounded-3xl px-7.5 py-5">
      <div className="flex min-w-0 items-center gap-4 md:gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white md:h-14 md:w-14">
          <HouseIcon className="text-primary-500 h-8.5 w-6 md:h-10 md:w-7.5" />
        </div>
        <div className="flex min-w-0 flex-col items-start justify-center gap-2">
          <h1 className="text-14-bold md:text-16-bold whitespace-nowrap text-gray-950">
            나의 체험 현황
          </h1>
          <p className="text-12-medium md:text-13-medium break-keep text-gray-500">
            체험을 통해 더 많은 여행자와 소통해보세요!
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <CalendarIcon className="text-primary-500 h-6 w-6 shrink-0 md:h-7.5 md:w-7.5" />
        <div className="flex flex-col items-start justify-center whitespace-nowrap">
          <span className="text-12-medium text-gray-500">총 체험 수</span>
          {isLoading ? (
            <Skeleton className="h-5.5 w-11" />
          ) : (
            <span className="text-14-bold text-gray-950">{count}개</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityBanner;
