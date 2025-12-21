import { useUserStore } from "@/hooks/zustand/use-user-store";
import { enrollCourse, getMyCourses } from "@/services/user-service";
import { useMutation, useQuery } from "@tanstack/react-query";

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
