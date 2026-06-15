import { queryOptions } from "@tanstack/react-query";
import { getNotifications } from "@/features/notification/api/api";

export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
};

export const notificationsQueryOptions = () =>
  queryOptions({
    queryKey: notificationKeys.list(),
    queryFn: getNotifications,
  });
