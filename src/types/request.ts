import type { User } from "@/types/user";
import z from "zod";

export type RequestStatus = "pending" | "approved" | "rejected";
export type RequestType = "teaching" | "category" | "support";

export type Request = {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: RequestType;
  status: RequestStatus;
  response?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export const roleRequestSchema = z.object({
  requestId: z.string(),
  userId: z.string(),
  role: z.enum(["user", "instructor", "admin"]),
  response: z.string().min(1, "Response is required"),
  status: z.string(),
});
export type RoleRequestSchema = z.infer<typeof roleRequestSchema>;

export const initialRoleRequest: RoleRequestSchema = {
  requestId: "",
  userId: "",
  role: "user",
  response: "",
  status: "",
};
