import { KEYs } from "@/lib/constant";
import { createTeachRequest, getRequests } from "@/services/request-service";
import { useMutation, useQuery } from "@tanstack/react-query";

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
