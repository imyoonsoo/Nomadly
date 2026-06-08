import { queryOptions } from "@tanstack/react-query";
import { GetMyActivitiesParams } from "./type";
import { getMyActivities } from "./api";

export const myActivitiesQuery = (params?: GetMyActivitiesParams) =>
  queryOptions({
    queryKey: ["my-activities", params],
    queryFn: () => getMyActivities(params),
  });
