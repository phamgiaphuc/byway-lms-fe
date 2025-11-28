import z from "zod";

export interface SignUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const initialSignUp: SignUp = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  terms: false,
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
    terms: z.boolean().refine((data) => data === true, {
      message: "Terms is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }) satisfies z.ZodType<SignUp>;

export type SignUpSchema = z.infer<typeof signUpSchema>;
