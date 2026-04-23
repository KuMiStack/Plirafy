import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFinancialActivity } from "../api/apiFinanTracker";
import { financialActivitiesQueryKey } from "./queryKeys";

export function useCreateFinancialActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFinancialActivity,
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({
        queryKey: financialActivitiesQueryKey(payload.userId),
      });
    },
  });
}
