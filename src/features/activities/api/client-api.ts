import clientFetch from "@/lib/http/clientFetch";
import type {
  CreateActivityReservationParams,
  CreateActivityReservationRequest,
  CreateActivityReservationResponse,
  AvailableActivitiesReservationParams,
  AvailableActivitiesReservationResponse,
} from "@/features/activities/type";

export const createActivityReservation = async ({
  activityId,
  scheduleId,
  headCount,
}: CreateActivityReservationParams): Promise<CreateActivityReservationResponse> => {
  const body: CreateActivityReservationRequest = {
    scheduleId,
    headCount,
  };

  const { data } = await clientFetch.post<CreateActivityReservationResponse>(
    `/activities/${activityId}/reservations`,
    body,
  );

  return data;
};

export const getAvailableReservationSchedules = async ({
  activityId,
  year,
  month,
}: AvailableActivitiesReservationParams): Promise<AvailableActivitiesReservationResponse> => {
  const { data } =
    await clientFetch.get<AvailableActivitiesReservationResponse>(
      `/activities/${activityId}/available-schedule`,
      {
        params: { year, month },
      },
    );

  return data;
};
