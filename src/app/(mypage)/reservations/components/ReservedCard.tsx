import StateBadge from "@/components/StateBadge/StateBadge";
import Image from "next/image";
const ReservedCard = () => {
  return (
    <div className="relative rounded-[32px] w-[327px] h-[136px] overflow-hidden md:w-[476px] md:h-[136px] lg:w-[640px] lg:h-[181px] shadow-[0_4px_24px_0_rgba(156,180,202,0.20)]">
      <div className="flex flex-col justify-between relative z-10 w-[229px] h-[136px] p-5 rounded-3xl bg-white md:w-[360px] md:h-[136px] lg:w-[485px] lg:h-[181px] lg:px-[40px] lg:py-[30px]">
        <div className="flex flex-col gap-[8px] lg:gap-[12px]">
          <StateBadge status="confirmed" />
          <div className="flex flex-col lg:gap-[10px]">
            <h1 className="text-14-bold text-gray-950 lg:text-18-bold">
              title
            </h1>
            <p className="text-13-medium text-gray-500 lg:text-16-medium">
              11:00 - 12:30
            </p>
          </div>
        </div>

        <p className="text-16-bold text-gray-950 lg:text-18-bold">
          ₩ 35,000{" "}
          <span className="text-14-medium text-gray-400 lg:text-16-medium">
            / 00명
          </span>
        </p>
      </div>
      <div className="absolute right-0 top-0 w-[136px] h-[136px] lg:w-[181px] lg:h-[181px] overflow-hidden">
        <Image
          src="/exImg.svg"
          fill
          alt="액티비티 사진"
          className="object-cover"
        />
      </div>
    </div>
    // Todo: 버튼 추가하기
  );
};

export default ReservedCard;
