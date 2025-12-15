import { KEYs } from "@/lib/constant";
import { createTeachRequest, getRequests, updateRequest } from "@/services/request-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTeachRequest = () => {
  return useMutation({
    mutationFn: createTeachRequest,
  });
};

export const useGetRequests = () => {
  return useQuery({
    queryKey: [KEYs.request],
    queryFn: getRequests,
  });
};

export const useUpdateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYs.request] });
    },
  });
};
