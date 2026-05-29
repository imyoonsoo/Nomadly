import StateBadge from "@/components/StateBadge/StateBadge";
import Image from "next/image";
const ReservedCard = () => {
  return (
    <div className="relative w-[309px] h-[136px]">
      <div className="relative z-10 border-2 border-blue-500 w-[211px] h-[136px] p-5 rounded-3xl bg-white">
        <StateBadge status="confirmed" />
        <h1>title</h1>
        <p>11:00 - 12:30</p>
        <p>
          ₩ 35,000 <span>/ 00명</span>
        </p>
      </div>
      <div className="absolute right-0 top-0 w-[136px] h-[136px] rounded-3xl overflow-hidden">
        <Image
          src="/exImg.svg"
          fill
          alt="액티비티 사진"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ReservedCard;
