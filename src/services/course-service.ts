import { generateSearchParams } from "@/lib/helpers";
import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Course, CourseFilter, CreateCourseSchema, UpdateCourseSchema } from "@/types/course";

export const getCourses = async (course: CourseFilter) => {
  const searchParams = generateSearchParams(course);
  const { data } = await api
    .get("courses", {
      searchParams: searchParams,
    })
    .json<ApiResponse<Course[]>>();
  return data;
};

export const updateCourseById = async (course: UpdateCourseSchema) => {
  return api
    .put(`courses/${course.id}`, {
      json: course,
    })
    .json<ApiResponse<Course>>();
};

export const getCourseById = async (courseId: string, detail: boolean) => {
  const searchParams = generateSearchParams({
    detail,
  });
  const { data } = await api
    .get(`courses/${courseId}`, { searchParams })
    .json<ApiResponse<Course>>();
  return data;
};

export const createCourse = (course: CreateCourseSchema) => {
  return api
    .post("courses", {
      json: course,
    })
    .json<ApiResponse<Course>>();
};
