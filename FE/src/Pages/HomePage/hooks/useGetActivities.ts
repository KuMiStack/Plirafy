import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../api/apiHomePage";

export const useGetActivities = (enabled = true) => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
    enabled,
  });
};
