import { generateSearchParams } from "@/lib/helpers";
import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Chapter } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

export const getLessonById = async (lessonId: string) => {
  const { data } = await api.get(`lessons/${lessonId}`).json<ApiResponse<Lesson>>();
  return data;
};

export const getLessons = async (courseId: string) => {
  const searchParams = generateSearchParams({ courseId });
  const { data } = await api
    .get("lessons", {
      searchParams,
    })
    .json<ApiResponse<Chapter[]>>();
  return data;
};
