import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Category, CreateCategorySchema, UpdateCategorySchema } from "@/types/category";

export const getCategories = async (keyword?: string) => {
  const params = keyword ? { keyword: keyword } : {};
  const { data } = await api
    .get("categories", { searchParams: params })
    .json<ApiResponse<Category[]>>();
  return data;
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

export const deleteCategory = (body: { ids: string[] }) => {
  return api
    .delete("categories", {
      json: body,
    })
    .json<ApiResponse<Category>>();
};
