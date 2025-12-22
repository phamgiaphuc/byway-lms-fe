import { optionalFileSchema, type File } from "@/types/file";
import z from "zod";

export type LessonFilter = {
  id: string;
};

export type LessonType = "lecture" | "video";

export type Lesson = {
  id: string;
  type: LessonType;
  title: string;
  isPublished: boolean;
  chapterId: string;
  description: string;
  position: number;
  videoId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  video: File;
};

export const createLessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  description: z.string().min(1, "Lesson description is required"),
  content: z.string().min(1, "Lesson content is required"),
  video: optionalFileSchema,
  isPublished: z.boolean(),
  type: z.enum(["lecture", "video"]),
  chapterId: z.string().optional(),
  position: z.number().default(0),
});

export type CreateLessonSchema = z.infer<typeof createLessonSchema>;
