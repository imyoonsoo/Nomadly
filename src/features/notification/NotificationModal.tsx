"use client";

import { Notification } from "@/features/notification/type";
import {
  getTimeAgo,
  parseNotificationContent,
} from "@/features/notification/utils";
import { Delete } from "@/constants/icons";

interface NotificationModalProps {
  notifications: Notification[];
  totalCount: number;
  onClose: () => void;
  onNotificationClick: (notificationId: number) => void;
}

const NotificationModal = ({
  notifications,
  totalCount,
  onClose,
  onNotificationClick,
}: NotificationModalProps) => {
  return (
    <div className="absolute top-12 right-0 z-50 w-82.5 overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] max-md:fixed max-md:top-12.25 max-md:right-4 max-md:left-4 max-md:z-[130] max-md:w-auto">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-16-bold text-gray-950">알림 {totalCount}개</h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="hover:bg-gray-25 rounded-md p-1 text-gray-950"
        >
          <Delete className="h-6 w-6" />
        </button>
      </div>

      <div className="max-h-62.5 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-14-medium px-5 py-8 text-center text-gray-700">
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
                className="hover:bg-primary-100 block w-full border-b border-gray-50 px-5 py-4 text-left transition"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-14-bold text-gray-950">{parsed.title}</p>

                  <span className="text-12-medium shrink-0 text-gray-400">
                    {getTimeAgo(notification.createdAt)}
                  </span>
                </div>

                <p className="text-14-medium break-keep text-gray-800">
                  {parsed.activityTitle}
                  {parsed.dateText && (
                    <>
                      <br />
                      {parsed.dateText}
                    </>
                  )}
                </p>

                {parsed.status && (
                  <p className="text-13-medium mt-1 text-gray-700">
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
