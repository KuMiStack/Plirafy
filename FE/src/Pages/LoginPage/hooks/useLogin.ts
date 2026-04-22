import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../api/apiLogin";

export const useLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};