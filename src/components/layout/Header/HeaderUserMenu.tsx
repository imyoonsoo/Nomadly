"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "./type";
import Dropdown from "@/components/Dropdown/Dropdown";

import BellIcon from "@/assets/icons/bell.svg";
import DefaultProfileImage from "@/assets/images/default-profile.svg";
import { useState } from "react";
import NotificationModal from "@/features/notification/NotificationModal";
import {
  useDeleteNotification,
  useNotifications,
} from "@/features/notification/hook/useNotifications";

const HeaderUserMenu = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { data } = useNotifications();
  const deleteNotificationMutation = useDeleteNotification();

  const notifications = data?.notifications ?? [];
  const totalCount = data?.totalCount ?? 0;
  const hasNotification = notifications.length > 0;

  const profileMenus = [
    {
      label: "마이페이지",
      onSelect: () => {
        router.push("/mypage");
      },
    },
    {
      label: "로그아웃",
      onSelect: () => {
        // Todo: 로그아웃 로직 구현
        alert("로그아웃!");
      },
    },
  ];

  const handleNotificationClick = (notificationId: number) => {
    deleteNotificationMutation.mutate(notificationId, {
      onSuccess: () => {
        setIsNotificationOpen(false);
        router.push("/mypage/reservations");
      },
    });
  };

  return (
    <div className="flex justify-center items-center gap-5">
      {/* Todo: 알림 기능 구현 */}
      <div className="relative">
        <button
          type="button"
          aria-label="알림"
          onClick={() => setIsNotificationOpen((prev) => !prev)}
          className={`p-2 rounded-lg text-gray-600 hover:bg-gray-25 hover:text-primary-500 active:opacity-70 transition ${
            isNotificationOpen ? "text-primary-500" : "text-gray-600"
          }`}
        >
          <BellIcon width={24} height={24} />

          {hasNotification && (
            <span
              className="
                absolute
                right-1
                top-1
                h-2.5
                w-2.5
                rounded-full
                bg-red-500
                border-2
                border-white
              "
            />
          )}
        </button>

        {isNotificationOpen && (
          <NotificationModal
            notifications={notifications}
            totalCount={totalCount}
            onClose={() => setIsNotificationOpen(false)}
            onNotificationClick={handleNotificationClick}
          />
        )}
      </div>
      <div className="w-px h-3.5 bg-gray-100" />
      <Dropdown options={profileMenus}>
        {({ toggle }) => (
          <button
            onClick={toggle}
            className="flex justify-center items-center gap-2.5 p-2 rounded-lg hover:bg-gray-25 active:opacity-70 transition"
          >
            {/* Todo: api 연결 작업 후 수정 */}
            {user.profileImageUrl ? (
              <Image
                src={user.profileImageUrl}
                alt="프로필 이미지"
                width={30}
                height={30}
                className="w-7.5 h-7.5 rounded-full object-cover"
              />
            ) : (
              <DefaultProfileImage width={30} height={30} />
            )}
            <span className="text-14-medium text-gray-950">
              {user.nickname}
            </span>
          </button>
        )}
      </Dropdown>
    </div>
  );
};

export default HeaderUserMenu;
