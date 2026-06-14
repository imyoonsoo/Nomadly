import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from "@tanstack/react-query";
import type {
  EditMyReservationsParams,
  GetMyReservationsParams,
  SubmitReviewParams,
} from "./types";
import {
  cancelMyReservations,
  editMyReservations,
  getActivityDetailClient,
  getMyReservations,
  submitReview,
} from "./api";

export const myReservationsInfiniteQuery = (params?: GetMyReservationsParams) =>
  infiniteQueryOptions({
    queryKey: ["my-reservations", params],
    queryFn: ({ pageParam }) =>
      getMyReservations({ ...params, cursorId: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
  });

export const cancelReservationMutation = (reservationId: number) =>
  mutationOptions({
    mutationFn: () => cancelMyReservations(reservationId),
  });

export const submitReviewMutation = (reservationId: number) =>
  mutationOptions({
    mutationFn: (body: SubmitReviewParams) => submitReview(reservationId, body),
  });

export const editReservationsMutation = (reservationId: number) =>
  mutationOptions({
    mutationFn: (body: EditMyReservationsParams) =>
      editMyReservations(reservationId, body),
  });

export const activityDetailQuery = (activityId: number) =>
  queryOptions({
    queryKey: ["activity", activityId],
    queryFn: () => getActivityDetailClient(activityId),
  });
