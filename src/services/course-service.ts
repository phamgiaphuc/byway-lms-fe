import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Course, CreateCourseSchema } from "@/types/course";

export const createCourse = (category: CreateCourseSchema) => {
  return api
    .post("courses", {
      json: category,
    })
    .json<ApiResponse<Course>>();
};
