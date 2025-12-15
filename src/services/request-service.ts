import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Request, RoleRequestSchema } from "@/types/request";

export const createTeachRequest = ({ agree }: { agree: boolean }) => {
  return api
    .post("requests/teach", {
      json: {
        agree,
      },
    })
    .json<ApiResponse<{}>>();
};

export const getRequests = async () => {
  const { data } = await api.get("requests").json<ApiResponse<Request[]>>();
  return data;
};

export const updateRequest = (body: RoleRequestSchema) => {
  return api
    .put(`requests/${body.requestId}`, {
      json: body,
    })
    .json<ApiResponse<Request>>();
};
