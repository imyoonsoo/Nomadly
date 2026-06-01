import Button from "@/components/Button/Button";
import StateBadge from "@/components/StateBadge/StateBadge";
import Image from "next/image";
const ReservedCard = () => {
  return (
    <div className="pt-[20px] flex flex-col gap-[12px]">
      <p className="text-16-bold text-gray-800 lg:text-18-bold">2023.12.04</p>
      <div className="relative rounded-[32px] w-[327px] h-[136px] overflow-hidden md:w-[476px] md:h-[136px] lg:w-[640px] lg:h-[181px] shadow-[0_4px_24px_0_rgba(156,180,202,0.20)]">
        <div className="flex flex-col justify-between relative z-10 w-[229px] h-[136px] p-5 rounded-[32px] bg-white md:w-[360px] md:h-[136px] lg:w-[485px] lg:h-[181px] lg:px-[40px] lg:py-[30px] ">
          <StateBadge status="confirmed" />
          <div className="flex flex-col ">
            <h1 className="text-14-bold text-gray-950 lg:text-18-bold">
              title
            </h1>
            <p className="text-13-medium text-gray-500 lg:text-16-medium">
              11:00 - 12:30
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-16-bold text-gray-950 lg:text-18-bold">
              ₩ 35,000{" "}
              <span className="text-14-medium text-gray-400 lg:text-16-medium">
                / 00명
              </span>
            </p>
            <div className="hidden lg:flex gap-[8px]">
              <Button
                styleVariant="fillWhite"
                heightSize="h29"
                className="h-[29px] px-[10px] py-[6px] rounded-lg text-14-medium !border"
              >
                예약 변경
              </Button>
              <Button
                styleVariant="fillGray50"
                heightSize="custom"
                className="h-[29px] px-[10px] py-[6px] rounded-lg text-14-medium !text-gray-600"
              >
                예약 취소
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0  top-1/2 -translate-y-1/2 w-[137px] h-[135px] lg:w-[182px] lg:h-[180px] overflow-hidden">
          <Image
            src="/exImg.svg"
            fill
            alt="액티비티 사진"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex w-[327px] md:w-[476px] gap-[12px]  lg:hidden">
        <Button
          styleVariant="fillWhite"
          heightSize="custom"
          className="flex-1 h-[37px] rounded-lg p-[10px] "
        >
          예약 변경
        </Button>
        <Button
          styleVariant="fillGray50"
          heightSize="custom"
          className="flex-1 h-[37px] rounded-lg p-[10px] !text-gray-600"
        >
          예약 취소
        </Button>
      </div>
    </div>

    // Todo: 버튼 추가하기
  );
};

export default ReservedCard;
