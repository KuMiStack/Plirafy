import { useQuery } from "@tanstack/react-query";
import { getUserActivities } from "../api/apiHomePage";
import { userActivitiesQueryKey } from "./queryKeys";

export const useGetUserActivities = (userId?: number) => {
  return useQuery({
    queryKey: userActivitiesQueryKey(userId),
    queryFn: () => getUserActivities(userId!),
    enabled: typeof userId === "number",
  });
};
