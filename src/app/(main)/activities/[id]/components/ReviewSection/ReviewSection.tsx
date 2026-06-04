import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewMockData from "../../mock/reviewData";
import { ReviewBlue } from "@/constants/icons";
import Button from "@/components/Button/Button";

const REVIEW_DISPLAY_COUNT = 4;

const ReviewSection = () => {
  const data = ReviewMockData;

  const latestReviews = [...data.reviews]
    .sort(
      (firstReview, secondReview) =>
        new Date(secondReview.updatedAt).getTime() -
        new Date(firstReview.updatedAt).getTime(),
    )
    .slice(0, REVIEW_DISPLAY_COUNT);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ReviewBlue className="w-6 h-6" />
        <h2 className="text-16-bold md:text-18-bold text-gray-950">
          체험 후기
        </h2>
        <span className="text-14-medium md:text-16-bold font-semibold text-gray-400">
          {data.totalCount}개
        </span>
      </div>
      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-24-bold md:text-32-bold font-semibold text-gray-950">
            {data.averageRating}
          </span>
          <span className="text-14-bold md:text-16-bold text-gray-950">
            매우 만족
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5 p-5">
          {latestReviews.map((review) => (
            <ReviewCard
              key={review.id}
              user={review.user}
              rating={review.rating}
              content={review.content}
              createdAt={review.createdAt}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="reviewMore"
            height="h37"
            className="text-16-bold w-40 md:w-76.5"
          >
            리뷰 더보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
