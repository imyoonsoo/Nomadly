import {
  GetMyActivitiesParams,
  GetMyActivitiesResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
} from "./type";
import { clientFetch } from "@/lib/http/client-fetch";

// 내 체험 조회
export const getMyActivities = async (
  params?: GetMyActivitiesParams,
): Promise<GetMyActivitiesResponse> => {
  const { data } = await clientFetch.get<GetMyActivitiesResponse>(
    "/my-activities",
    {
      params,
    },
  );

  return data;
};

// 내 체험 삭제
export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await clientFetch.delete(`/my-activities/${activityId}`);
};

// // 체험 수정
// export const updateMyActivity = async (
//   activityId: number,
//   body: UpdateActivityRequest,
// ): Promise<UpdateActivityResponse> => {
//   const response = await axios.patch(`/my-activities/${activityId}`, body);

//   return response.data;
// };
