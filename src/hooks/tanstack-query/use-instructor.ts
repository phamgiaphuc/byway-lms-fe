import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import {
  createChapter,
  createLesson,
  getChapterById,
  getChapters,
  getCourseById,
  getCourses,
  updateChapterById,
} from "@/services/instructor-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["courses", "instructor"],
    queryFn: () => getCourses(),
  });
};

export const useGetCourseById = () => {
  const {
    filter: { course },
  } = useFilterStore();
  return useQuery({
    queryKey: ["course", "instructor", course.id],
    queryFn: () => getCourseById(course.id),
    enabled: !!course.id,
  });
};

export const useCreateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
    },
  });
};

export const useGetChapters = () => {
  const {
    filter: { chapter },
  } = useFilterStore();
  return useQuery({
    queryKey: ["chapters", chapter],
    queryFn: () => getChapters(chapter.courseId),
    enabled: !!chapter.courseId,
  });
};

export const useUpdateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateChapterById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
    },
  });
};

export const useGetChapterById = () => {
  const {
    filter: { chapter },
  } = useFilterStore();
  return useQuery({
    queryKey: ["chapter", chapter],
    queryFn: () => getChapterById(chapter.id),
    enabled: !!chapter.id,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
    },
  });
};
