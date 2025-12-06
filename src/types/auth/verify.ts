import type { User } from "@/types/user";
import z from "zod";

export interface Verify {
  code: string;
  userId: string;
  verificationId: string;
}

export const initialVerify: Verify = {
  code: "",
  userId: "",
  verificationId: "",
};

export const verifySchema = z.object({
  code: z.string().min(6, {
    message: "Code is required",
  }),
  userId: z.string().min(1),
  verificationId: z.string().min(1),
}) satisfies z.ZodType<Verify>;

export type VerifySchema = z.infer<typeof verifySchema>;

export type SendVerificationResponse = {
  id: string;
  expiredAt: string;
};

export const verifySearchSchema = z.object({
  id: z.string(),
  expiredAt: z.number(),
});

export const thirdPartySearchSchema = z.object({
  token: z.string(),
});

export type VerifyResponse = {
  user: User;
  token: string;
};
