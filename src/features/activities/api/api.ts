import axios from "axios";
import {
  GetActivityDetailParams,
  ActivityDetailResponse,
  GetActivityReviewsParams,
  ActivityReviewsResponse,
} from "@/app/(main)/activities/type";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getActivityDetail = async ({
  activityId,
}: GetActivityDetailParams): Promise<ActivityDetailResponse> => {
  try {
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
