import { fileSchema, type File } from "@/types/file";
import z from "zod";

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: File;
  createdAt: string;
  updatedAt: string;
};

export const createCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  image: fileSchema,
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
