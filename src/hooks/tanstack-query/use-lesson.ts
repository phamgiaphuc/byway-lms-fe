import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import { getLessonById, getLessons } from "@/services/lesson-service";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonById = () => {
  const {
    filter: { lesson },
  } = useFilterStore();
  return useQuery({
    queryKey: ["lesson", lesson],
    queryFn: () => getLessonById(lesson.id),
    enabled: !!lesson.id,
  });
};

export const useGetLessons = () => {
  const {
    filter: { course },
  } = useFilterStore();
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessons(course.id),
    enabled: !!course.id,
  });
};
