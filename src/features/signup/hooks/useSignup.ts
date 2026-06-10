import { useMutation } from "@tanstack/react-query";
import { postSignup } from "../api";

export const useSignup = () => {
  return useMutation({
    mutationFn: postSignup,
  });
};
