import { queryOptions } from "@tanstack/react-query";
import type { GetMyReservationsParams } from "./types";
import { getMyReservations } from "./api";

export const myReservationsQuery = (params?: GetMyReservationsParams) =>
  queryOptions({
    queryKey: ["my-reservations", params],
    queryFn: () => getMyReservations(params),
  });
