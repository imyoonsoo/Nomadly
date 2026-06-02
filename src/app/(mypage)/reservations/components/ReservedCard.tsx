import Button from "@/components/Button/Button";
import StateBadge from "@/components/StateBadge/StateBadge";
import Image from "next/image";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface ReservedCardProps {
  date: string;
  title: string;
  status: ReservationStatus;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
  // Todo: bannerImage 추가
}

const ReservedCard = ({
  date,
  title,
  status,
  startTime,
  endTime,
  totalPrice,
  headCount,
}: ReservedCardProps) => {
  return (
    <div className="pt-[20px] flex flex-col gap-[12px]">
      <p className="text-16-bold text-gray-800 lg:text-18-bold">{date}</p>
      <div className="relative rounded-[32px] h-[136px]  w-[100%] lg:w-[90%] lg:max-w-[640px] lg:h-[181px] overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.20)]">
        <div className="flex flex-col justify-between relative z-10 w-[70%] h-full p-5 rounded-[32px] bg-white lg:px-[40px] lg:py-[30px]">
          <StateBadge status={status} />
          <div className="flex flex-col">
            <h1 className="text-14-bold text-gray-950 lg:text-18-bold">
              {title}
            </h1>
            <p className="text-13-medium text-gray-500 lg:text-16-medium">
              {startTime} - {endTime}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-16-bold text-gray-950 lg:text-18-bold">
              {totalPrice}
              <span className="text-14-medium text-gray-400 lg:text-16-medium">
                / {headCount}명
              </span>
            </p>
            {status === "confirmed" && (
              <div className="hidden lg:flex gap-[8px] ">
                <Button
                  variant="whitenGray"
                  height="h29"
                  className="px-[10px] py-[6px] !border"
                >
                  예약 변경
                </Button>
                <Button
                  variant="onlyGray"
                  height="custom"
                  className="h-[29px] px-[10px] py-[6px] rounded-lg text-14-medium !text-gray-600"
                >
                  예약 취소
                </Button>
              </div>
            )}
            {status === "completed" && (
              <Button
                variant="mainBlue"
                height="custom"
                className="hidden lg:block h-[29px] px-[10px] rounded-lg text-14-medium"
              >
                후기 작성
              </Button>
            )}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-[40%] overflow-hidden">
          <Image
            src="/exImg.svg"
            fill
            alt="액티비티 사진"
            className="object-cover"
          />
        </div>
      </div>
      {status === "confirmed" && (
        <div className="flex w-full gap-[12px] lg:hidden">
          <Button
            variant="whitenGray"
            height="custom"
            className="flex-1 h-[37px] rounded-lg p-[10px]"
          >
            예약 변경
          </Button>
          <Button
            variant="onlyGray"
            height="custom"
            className="flex-1 h-[37px] rounded-lg p-[10px]"
          >
            예약 취소
          </Button>
        </div>
      )}
      {status === "completed" && (
        <Button
          variant="mainBlue"
          height="custom"
          className="lg:hidden sm:block md:block w-full h-[37px] px-[10px] rounded-[8px]"
        >
          후기 작성
        </Button>
      )}
    </div>
  );
};

export default ReservedCard;
