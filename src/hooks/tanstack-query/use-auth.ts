import { sendVerification, signIn, signUp, verify } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useSendVerification = () => {
  return useMutation({
    mutationFn: sendVerification,
  });
};

export const useVerify = () => {
  return useMutation({
    mutationFn: verify,
  });
};
