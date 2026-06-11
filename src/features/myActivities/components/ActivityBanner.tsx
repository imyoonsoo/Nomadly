import {
  House as HouseIcon,
  Calendar as CalendarIcon,
} from "@/constants/icons";

interface ActivityBannerProps {
  count: number;
}

const ActivityBanner = ({ count = 0 }: ActivityBannerProps) => {
  return (
    <div className="w-full bg-primary-100 px-7.5 py-5 mb-5 rounded-3xl flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 md:gap-5 min-w-0">
        <div className="bg-white w-11 h-11 md:w-14 md:h-14 rounded-full flex justify-center items-center shrink-0">
          <HouseIcon className="w-6 h-8.5 text-primary-500 md:w-7.5 md:h-10" />
        </div>
        <div className="flex flex-col justify-center items-start gap-2 min-w-0">
          <h1 className="text-14-bold md:text-16-bold text-gray-950 whitespace-nowrap">
            나의 체험 현황
          </h1>
          <p className="text-12-medium md:text-13-medium text-gray-500 break-keep">
            체험을 통해 더 많은 여행자와 소통해보세요!
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <CalendarIcon className="w-6 h-6 text-primary-500 md:w-7.5 md:h-7.5 shrink-0" />
        <div className="flex flex-col justify-center items-start whitespace-nowrap">
          <span className="text-gray-500 text-12-medium">총 체험 수</span>
          <span className="text-gray-950 text-14-bold">{count}개</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityBanner;
