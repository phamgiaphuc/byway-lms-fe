import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Category, CreateCategorySchema, UpdateCategorySchema } from "@/types/category";

export const getCategories = () => {
  return api.get("categories").json<ApiResponse<Category[]>>();
};

export const createCategory = (category: CreateCategorySchema) => {
  return api
    .post("categories", {
      json: category,
    })
    .json<ApiResponse<Category>>();
};

export const updateCategory = (category: UpdateCategorySchema) => {
  return api
    .put(`categories/${category.id}`, {
      json: category,
    })
    .json<ApiResponse<Category>>();
};
