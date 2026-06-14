import clientFetch from "@/lib/http/clientFetch";
import {
  MyActivitiesResponse,
  ReservationCardItem,
  ReservationCardPage,
  ReservationDashboardItem,
  ReservedScheduleItem,
} from "@/features/reservation-status/type";
import { ReservationStatus } from "@/features/reservations/types";

export const getMyActivities = async (): Promise<MyActivitiesResponse> => {
  const res = await clientFetch.get("/my-activities");

  return res.data;
};

export const getReservationDashboard = async ({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}): Promise<ReservationDashboardItem[]> => {
  const res = await clientFetch.get(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      params: {
        year,
        month,
      },
    },
  );

  return res.data;
};

export const getReservedSchedule = async ({
  activityId,
  date,
}: {
  activityId: number;
  date: string;
}): Promise<ReservedScheduleItem[]> => {
  const res = await clientFetch.get(
    `/my-activities/${activityId}/reserved-schedule`,
    {
      params: { date },
    },
  );

  return res.data;
};

export const getReservations = async ({
  activityId,
  scheduleId,
  status,
  cursorId,
  size = 10,
}: {
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  cursorId?: number | null;
  size?: number;
}): Promise<ReservationCardPage> => {
  const res = await clientFetch.get(
    `/my-activities/${activityId}/reservations`,
    {
      params: {
        scheduleId,
        status,
        cursorId,
        size,
      },
    },
  );

  return res.data;
};

export const updateReservationStatus = async ({
  activityId,
  reservationId,
  status,
}: {
  activityId: number;
  reservationId: number;
  status: ReservationStatus;
}): Promise<ReservationCardItem> => {
  const res = await clientFetch.patch(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    { status },
  );

  return res.data;
};
