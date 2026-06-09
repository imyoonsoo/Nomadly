import { infiniteQueryOptions } from "@tanstack/react-query";
import { GetMyActivitiesParams } from "./type";
import { getMyActivities } from "./api";

export const myActivitiesQuery = (
  params?: Omit<GetMyActivitiesParams, "cursorId">,
) =>
  infiniteQueryOptions({
    queryKey: ["my-activities", "infinite", params],
    queryFn: ({ pageParam }) =>
      getMyActivities({ ...params, cursorId: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId ?? undefined;
    },
  });
