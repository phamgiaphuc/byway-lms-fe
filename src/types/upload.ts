import type { File as FileResponse } from "@/types/file";

export type UploadSingle = {
  file: File;
  folder?: string;
};

export type UploadMultiple = {
  files: File[];
  folder?: string;
};

export type UploadSingleResponse = Omit<FileResponse, "id">;

export type UploadMultipleResponse = Omit<FileResponse, "id">[];
