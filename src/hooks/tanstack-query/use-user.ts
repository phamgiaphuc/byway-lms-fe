import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/user-service";
import type { User } from "@/types/user";
import type { ApiResponse } from "@/types/api-response";

export const USER_QUERY_KEY = ["me"];

export const useUser = () => {
  const query = useQuery<ApiResponse<User>>({
    queryKey: USER_QUERY_KEY,
    queryFn: getMe,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, 
  });

  return {
    user: query.data?.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isAuthenticated: !!query.data?.data,
    error: query.error,
    refetch: query.refetch,
  };
};
