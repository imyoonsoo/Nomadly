import { Notification } from "@/components/layout/Header/Notification/type";

export const mockNotifications: Notification[] = [
  {
    id: 1,
    userId: "userId",
    content:
      "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.",
    createdAt: new Date(Date.now() - 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: "",
  },
  {
    id: 2,
    userId: "userId",
    content:
      "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 거절되었어요.",
    createdAt: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: "",
  },
  {
    id: 3,
    userId: "userId",
    content:
      "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.",
    createdAt: new Date(Date.now() - 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: "",
  },
  {
    id: 4,
    userId: "userId",
    content:
      "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 거절되었어요.",
    createdAt: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: "",
  },
];
