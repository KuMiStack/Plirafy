import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCurrentAmount } from "../api/apiFinanTracker";
import { financialActivitiesQueryKey } from "./queryKeys";

export function useAddToCurrentAmount(userId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCurrentAmount,
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
