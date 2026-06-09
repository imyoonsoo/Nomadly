import axios from "axios";
import {
  GetMyActivitiesParams,
  GetMyActivitiesResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
} from "./type";

// Todo: 로그인 후 수정
const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-activities`;
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUyOCwidGVhbUlkIjoiMjMtMSIsImlhdCI6MTc4MTAwODY4NywiZXhwIjoxNzgxMDEwNDg3LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.XeEs66Ne_Fj5PlN2PiOKOsxvqWBGkSgtXUSC_P1JdCA";

// 내 체험 조회
export const getMyActivities = async (
  params?: GetMyActivitiesParams,
): Promise<GetMyActivitiesResponse> => {
  const response = await axios.get(`${BASE_URL}`, {
    params,
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });
  return response.data;
};

// 체험 수정
export const updateMyActivity = async (
  activityId: number,
  body: UpdateActivityRequest,
): Promise<UpdateActivityResponse> => {
  const response = await axios.patch(`${BASE_URL}/${activityId}`, body, {
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });

  return response.data;
};

// 내 체험 삭제
export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${activityId}`, {
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });
};
