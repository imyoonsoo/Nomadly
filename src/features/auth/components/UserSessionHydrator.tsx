"use client";

import { useUserSession } from "@/hooks/useUserSession";

const UserSessionHydrator = ({ children }: { children: React.ReactNode }) => {
  useUserSession();

  return children;
};

export default UserSessionHydrator;
