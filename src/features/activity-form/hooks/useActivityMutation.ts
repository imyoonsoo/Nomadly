"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity, updateActivity } from "../api";
import { UpdateActivityRequest } from "../types";

export const useCreateActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useUpdateActivityMutation = (activityId: number) => {
  return useMutation({
    mutationFn: (body: UpdateActivityRequest) =>
      updateActivity(activityId, body),
  });
};
