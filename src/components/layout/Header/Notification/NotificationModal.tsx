"use client";

import { Notification } from "@/components/layout/Header/Notification/type";
import {
  getTimeAgo,
  parseNotificationContent,
} from "@/components/layout/Header/Notification/utils";
import { Delete } from "@/constants/icons";

interface NotificationModalProps {
  notifications: Notification[];
  totalCount: number;
  onClose: () => void;
  onNotificationClick: (notificationId: number) => void;
}

const getNotificationTitle = (content: string) => {
  if (content.includes("승인")) return "예약 승인";
  if (content.includes("거절")) return "예약 거절";
  return "알림";
};

const NotificationModal = ({
  notifications,
  totalCount,
  onClose,
  onNotificationClick,
}: NotificationModalProps) => {
  return (
    <div
      className="
        absolute right-0 top-12 z-50
        w-[330px] overflow-hidden rounded-xl bg-white
        shadow-[0_4px_20px_rgba(0,0,0,0.15)]

        max-md:fixed
        max-md:left-4
        max-md:right-4
        max-md:top-[49px]
        max-md:w-auto
        max-md:z-[130]
      "
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-16-bold text-gray-950">알림 {totalCount}개</h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="rounded-md p-1 text-gray-950 hover:bg-gray-25"
        >
          <Delete className="w-6 h-6" />
        </button>
      </div>

      <div className="max-h-[250px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="px-5 py-8 text-center text-14-medium text-gray-700">
            알림이 없어요.
          </p>
        ) : (
          notifications.map((notification) => {
            const parsed = parseNotificationContent(notification.content);
            const isApproved = parsed.status === "승인";

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => onNotificationClick(notification.id)}
                className="
                  block w-full border-b border-gray-50 px-5 py-4 text-left
                  transition hover:bg-primary-100
                "
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-14-bold text-gray-950">{parsed.title}</p>

                  <span className="shrink-0 text-12-medium text-gray-400">
                    {getTimeAgo(notification.createdAt)}
                  </span>
                </div>

                <p className="text-14-medium text-gray-800 break-keep">
                  {parsed.activityTitle}
                  {parsed.dateText && (
                    <>
                      <br />
                      {parsed.dateText}
                    </>
                  )}
                </p>

                {parsed.status && (
                  <p className="mt-1 text-13-medium text-gray-700">
                    예약이{" "}
                    <span
                      className={
                        isApproved ? "text-primary-500" : "text-red-500"
                      }
                    >
                      {parsed.status}
                    </span>
                    되었어요.
                  </p>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
