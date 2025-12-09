import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/category-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategories = (keyword?: string) => {
  return useQuery({
    queryKey: ["categories", keyword],
    queryFn: () => getCategories(keyword),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
