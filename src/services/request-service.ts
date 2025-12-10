import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type { Request } from "@/types/request";

export const createTeachRequest = ({ agree }: { agree: boolean }) => {
  return api
    .post("requests/teach", {
      json: {
        agree,
      },
    })
    .json<ApiResponse<{}>>();
};

export const getRequests = () => {
  return api.get("requests").json<ApiResponse<Request[]>>();
};
