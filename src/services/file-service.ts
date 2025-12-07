import { api } from "@/lib/ky";
import type { ApiResponse } from "@/types/api-response";
import type {
  UploadMultiple,
  UploadMultipleResponse,
  UploadSingle,
  UploadSingleResponse,
} from "@/types/file";

export const uploadSingle = async ({ file, folder }: UploadSingle) => {
  const form = new FormData();
  form.append("file", file);
  if (folder) form.append("folder", folder);

  return api
    .post("files/upload-single", {
      body: form,
    })
    .json<ApiResponse<UploadSingleResponse>>();
};

export const uploadMultiple = async ({ files, folder }: UploadMultiple) => {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  if (folder) form.append("folder", folder);

  return api
    .post("files/upload-multiple", {
      body: form,
    })
    .json<ApiResponse<UploadMultipleResponse>>();
};
