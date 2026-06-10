import axios from "axios";
import {
  GetMyActivitiesParams,
  GetMyActivitiesResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
} from "./type";

// Todo: 로그인 후 수정
const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-activities`;
const TEST_TOKEN = "테스트토큰값";
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
