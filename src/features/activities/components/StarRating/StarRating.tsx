import { StarOn, StarOff } from "@/constants/icons";
import { STAR_RATING_NUMBERS } from "@/constants/starRating";
import StarRatingProps from "./type";

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex">
      {STAR_RATING_NUMBERS.map((num) =>
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
