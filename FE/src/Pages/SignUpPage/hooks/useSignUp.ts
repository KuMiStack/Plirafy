import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "../api/apiSignUp";

export const useSignUp = () => {
    return useMutation({
        mutationFn: postSignUp,
    });
};