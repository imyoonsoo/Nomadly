import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfileAction from "../actions/updateProfileAction";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] }); // 변경사항 저장 후 내 정보 캐시를 무효화해서 최신 데이터로 다시 받아오도록
    },
  });
};

export default useUpdateProfile;
