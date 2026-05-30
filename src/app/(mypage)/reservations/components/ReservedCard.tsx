import StateBadge from "@/components/StateBadge/StateBadge";
import Image from "next/image";
const ReservedCard = () => {
  return (
    <div className="relative rounded-[32px] w-[309px] h-[136px] md:w-[574px] md:h-[200px] shadow-[4px_6px_6px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col justify-between relative z-10 border-2 border-blue-500 w-[211px] h-[136px] p-5 rounded-3xl bg-white md:w-[423px] md:h-[200px] md:px-10 md:py-[30px]">
        <div className="flex flex-col gap-[8px] md:gap-[10px]">
          <StateBadge status="confirmed" />
          <div className="flex flex-col md:gap-[10px]">
            <h1 className="text-14-bold text-gray-950 md:text-18-bold">
              title
            </h1>
            <p className="text-13-medium text-gray-500 md:text-16-medium">
              11:00 - 12:30
            </p>
          </div>
        </div>

        <p className="text-16-bold text-gray-950 md:text-18-bold">
          ₩ 35,000{" "}
          <span className="text-14-medium text-gray-400 md:text-16-medium">
            / 00명
          </span>
        </p>
      </div>
      <div className="absolute right-0 top-0 w-[136px] h-[136px] rounded-3xl overflow-hidden md:w-[200px] md:h-[200px] ">
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
