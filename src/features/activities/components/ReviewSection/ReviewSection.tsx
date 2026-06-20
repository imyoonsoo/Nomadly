import ReviewCard from "../ReviewCard/ReviewCard";
import { ReviewBlue } from "@/constants/icons";
import Button from "@/components/Button/Button";
import { getActivityReviews } from "@/features/activities/api/api";
import type {
  GetActivityReviewsParams,
  ActivityReviewsResponse,
} from "@/features/activities/type";

const REVIEW_DISPLAY_COUNT = 3;

const getSatisfactionLabel = (averageRating: number): string => {
  if (averageRating === 0) {
    return "리뷰 없음";
  }
  if (averageRating >= 4.5) {
    return "매우 만족";
  }
  if (averageRating >= 4.0) {
    return "만족";
  }
  if (averageRating >= 3.0) {
    return "보통";
  }

  return "불만족";
};

const ReviewSection = async ({ activityId }: GetActivityReviewsParams) => {
  let reviewData: ActivityReviewsResponse;

  try {
    reviewData = await getActivityReviews({
      activityId,
      page: 1,
      size: REVIEW_DISPLAY_COUNT,
    });
  } catch (error) {
    reviewData = {
      averageRating: 0,
      totalCount: 0,
      reviews: [],
    };
  }

  const latestReviews = [...reviewData.reviews]
    .sort((firstReview, secondReview) =>
      secondReview.updatedAt.localeCompare(firstReview.updatedAt),
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
          {reviewData.totalCount}개
        </span>
      </div>
      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-24-bold md:text-32-bold font-semibold text-gray-950">
            {reviewData.averageRating}
          </span>
          <span className="text-14-bold md:text-16-bold text-gray-950">
            {getSatisfactionLabel(reviewData.averageRating)}
          </span>
        </div>
        <div className="flex flex-col gap-7.5 p-5">
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
