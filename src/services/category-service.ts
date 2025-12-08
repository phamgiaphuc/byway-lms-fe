import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Category, CreateCategorySchema } from "@/types/category";

export const getCategories = () => {
  return api.get("categories").json<ApiResponse<Category[]>>();
};

export const createCategory = (category: CreateCategorySchema) => {
  return api
    .post("categories", {
      json: category,
    })
    .json<ApiResponse<Category[]>>();
};
