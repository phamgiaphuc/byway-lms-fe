import z from "zod";

export type File = {
  id: string;
  ext: string;
  name: string;
  url: string;
};

export const initialFile: File = {
  id: "",
  ext: "",
  name: "",
  url: "",
};

export type UploadSingle = {
  file: File;
  folder?: string;
};

export type UploadMultiple = {
  files: File[];
  folder?: string;
};

export type UploadSingleResponse = Omit<File, "id">;

export type UploadMultipleResponse = Omit<File, "id">[];

export const fileSchema = z
  .object({
    id: z.string(),
    ext: z.string(),
    name: z.string(),
    url: z.url(),
  })
  .partial()
  .refine((val) => val.id && val.ext && val.name && val.url, {
    message: "File is required",
  });

export type FileSchema = z.infer<typeof fileSchema>;

export const filesSchema = z.array(fileSchema);

export type FilesSchema = z.infer<typeof filesSchema>;
