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

export const generateSearchParams = (
  data: Record<string, string | string[] | number | number[] | boolean | Date | undefined>,
) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (val !== "") {
            params.append(key, val.toString());
          }
        });
      } else if (value instanceof Date) {
        params.append(key, value.toISOString());
      } else {
        params.append(key, value.toString());
      }
    }
  }
  return params.toString();
};
