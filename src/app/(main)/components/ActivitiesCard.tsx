import Image from "next/image";
import Link from "next/link";
import { CardItem } from "./type";
import { StarOn } from "@/constants/icons";
import { NoImg } from "@/constants/images";

const ActivitiesCard = ({
  title,
  bannerImageUrl,
  id,
  price,
  rating,
  reviewCount,
}: CardItem) => {
  return (
    <div className="w-full hover:transform-[translateY(-5px)] transition ease-in">
      <Link href={`/activities/${id}`}>
        <div className="relative aspect-[1/1.1] md:rounded-4xl rounded-[18px] overflow-hidden bg-gray-200">
          <Image
            src={bannerImageUrl || NoImg}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative bg-white px-4.25 md:px-7.5 py-4 md:py-5 -mt-12.5 z-auto rounded-[18px] md:rounded-4xl shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
          <p className="text-14-medium md:text-18-medium truncate">{title}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <StarOn className="w-4 h-4" />
            <div>
              <span className="text-12-medium md:text-14-medium">{rating}</span>
              <span className="text-12-medium md:text-14-medium text-gray-400">
                ({reviewCount})
              </span>
            </div>
          </div>
          <div className="mt-2.5 md:mt-4.5 whitespace-nowrap">
            <span className="text-16-bold md:text-18-bold">
              ₩ {price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ActivitiesCard;
