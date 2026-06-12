"use client";

import clientFetch from "@/lib/http/clientFetch";
import { GetMyActivitiesParams, GetMyActivitiesResponse } from "./type";

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
