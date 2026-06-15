"use server";

import { cookies } from "next/headers";
import login from "../api";
import type { LoginParams } from "../type";
import axios from "axios";

type LoginActionResult =
  | { success: true; userId: number }
  | { success: false; error?: string };

export const loginAction = async (
  body: LoginParams,
): Promise<LoginActionResult> => {
  try {
    const { accessToken, refreshToken, user } = await login(body);

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true, userId: user.id };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message ?? "로그인에 실패했습니다.",
      };
    }
    return { success: false, error: "알 수 없는 에러가 발생했습니다." };
  }
};
