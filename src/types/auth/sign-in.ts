import { z } from "zod";

export interface SignIn {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const initialSignIn: SignIn = {
  email: "",
  password: "",
  rememberMe: false,
};

export const signInSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean(),
}) satisfies z.ZodType<SignIn>;

export type SignInSchema = z.infer<typeof signInSchema>;
