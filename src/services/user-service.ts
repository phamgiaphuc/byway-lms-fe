import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { User } from "@/types/user";



export const getMe = async () => {
  return api.get("users/me").json<ApiResponse<User>>();
};
{/* 
type UpdateMePayload = {
  name: string;
  email: string;
};
export const updateMe = async (payload: UpdateMePayload) => {
  return api
    .patch("users/me", { json: payload })
    .json<ApiResponse<User>>();
};*/}