import StarRating from "../StarRating/StarRating";
import ReviewCardProps from "./type";

const ReviewCard = ({ user, rating, content, createdAt }: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3 p-5 rounded-3xl shadow-[0_4px_24px_rgba(156,180,202,0.2)] w-full h-max">
      <div className="flex flex-col gap-1">
        <div className="flex justify-start items-center gap-2">
          <span className="text-14-bold md:text-16-bold font-semibold text-gray-950">
            {user.nickname}
          </span>
          <span className="text-12-bold md:text-14-medium font-semibold md:font-medium text-gray-400">
            {createdAt}
          </span>
        </div>
        <StarRating rating={rating} />
      </div>
      <p className="text-14-medium md:text-16-medium text-gray-950">
        {content}
      </p>
    </div>
  );
};

export default ReviewCard;
