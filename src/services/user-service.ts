import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { User, UserCourse } from "@/types/user";

export const getMe = async () => {
  return api.get("users/me").json<ApiResponse<User>>();
};

export const enrollCourse = async (courseId: string) => {
  return api.post(`users/courses/${courseId}/enroll`).json<ApiResponse<{}>>();
};

export const getMyCourses = async () => {
  const { data } = await api.get("users/me/courses").json<ApiResponse<UserCourse[]>>();
  return data;
};
