"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyActivity } from "../api";
import { showToast } from "@/lib/utils/toast";
import { getApiErrorMessage } from "@/lib/utils/getApiErrorMessage";

const useDeleteMyActivityMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-activities"],
      });

      onSuccessCallback?.();
    },
    onError: (error) => {
      showToast.error(getApiErrorMessage(error, "체험 삭제에 실패했습니다."));
    },
  });
};

export default useDeleteMyActivityMutation;
