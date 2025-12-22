import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import {
  completeLesson,
  enrollCourse,
  getMyCourses,
  getMyLessons,
  getMyRequests,
} from "@/services/user-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const userUserEnrollCourse = () => {
  return useMutation({
    mutationFn: enrollCourse,
  });
};

export const useGetMyCourses = () => {
  const { isAuthenticated } = useUserStore();
  return useQuery({
    queryKey: ["me", "courses"],
    queryFn: () => getMyCourses(),
    enabled: isAuthenticated,
  });
};

export const useGetMyLessons = () => {
  const {
    filter: { course },
  } = useFilterStore();
  return useQuery({
    queryKey: [
      "me",
      "lessons",
      {
        courseId: course.id,
      },
    ],
    queryFn: () => getMyLessons(course.id),
    enabled: !!course.id,
  });
};

export const useCompleteLesson = (lessonId: string, courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => completeLesson(lessonId, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me", "lessons"] });
    },
  });
};

export const useGetMyRequests = () => {
  return useQuery({
    queryKey: ["me", "requests"],
    queryFn: () => getMyRequests(),
  });
};
