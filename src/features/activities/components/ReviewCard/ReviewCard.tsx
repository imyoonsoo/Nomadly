import Image from "next/image";
import { DefaultProfile } from "@/constants/images";
import ReviewCardProps from "./type";
import formatDotDate from "@/lib/utils/formatDate";
import StarRating from "../StarRating/StarRating";

const ReviewCard = ({ user, rating, content, createdAt }: ReviewCardProps) => {
  const formattedDate = formatDotDate(createdAt);

  return (
    <div className="flex flex-col gap-4 md:gap-5 p-5 rounded-3xl bg-[#E5F3FF] shadow-[0_4px_24px_rgba(156,180,202,0.2)] w-full h-auto">
      <div className="flex items-center">
        <div className="flex grow">
          <div className="flex gap-3 justify-center items-center">
            <div className="relative h-10.5 w-10.5 overflow-hidden rounded-full border-2 border-white shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              {user.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt={`${user.nickname} 프로필`}
                  fill
                  className="object-cover"
                />
              ) : (
                <DefaultProfile className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-14-bold md:text-16-bold font-semibold text-gray-950">
                {user.nickname}
              </span>
              <StarRating rating={rating} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-14-medium font-normal md:font-normal md:text-16-medium text-gray-950">
        {content}
      </p>
      <div className="flex w-full justify-end">
        <span className="text-12-medium md:text-14-medium md:font-medium text-gray-400">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
