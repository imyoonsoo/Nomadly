import { useMutation } from "@tanstack/react-query";
import { postSignup } from "./api";

export const useSignup = () => {
  useMutation({
    mutationFn: postSignup,
  });
};
