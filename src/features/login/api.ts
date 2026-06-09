import axios from "axios";
import type { LoginParams, LoginResponse } from "./type";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;

export const login = async (body: LoginParams): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, body);
  return response.data;
};
