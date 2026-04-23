import { useMutation } from "@tanstack/react-query";
import { deleteUserActivity } from "../api/apiHomePage";

export function useDeleteUserActivity() {
  return useMutation({
    mutationFn: deleteUserActivity,
  });
}
