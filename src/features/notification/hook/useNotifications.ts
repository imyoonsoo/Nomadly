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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });
  });
};
