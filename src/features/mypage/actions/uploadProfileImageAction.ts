"use server";

/*
 * FormData는 Content-Type 직접 지정 시 fetch가 boundary를 안 붙여 업로드 실패 문제로
 * application/json 강제하는 serverFetchAuth 대신
 * fetch 직접 호출하여 multipart/form-data boundary 자동 설정
 */
import { cookies } from "next/headers";
import { MyProfileImageResponse } from "../type";

const uploadProfileImageAction = async (
  file: File,
): Promise<MyProfileImageResponse> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/image`,
    {
      method: "POST",
      body: formData,
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json() as Promise<MyProfileImageResponse>;
};

export default uploadProfileImageAction;
