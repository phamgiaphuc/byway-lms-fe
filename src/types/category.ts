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

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  image: fileSchema,
});

export type CategorySchema = z.infer<typeof categorySchema>;

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Web Development",
    slug: "web-development",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: {
      id: "",
      ext: "",
      name: "",
      url: "",
    },
  },
  {
    id: "cat-2",
    name: "Data Science",
    slug: "data-science",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: {
      id: "",
      ext: "",
      name: "",
      url: "",
    },
  },
];
