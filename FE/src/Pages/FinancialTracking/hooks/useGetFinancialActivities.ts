import { useQuery } from "@tanstack/react-query";
import { getFinancialActivities } from "../api/apiFinanTracker";
import { financialActivitiesQueryKey } from "./queryKeys";

export const useGetFinancialActivities = (userId?: number) => {
  return useQuery({
    queryKey: financialActivitiesQueryKey(userId),
    queryFn: () => getFinancialActivities(userId!),
    enabled: typeof userId === "number",
  });
};
