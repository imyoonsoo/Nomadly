"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "../api";

export const useCreateActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};
