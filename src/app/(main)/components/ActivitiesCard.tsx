import Image from "next/image";
import Link from "next/link";
import { CardItem } from "./type";
import { StarOn } from "@/constants/icons";

const ActivitiesCard = ({
  title,
  imageUrl,
  link,
  price,
  reviewCount,
}: CardItem) => {
  return (
    <div className="w-full">
      <Link href={link}>
        <div className="aspect-[1/1.1] md:rounded-[32px] rounded-[18px] overflow-hidden">
          <Image
            src={imageUrl}
            alt="인기이벤트이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative bg-white px-[17px] md:px-[30px] py-[16px] md:py-[20px] mt-[-50px] z-auto rounded-[18px] md:rounded-[32px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
          <p className="text-14-medium md:text-18-medium truncate">{title}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <StarOn className="w-4 h-4" />
            <div>
              <span className="text-12-medium md:text-14-medium">4.9</span>
              <span className="text-12-medium md:text-14-medium text-gray-400">
                ({reviewCount})
              </span>
            </div>
          </div>
          <div className="mt-2.5 md:mt-4.5 whitespace-nowrap">
            <span className="text-16-bold md:text-18-bold">
              ₩ {price.toLocaleString()}
            </span>
            <span className="text-12-medium md:text-16-medium text-gray-400">
              / 인
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ActivitiesCard;
