import clientFetch from "@/lib/http/clientFetch";
import { Notification } from "@/features/notification/type";

export interface NotificationsResponse {
  cursorId: number | null;
  notifications: Notification[];
  totalCount: number;
}

export const getNotifications = async (): Promise<NotificationsResponse> => {
  const res = await clientFetch.get("my-notifications");

  return res.data;
};

export const deleteNotification = async (
  notificationId: number,
): Promise<void> => {
  await clientFetch.delete(`my-notifications/${notificationId}`);
};
