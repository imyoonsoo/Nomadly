import axios from "axios";
import { GetMyActivitiesParams, GetMyActivitiesResponse } from "./type";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-activities`;
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUyOCwidGVhbUlkIjoiMjMtMSIsImlhdCI6MTc4MDk5OTc1MiwiZXhwIjoxNzgxMDAxNTUyLCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.d36zRJlQXKBQzaourNijvLID5Id0CcFUVeVHBOzDifk";

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

// 내 체험 삭제
export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${activityId}`, {
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });
};
