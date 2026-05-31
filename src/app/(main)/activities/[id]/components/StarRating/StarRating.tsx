import { StarOn, StarOff } from "@/constants/icons";
import { STAR_RATING_NUMBER } from "@/constants/starRating";
import StarRaingProps from "./type";

const StarRating = ({ rating }: StarRaingProps) => {
  return (
    <div className="flex">
      {STAR_RATING_NUMBER.map((num) =>
        num <= rating ? (
          <StarOn key={num} className="w-4 h-4" />
        ) : (
          <StarOff key={num} className="w-4 h-4" />
        ),
      )}
    </div>
  );
};

export default StarRating;
