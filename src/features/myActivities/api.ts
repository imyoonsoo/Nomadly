import axios from "axios";
import { GetMyActivitiesParams, GetMyActivitiesResponse } from "./type";

export const getMyActivities = async (
  params?: GetMyActivitiesParams,
): Promise<GetMyActivitiesResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-activities`,
    { params },
  );
  return response.data;
};
