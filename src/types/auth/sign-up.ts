import type { User } from "@/types/user";
import z from "zod";

export interface SignUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export const initialSignUp: SignUp = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

export const signUpSchema = z
  .object({
    email: z.email("Email is required"),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }) satisfies z.ZodType<SignUp>;

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type SignUpResponse = {
  user: User;
  verification: {
    id: string;
    expiredAt: string;
  };
};
