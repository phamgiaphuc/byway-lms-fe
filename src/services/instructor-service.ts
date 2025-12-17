import { api } from "@/lib/ky";
import { generateSearchParams } from "@/services/category-service";
import type { ApiResponse } from "@/types/api-response";
import type { Chapter, CreateChapterSchema, UpdateChapterSchema } from "@/types/chapter";
import type { Course } from "@/types/course";
import type { CreateLessonSchema, Lesson } from "@/types/lesson";

export const getCourses = async () => {
  const { data } = await api.get("instructor/courses").json<ApiResponse<Course[]>>();
  return data;
};

export const getCourseById = async (id: string) => {
  const { data } = await api.get(`instructor/courses/${id}`).json<ApiResponse<Course>>();
  return data;
};

export const createChapter = async (chapter: CreateChapterSchema) => {
  return api
    .post("instructor/chapters", {
      json: chapter,
    })
    .json<ApiResponse<Chapter>>();
};

export const getChapters = async (courseId: string) => {
  const searchParams = generateSearchParams({
    courseId,
  });

  const { data } = await api
    .get("instructor/chapters", {
      searchParams,
    })
    .json<ApiResponse<Chapter[]>>();
  return data;
};

export const getChapterById = async (chapterId: string) => {
  const { data } = await api.get(`instructor/chapters/${chapterId}`).json<ApiResponse<Chapter>>();
  return data;
};

export const updateChapterById = async (chapter: UpdateChapterSchema) => {
  return await api
    .put(`instructor/chapters/${chapter.id}`, {
      json: {
        title: chapter.title,
        isPublished: chapter.isPublished,
      },
    })
    .json<ApiResponse<Chapter>>();
};

export const createLesson = async (lesson: CreateLessonSchema) => {
  return api
    .post("instructor/lessons", {
      json: lesson,
    })
    .json<ApiResponse<Lesson>>();
};
