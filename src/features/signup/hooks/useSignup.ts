import { useMutation } from "@tanstack/react-query";
import postSignup from "../api";

const useSignup = () => {
  return useMutation({
    mutationFn: postSignup,
  });
};

export default useSignup;
