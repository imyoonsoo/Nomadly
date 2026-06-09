import axios from "axios";
import { CreateActivityRequest, CreateActivityResponse } from "./types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUyOCwidGVhbUlkIjoiMjMtMSIsImlhdCI6MTc4MDk5NDAzMCwiZXhwIjoxNzgwOTk1ODMwLCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.O2tUosWk-P3Jyn7Rj92ytjAuKaS5HgWcHjYCE0u_A9g";

// 체험 등록
export const createActivity = async (
  body: CreateActivityRequest,
): Promise<CreateActivityResponse> => {
  console.log("요청 body:", body);

  const response = await axios.post(`${BASE_URL}/activities`, body, {
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

  const response = await axios.post(`${BASE_URL}/activities/image`, imageData, {
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });

  return response.data;
};
