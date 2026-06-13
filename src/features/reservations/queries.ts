import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { GetMyReservationsParams } from "./types";
import { cancelMyReservations, getMyReservations } from "./api";

export const myReservationsQuery = (params?: GetMyReservationsParams) =>
  queryOptions({
    queryKey: ["my-reservations", params],
    queryFn: () => getMyReservations(params),
  });

export const cancelReservationMutation = (reservationId: number) =>
  mutationOptions({
    mutationFn: () => cancelMyReservations(reservationId),
  });
