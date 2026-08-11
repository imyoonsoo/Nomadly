"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "./type";
import Dropdown from "@/components/Dropdown/Dropdown";

import BellIcon from "@/assets/icons/bell.svg";
import DefaultProfileImage from "@/assets/images/default-profile.svg";

import NotificationModal from "@/features/notification/NotificationModal";
import {
  useDeleteNotification,
  useNotifications,
} from "@/features/notification/hook/useNotifications";
import logoutAction from "@/features/login/actions/logoutAction";
import { showToast } from "@/lib/utils/toast";
import { useQueryClient } from "@tanstack/react-query";

interface HeaderUserMenuProps {
  user: User;
  isScrolled: boolean;
}

const HeaderUserMenu = ({ user, isScrolled }: HeaderUserMenuProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
      onSelect: async () => {
        try {
          await logoutAction();
          showToast.success("로그아웃되었습니다.");
          queryClient.clear();
          router.replace("/");
        } catch {
          showToast.error(
            "로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.",
          );
        }
      },
    },
  ];

  const handleNotificationClick = (notificationId: number) => {
    if (deleteNotificationMutation.isPending) {
      return;
    }

    deleteNotificationMutation.mutate(notificationId, {
      onSuccess: () => {
        setIsNotificationOpen(false);
        router.push("/mypage/reservations");
      },
    });
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="relative">
        <button
          type="button"
          aria-label="알림"
          onClick={() => setIsNotificationOpen((prev) => !prev)}
          className={`hover:text-primary-500 rounded-lg p-2 text-gray-600 transition duration-200 hover:-rotate-12 active:opacity-70 ${
            isNotificationOpen ? "text-primary-500" : "text-gray-600"
          }`}
        >
          <BellIcon className="h-5 w-5 md:h-6 md:w-6" />

          {hasNotification && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
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
      <div
        className={`h-4 w-px rounded-full ${isScrolled ? "bg-gray-100" : "bg-gray-400"}`}
      />
      <Dropdown options={profileMenus}>
        {({ toggle }) => (
          <button
            onClick={toggle}
            className={`flex items-center justify-center gap-2.5 rounded-lg p-2 transition active:opacity-70 ${
              isScrolled ? "hover:bg-gray-50" : "hover:bg-white/10"
            }`}
          >
            {user.profileImageUrl ? (
              <Image
                src={user.profileImageUrl}
                alt="프로필 이미지"
                width={30}
                height={30}
                className="h-7.5 w-7.5 rounded-full object-cover"
              />
            ) : (
              <DefaultProfileImage width={30} height={30} />
            )}
            <span className="text-14-medium hidden text-gray-950 md:block">
              {user.nickname}
            </span>
          </button>
        )}
      </Dropdown>
    </div>
  );
};

export default HeaderUserMenu;
