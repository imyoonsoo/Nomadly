import { ReviewBlue } from "@/constants/icons";
import { getActivityReviews } from "@/features/activities/api/api";
import type { ActivityDetailResponse, Review } from "@/features/activities/type";
import ReviewSectionList from "./ReviewSectionList";

type ReviewSectionProps = Pick<ActivityDetailResponse, "reviewCount" | "rating"> & {
  activityId: number;
};

const getSatisfactionLabel = (averageRating: number): string => {
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

const ReviewSection = async ({
  activityId,
  reviewCount,
  rating,
}: ReviewSectionProps) => {
  let reviews: Review[] = [];

  if (reviewCount > 0) {
    try {
      const reviewData = await getActivityReviews({
        activityId,
        page: 1,
        size: reviewCount,
      });
      reviews = reviewData.reviews;
    } catch {
      reviews = [];
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ReviewBlue className="h-6 w-6" />
        <h2 className="text-16-bold md:text-18-bold text-gray-950">
          체험 후기
        </h2>
        <span className="text-14-medium md:text-16-bold font-semibold text-gray-400">
          {reviewCount}개
        </span>
      </div>
      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-24-bold md:text-32-bold font-semibold text-gray-950">
            {rating}
          </span>
          <span className="text-14-bold md:text-16-bold text-gray-950">
            {getSatisfactionLabel(rating)}
          </span>
        </div>
        <ReviewSectionList reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewSection;
