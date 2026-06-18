import { useQuery } from "@tanstack/react-query";
import getProfileAction from "../actions/getProfileAction";

const useGetProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getProfileAction,
  });
};

export default useGetProfile;
