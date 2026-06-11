import axios from "axios";
import { clientFetch } from "@/lib/http/client-fetch";
import { CreateActivityRequest, CreateActivityResponse } from "./types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities`;

// 체험 등록
export const createActivity = async (
  body: CreateActivityRequest,
): Promise<CreateActivityResponse> => {
  const response = await clientFetch.post(`${BASE_URL}`, body);

  return response.data;
};

// 체험 이미지 업로드
export const uploadActivityImage = async (
  image: File,
): Promise<{ activityImageUrl: string }> => {
  const imageData = new FormData();
  imageData.append("image", image);

  const response = await clientFetch.post(`${BASE_URL}/image`, imageData);

  return response.data;
};
