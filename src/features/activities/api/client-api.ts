import { clientFetch } from "@/lib/http/client-fetch";
import type {
  CreateActivityReservationParams,
  CreateActivityReservationRequest,
  CreateActivityReservationResponse,
} from "@/app/(main)/activities/type";

export const createActivityReservation = async ({
  activityId,
  scheduleId,
  headCount,
}: CreateActivityReservationParams): Promise<CreateActivityReservationResponse> => {
  const body: CreateActivityReservationRequest = {
    scheduleId,
    headCount,
  };

  console.log("예약 요청:", { activityId, ...body });

  try {
    const { data } = await clientFetch.post<CreateActivityReservationResponse>(
      `/activities/${activityId}/reservations`,
      body,
    );

    console.log("예약 응답:", data);

    return data;
  } catch (error) {
    console.error("예약 실패:", error);
    throw error;
  }
};
