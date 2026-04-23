import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFinancialActivity } from "../api/apiFinanTracker";
import { financialActivitiesQueryKey } from "./queryKeys";

export function useDeleteFinancialActivity(userId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFinancialActivity,
    onSuccess: () => {
      if (typeof userId !== "number") {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: financialActivitiesQueryKey(userId),
      });
    },
  });
}
