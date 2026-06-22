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
import { useClearUserSession } from "@/hooks/useUserSession";
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
  const clearUserSession = useClearUserSession();

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
        await logoutAction();

        clearUserSession();
        queryClient.clear();
        router.replace("/");
        showToast.success("로그아웃되었습니다.");
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
    <div className="flex justify-center items-center gap-5">
      <div className="relative">
        <button
          type="button"
          aria-label="알림"
          onClick={() => setIsNotificationOpen((prev) => !prev)}
          className={`p-2 rounded-lg text-gray-600  duration-200 hover:-rotate-12 hover:text-primary-500 active:opacity-70 transition ${
            isNotificationOpen ? "text-primary-500" : "text-gray-600"
          }`}
        >
          <BellIcon className="w-5 h-5 md:w-6 md:h-6" />

          {hasNotification && (
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
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
        className={`w-px h-4 rounded-full ${isScrolled ? "bg-gray-100" : "bg-gray-400"}`}
      />
      <Dropdown options={profileMenus}>
        {({ toggle }) => (
          <button
            onClick={toggle}
            className={`flex justify-center items-center gap-2.5 p-2 rounded-lg active:opacity-70 transition ${
              isScrolled ? "hover:bg-gray-50" : "hover:bg-white/10"
            }`}
          >
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
            <span className="text-14-medium text-gray-950 hidden md:block">
              {user.nickname}
            </span>
          </button>
        )}
      </Dropdown>
    </div>
  );
};

export default HeaderUserMenu;
