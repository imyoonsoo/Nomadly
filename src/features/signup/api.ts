import axios from "axios";

import { SignupRequestBody, SignupResponse } from "./type";

export const postSignup = async (body: SignupRequestBody) => {
  const response = await axios.post<SignupResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    body,
  );
  return response.data;
};
