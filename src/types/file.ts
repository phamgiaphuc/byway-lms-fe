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

export const fileSchema = z
  .object({
    id: z.string(),
    ext: z.string(),
    name: z.string(),
    url: z.url(),
  })
  .optional()
  .refine((val) => val !== undefined, {
    message: "File is required",
  });

export const optionalFileSchema = z
  .object({
    id: z.string(),
    ext: z.string(),
    name: z.string(),
    url: z.url(),
  })
  .optional();

export type FileSchema = z.infer<typeof fileSchema>;

export const filesSchema = z.array(fileSchema);

export type FilesSchema = z.infer<typeof filesSchema>;
