"use client";

import { clientFetch } from "@/lib/http/client-fetch";
import {
  ActivityFormValues,
  CreateActivityResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
} from "./types";

// 체험 등록
export const createActivity = async (
  body: ActivityFormValues,
): Promise<CreateActivityResponse> => {
  const response = await clientFetch.post<CreateActivityResponse>(
    "/activities",
    body,
  );

  return response.data;
};

// 체험 이미지 업로드
export const uploadActivityImage = async (
  image: File,
): Promise<{ activityImageUrl: string }> => {
  const imageData = new FormData();
  imageData.append("image", image);

  const response = await clientFetch.post("/activities/image", imageData);

  return response.data;
};

// 내 체험 수정
export const updateMyActivity = async (
  activityId: number,
  body: UpdateActivityRequest,
): Promise<UpdateActivityResponse> => {
  const { data } = await clientFetch.patch(
    `/my-activities/${activityId}`,
    body,
  );

  return data;
};
