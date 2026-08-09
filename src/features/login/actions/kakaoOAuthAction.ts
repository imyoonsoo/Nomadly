"use server";

import { cookies } from "next/headers";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

if (!BASE_URL) {
  console.error("[Auth] NEXT_PUBLIC_API_BASE_URL 이 설정되지 않았습니다.");
}

export const kakaoSignInAction = async (
  token: string,
  redirectUri: string = REDIRECT_URI ?? "",
): Promise<{ success: boolean; isNewUser: boolean }> => {
  try {
    const response = await axios.post(`${BASE_URL}/oauth/sign-in/kakao`, {
      redirectUri,
      token,
    });
    await setTokenCookies(response.data);
    return { success: true, isNewUser: false };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      console.log("403 응답 데이터:", error.response.data);
      return { success: false, isNewUser: true };
    }
    console.error(
      "kakaoSignInAction 실패:",
      axios.isAxiosError(error) ? error.response?.data : error,
    );
    return { success: false, isNewUser: false };
  }
};

export const kakaoSignUpAction = async (
  token: string,
  nickname: string,
  redirectUri: string = REDIRECT_URI ?? "",
): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post(`${BASE_URL}/oauth/sign-up/kakao`, {
      nickname,
      redirectUri,
      token,
    });
    await setTokenCookies(response.data);
    return { success: true };
  } catch (error) {
    console.error(
      "카카오 회원가입 실패:",
      axios.isAxiosError(error) ? error.response?.data : error,
    );
    return { success: false };
  }
};

const setTokenCookies = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  cookieStore.set("accessToken", accessToken, options);
  cookieStore.set("refreshToken", refreshToken, options);
};
