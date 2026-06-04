import Image from "next/image";
import type { CardProps } from "../page";
import StarIcon from "@/assets/icons/star-on.svg";
import Button from "@/components/Button/Button";

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
          {/* Todo: api 연결 후 버튼 클릭 이벤트 생성 */}
          <Button variant="whitenGray" height="h29" className="px-2.5 py-1.5">
            수정하기
          </Button>
          <Button
            variant="onlyGray"
            height="h29"
            className="px-2.5 py-1.5 rounded-lg text-14-medium"
          >
            삭제하기
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden shrink-0 w-20.5 h-20.5 rounded-3xl lg:w-35.5 lg:h-35.5 lg:rounded-4xl bg-primary-100">
        {/* Todo: api 연결 후 이미지 url next.config.ts에 설정 추가 */}
        {/* <Image
          src={bannerImageUrl}
          alt="배너 이미지"
          fill
          className="object-cover"
        /> */}
      </div>
    </div>
  );
};

export default Card;
