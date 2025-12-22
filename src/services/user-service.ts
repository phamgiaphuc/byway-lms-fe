import { generateSearchParams } from "@/lib/helpers";
import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Request } from "@/types/request";
import type { User, UserCourse, UserLesson } from "@/types/user";

export const getMe = async () => {
  return api.get("users/me").json<ApiResponse<User>>();
};

export const enrollCourse = async (courseId: string) => {
  return api.post(`users/courses/${courseId}/enroll`).json<ApiResponse<{}>>();
};

export const getMyCourses = async () => {
  const { data } = await api
    .get("users/me/courses")
    .json<ApiResponse<(UserCourse & { lessonId: string })[]>>();
  return data;
};

export const getMyLessons = async (courseId: string) => {
  const searchParams = generateSearchParams({
    courseId,
  });
  const { data } = await api
    .get("users/me/lessons", {
      searchParams,
    })
    .json<ApiResponse<UserLesson[]>>();
  return data;
};

export const completeLesson = async (lessonId: string, courseId: string) => {
  return api
    .post("users/lessons/complete", {
      json: {
        lessonId,
        courseId,
      },
    })
    .json<ApiResponse<{}>>();
};

export const getMyRequests = async () => {
  const { data } = await api.get("users/me/requests").json<ApiResponse<Request[]>>();
  return data;
};
