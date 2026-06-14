import { infiniteQueryOptions, mutationOptions } from "@tanstack/react-query";
import type { GetMyReservationsParams, SubmitReviewParams } from "./types";
import { cancelMyReservations, getMyReservations, submitReview } from "./api";

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
