import { useMutation } from "@tanstack/react-query";
import { assignActivityToUser } from "../api/apiHomePage";

export function useAssignActivityToUser() {
  return useMutation({
    mutationFn: assignActivityToUser,
  });
}
