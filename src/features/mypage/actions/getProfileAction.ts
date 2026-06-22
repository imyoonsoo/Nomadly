"use server";

import serverFetchAuth from "@/lib/http/serverFetchAuth";
import { MyProfileResponse } from "../type";

const getProfileAction = async (): Promise<MyProfileResponse> => {
  return serverFetchAuth<MyProfileResponse>("/users/me");
};

export default getProfileAction;
