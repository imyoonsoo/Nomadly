import axios from "axios";
import { GetMyActivitiesParams, GetMyActivitiesResponse } from "./type";

const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUyOCwidGVhbUlkIjoiMjMtMSIsImlhdCI6MTc4MDk5MzU2NywiZXhwIjoxNzgwOTk1MzY3LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.pxKz9_QRCm_UZsPu9C1VUwlkHq4Yzo2TCnGUqtaeZJs";

export const getMyActivities = async (
  params?: GetMyActivitiesParams,
): Promise<GetMyActivitiesResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-activities`,
    {
      params,
      headers: {
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
    },
  );
  return response.data;
};
