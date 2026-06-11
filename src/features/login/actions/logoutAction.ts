"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/");
};

export default logoutAction;
