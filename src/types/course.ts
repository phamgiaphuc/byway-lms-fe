import type { Category } from "@/types/category";
import type { Chapter } from "@/types/chapter";
import { fileSchema, type File } from "@/types/file";
import z from "zod";

export type CourseFilter = {
  id: string;
};

export type Course = {
  id: string;
  level: string;
  instructorId: string;
  title: string;
  description: string;
  imageId: string;
  price: number;
  isFree: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  image: File;
  categories: Category[];
  chapters: Chapter[];
};

export const createCourseSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: fileSchema,
    isFree: z.boolean(),
    price: z.number(),
    isPublished: z.boolean(),
    level: z.enum(["beginner", "intermediate", "expert"]),
    categoryIds: z.array(z.uuid()).min(1, "Select at least one category"),
  })
  .superRefine((data, ctx) => {
    if (!data.isFree && data.price <= 0) {
      ctx.addIssue({
        path: ["price"],
        message: "Price is required for paid courses",
        code: "custom",
      });
    }
    if (data.isFree && data.price !== 0) {
      ctx.addIssue({
        path: ["price"],
        message: "Free courses must have price 0",
        code: "custom",
      });
    }
  });

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
