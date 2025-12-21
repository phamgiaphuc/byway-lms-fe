import { generateSearchParams } from "@/lib/helpers";
import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Course, CourseFilter, CreateCourseSchema } from "@/types/course";

export const getCourses = async (course: CourseFilter) => {
  const searchParams = generateSearchParams(course);
  const { data } = await api
    .get("courses", {
      searchParams: searchParams,
    })
    .json<ApiResponse<Course[]>>();
  return data;
};

export const getCourseById = async (courseId: string) => {
  const { data } = await api.get(`courses/${courseId}`).json<ApiResponse<Course>>();
  return data;
};

export const createCourse = (category: CreateCourseSchema) => {
  return api
    .post("courses", {
      json: category,
    })
    .json<ApiResponse<Course>>();
};
