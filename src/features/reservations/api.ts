import type {
  CancelReservationResponse,
  EditMyReservationsParams,
  GetMyReservationsParams,
  GetMyReservationsResponse,
  SubmitReviewParams,
  SubmitReviewResponse,
} from "./types";
import clientFetch from "@/lib/http/clientFetch";
import type { ActivityDetailResponse } from "@/app/(main)/activities/type";

const BASE_URL = "/my-reservations";

export const getMyReservations = async (
  params?: GetMyReservationsParams,
): Promise<GetMyReservationsResponse> => {
  const response = await clientFetch.get(BASE_URL, { params });
  return response.data;
};

export const cancelMyReservations = async (
  reservationId: number,
): Promise<CancelReservationResponse> => {
  const response = await clientFetch.patch(`${BASE_URL}/${reservationId}`, {
    status: "canceled",
  });
  return response.data;
};

export const editMyReservations = async (
  reservationId: number,
  body: EditMyReservationsParams,
) => {
  const response = await clientFetch.patch(
    `${BASE_URL}/${reservationId}/application`,
    body,
  );
  return response.data;
};

export const submitReview = async (
  reservationId: number,
  body: SubmitReviewParams,
): Promise<SubmitReviewResponse> => {
  const response = await clientFetch.post(
    `${BASE_URL}/${reservationId}/reviews`,
    body,
  );
  return response.data;
};

export const getActivityDetailClient = async (
  activityId: number,
): Promise<ActivityDetailResponse> => {
  const response = await clientFetch.get(`/activities/${activityId}`);
  return response.data;
};
