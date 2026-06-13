import serverFetch from "@/lib/http/serverFetch";
import {
  GetActivityDetailParams,
  ActivityDetailResponse,
  GetActivityReviewsParams,
  ActivityReviewsResponse,
} from "@/app/(main)/activities/type";

export const getActivityDetail = async ({
  activityId,
}: GetActivityDetailParams): Promise<ActivityDetailResponse> => {
  try {
    return await serverFetch<ActivityDetailResponse>(
      `/activities/${activityId}`,
    );
  } catch (error) {
    console.error("Failed to get activity detail:", error);
    throw error;
  }
};

export const getActivityReviews = async ({
  activityId,
  page,
  size,
}: GetActivityReviewsParams): Promise<ActivityReviewsResponse> => {
  try {
    const searchParams = new URLSearchParams();

    if (page !== undefined) {
      searchParams.set("page", String(page));
    }

    if (size !== undefined) {
      searchParams.set("size", String(size));
    }

    const query = searchParams.toString();

    return await serverFetch<ActivityReviewsResponse>(
      `/activities/${activityId}/reviews${query ? `?${query}` : ""}`,
    );
  } catch (error) {
    console.error("Failed to get activity reviews:", error);
    throw error;
  }
};
