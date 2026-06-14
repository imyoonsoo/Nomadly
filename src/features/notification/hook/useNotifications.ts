import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "@/features/notification/api/api";
import {
  notificationKeys,
  notificationsQueryOptions,
} from "@/features/notification/queries/query";

export const useNotifications = () => {
  return useQuery(notificationsQueryOptions());
};

export const useDeleteNotification = () => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });
};
