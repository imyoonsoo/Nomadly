import Image from "next/image";
import type { CardProps } from "../page";
import StarIcon from "@/assets/icons/star-on.svg";

const Card = ({
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
}: CardProps) => {
  return (
    <div className="w-full p-7.5 bg-white rounded-3xl shadow-[0_4px_24px_rgba(156,180,202,0.2)] flex justify-between items-center">
      <div className="w-full flex flex-col justify-center items-start gap-3">
        <h2 className="text-16-bold lg:text-18-bold text-gray-950">{title}</h2>
        <div className="flex items-center gap-0.5 text-13-medium lg:text-16-medium text-gray-500">
          <StarIcon width={16} height={16} />
          <span>{rating}</span>
          <span>({reviewCount})</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-16-bold lg:text-18-bold text-gray-950">
            ₩{price.toLocaleString()}
          </span>
          <span className="text-14-medium lg:text-16-medium text-gray-400">
            / 인
          </span>
        </div>
        <div className="flex items-center gap-3 pt-3 lg:pt-5">
          <button className="border border-gray-50 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-200 active:scale-95 transition">
            수정하기
          </button>
          <button className="border border-gray-50 rounded-lg px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-red-100 hover:text-red-600 hover:border-red-100 active:scale-95 transition">
            삭제하기
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden shrink-0 w-20.5 h-20.5 rounded-3xl lg:w-35.5 lg:h-35.5 lg:rounded-4xl">
        <Image
          src={bannerImageUrl}
          alt="배너 이미지"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Card;
