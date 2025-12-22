import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourseById,
} from "@/services/course-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useGetCourses = () => {
  const {
    filter: { course },
  } = useFilterStore();
  return useQuery({
    queryKey: ["courses", course],
    queryFn: () => getCourses(course),
  });
};

export const useGetCourseById = () => {
  const {
    filter: { course },
  } = useFilterStore();
  return useQuery({
    queryKey: ["course", course.id],
    queryFn: () => getCourseById(course.id, course.detail),
    enabled: !!course.id,
  });
};

export const useUpdateCourseById = () => {
  const queryClient = useQueryClient();
  const {
    filter: { course },
  } = useFilterStore();
  return useMutation({
    mutationFn: updateCourseById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", course.id] });
    },
  });
};
