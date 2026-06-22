"use server";

import serverFetchAuth from "@/lib/http/serverFetchAuth";
import { MyProfileRequestBody, MyProfileResponse } from "../type";

const updateProfileAction = async (
  body: MyProfileRequestBody,
): Promise<MyProfileResponse> => {
  return serverFetchAuth<MyProfileResponse>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

export default updateProfileAction;
