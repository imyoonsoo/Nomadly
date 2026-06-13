import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { GetMyReservationsParams, SubmitReviewParams } from "./types";
import { cancelMyReservations, getMyReservations, submitReview } from "./api";

export const myReservationsQuery = (params?: GetMyReservationsParams) =>
  queryOptions({
    queryKey: ["my-reservations", params],
    queryFn: () => getMyReservations(params),
  });

export const cancelReservationMutation = (reservationId: number) =>
  mutationOptions({
    mutationFn: () => cancelMyReservations(reservationId),
  });

export const submitReviewMutation = (reservationId: number) =>
  mutationOptions({
    mutationFn: (body: SubmitReviewParams) => submitReview(reservationId, body),
  });
