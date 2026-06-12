import serverFetch from "@/lib/http/server-fetch";
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
    const api = await serverFetch();
    const { data } = await api.get<ActivityDetailResponse>(
      `/activities/${activityId}`,
    );

    return data;
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
    const api = await serverFetch();
    const { data } = await api.get<ActivityReviewsResponse>(
      `/activities/${activityId}/reviews`,
      {
        params: { page, size },
      },
    );

    return data;
  } catch (error) {
    console.error("Failed to get activity reviews:", error);
    throw error;
  }
};
