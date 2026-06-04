import { StarOn } from "@/constants/icons";
import { DefaultProfile } from "@/constants/images";
import ReviewCardProps from "./type";

const ReviewCard = ({ user, rating, content, createdAt }: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3 p-5 rounded-3xl bg-[#E5F3FF] shadow-[0_4px_24px_rgba(156,180,202,0.2)] w-full h-61.5">
      <div className="flex">
        <div className="flex grow">
          <div className="flex gap-3">
            <div className="h-10.5 w-10.5 overflow-hidden rounded-full border-2 border-white shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={`${user.nickname} 프로필`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <DefaultProfile className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="text-14-bold md:text-16-bold font-semibold text-gray-950">
                {user.nickname}
              </span>
              <span className="text-12-medium md:text-14-medium md:font-medium text-gray-400">
                {createdAt}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-0.5">
          <StarOn className="w-4 h-4" />
          <span className="text-16-bold text-gray-500">{rating}</span>
        </div>
      </div>
      <p className="text-14-medium font-normal md:font-normal md:text-16-medium text-gray-950">
        {content}
      </p>
    </div>
  );
};

export default ReviewCard;
