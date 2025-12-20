import type { Category } from "@/types/category";
import type { Chapter } from "@/types/chapter";
import { fileSchema, type File } from "@/types/file";
import type { User } from "@/types/user";
import z from "zod";

export type CourseFilter = {
  id: string;
  categoryIds: string[];
  prices: string[];
};

export type Course = {
  id: string;
  level: string;
  instructorId: string;
  title: string;
  subtitle: string;
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
  instructor: User;
};

export const createCourseSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    subtitle: z
      .string()
      .min(1, "Subtitle is required")
      .max(200, "Subtitle must be at most 200 characters"),
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
