import type { User } from "@/types/user";
import { z } from "zod";

export interface SignIn {
  email: string;
  password: string;
}

export const initialSignIn: SignIn = {
  email: "",
  password: "",
};

export const signInSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, {
    message: "Password is required",
  }),
}) satisfies z.ZodType<SignIn>;

export type SignInSchema = z.infer<typeof signInSchema>;

export type SignInResponse = {
  user: User;
  token?: string;
};

export const signInSearchSchema = z.object({
  redirectUrl: z.string().optional(),
});
