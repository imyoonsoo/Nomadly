"use server";

import { cookies } from "next/headers";
import { login } from "./api";
import type { LoginParams } from "./type";
import axios from "axios";

export const loginAction = async (body: LoginParams) => {
  try {
    const { accessToken, refreshToken } = await login(body);

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ?? "로그인에 실패했습니다.",
      );
    }
    throw error;
  }
};
