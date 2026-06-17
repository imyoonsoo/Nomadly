import serverFetch from "@/lib/http/serverFetch";
import {
  GetActivityDetailParams,
  ActivityDetailResponse,
  GetActivityReviewsParams,
  ActivityReviewsResponse,
} from "@/features/activities/type";

export const getActivityDetail = async ({
  activityId,
}: GetActivityDetailParams): Promise<ActivityDetailResponse> => {
  return serverFetch<ActivityDetailResponse>(`/activities/${activityId}`);
};

export const getActivityReviews = async ({
  activityId,
  page,
  size,
}: GetActivityReviewsParams): Promise<ActivityReviewsResponse> => {
  const searchParams = new URLSearchParams();

  if (page !== undefined) {
    searchParams.set("page", String(page));
  }

  if (size !== undefined) {
    searchParams.set("size", String(size));
  }

  const query = searchParams.toString();

  return serverFetch<ActivityReviewsResponse>(
    `/activities/${activityId}/reviews${query ? `?${query}` : ""}`,
  );
};
