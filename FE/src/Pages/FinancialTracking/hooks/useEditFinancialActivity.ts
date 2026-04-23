import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editFinancialActivity } from "../api/apiFinanTracker";
import { financialActivitiesQueryKey } from "./queryKeys";

export function useEditFinancialActivity(userId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editFinancialActivity,
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
