import { useMutation } from "@tanstack/react-query";
import uploadProfileImageAction from "../actions/uploadProfileImageAction";

const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: uploadProfileImageAction,
  });
};

export default useUploadProfileImage;
