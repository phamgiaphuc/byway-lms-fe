import { ls } from "@/lib/helpers";
import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { SignIn, SignInResponse } from "@/types/auth/sign-in";
import type { SignUp, SignUpResponse } from "@/types/auth/sign-up";
import type { SendVerificationResponse, Verify, VerifyResponse } from "@/types/auth/verify";

export const signUp = async (values: SignUp) => {
  return api
    .post("auth/sign-up", {
      json: {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
      },
    })
    .json<ApiResponse<SignUpResponse>>();
};

export const signIn = async (values: SignIn) => {
  return api
    .post("auth/sign-in", {
      json: values,
    })
    .json<ApiResponse<SignInResponse>>();
};

export const sendVerification = async (userId: string) => {
  return api
    .post("auth/send-verification", {
      json: {
        userId,
      },
    })
    .json<ApiResponse<SendVerificationResponse>>();
};

export const verify = async (values: Verify) => {
  return api
    .post("auth/verify", {
      json: values,
    })
    .json<ApiResponse<VerifyResponse>>();
};

export const signOut = () => {
  ls.clear();
};
