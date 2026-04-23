import { useMutation } from "@tanstack/react-query";
import { postActivities } from "../api/apiHomePage";

export const usePostActivities = () => {
  return useMutation({
    mutationFn: postActivities,
  });
};
