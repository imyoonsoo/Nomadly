import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  myActivitiesQueryOptions,
  reservationDashboardQueryOptions,
  reservationsQueryOptions,
  reservationStatusKeys,
  reservedScheduleQueryOptions,
} from "@/features/reservation-status/queries/query";

import { updateReservationStatus } from "@/features/reservation-status/api/reservationStatus";
import { ReservationStatus } from "@/features/reservation-status/type";

export const useMyActivities = () => {
  return useQuery(myActivitiesQueryOptions());
};

export const useReservationDashboard = (
  activityId: number,
  year: string,
  month: string,
) => {
  return useQuery(reservationDashboardQueryOptions(activityId, year, month));
};

export const useReservedSchedule = (
  activityId: number,
  date: string | null,
) => {
  return useQuery(reservedScheduleQueryOptions(activityId, date));
};

export const useReservations = (
  activityId: number,
  scheduleId: number,
  status: ReservationStatus,
) => {
  return useQuery(reservationsQueryOptions(activityId, scheduleId, status));
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReservationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reservationStatusKeys.all,
      });
    },
  });
};
