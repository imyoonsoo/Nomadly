"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity, updateMyActivity } from "../api";
import { UpdateActivityRequest } from "../types";
import { showToast } from "@/lib/utils/toast";
import { getApiErrorMessage } from "@/lib/utils/getApiErrorMessage";

export const useCreateActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (error) => {
      showToast.error(getApiErrorMessage(error, "체험 등록에 실패했습니다."));
    },
  });
};

export const useUpdateActivityMutation = (activityId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateActivityRequest) =>
      updateMyActivity(activityId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-activities"] });
    },
    onError: (error) => {
      showToast.error(getApiErrorMessage(error, "체험 수정에 실패했습니다."));
    },
  });
};
