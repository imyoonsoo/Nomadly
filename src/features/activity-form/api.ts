import axios from "axios";
import {
  CreateActivityRequest,
  CreateActivityResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
} from "./types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities`;
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUyOCwidGVhbUlkIjoiMjMtMSIsImlhdCI6MTc4MTA4MDI3OSwiZXhwIjoxNzgxMDgyMDc5LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.1dIdpV_KAtcVoZUBuPZL98B-2_9H91bf_IkTVbOJudA";

// 체험 등록
export const createActivity = async (
  body: CreateActivityRequest,
): Promise<CreateActivityResponse> => {
  const response = await axios.post(`${BASE_URL}`, body, {
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });

  return response.data;
};

// 체험 이미지 업로드
export const uploadActivityImage = async (
  image: File,
): Promise<{ activityImageUrl: string }> => {
  const imageData = new FormData();
  imageData.append("image", image);

  const response = await axios.post(`${BASE_URL}/image`, imageData, {
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });

  return response.data;
};

// 체험 수정
export const updateActivity = async (
  activityId: number,
  body: UpdateActivityRequest,
): Promise<UpdateActivityResponse> => {
  const response = await axios.patch(
    `${BASE_URL}/my-activities/${activityId}`,
    body,
  );

  return response.data;
};
