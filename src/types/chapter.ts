import z from "zod";

export type ChapterFilter = {
  courseId: string;
};

export type Chapter = {
  id: string;
  title: string;
  isPublished: boolean;
  courseId: string;
};

export const createChapterSchema = z.object({
  courseId: z.string(),
  title: z.string().min(1, "Chapter title is required"),
  isPublished: z.boolean().default(false),
});

export const updateChapterSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "Chapter title is required"),
  isPublished: z.boolean().default(false),
  courseId: z.uuid(),
});

export type CreateChapterSchema = z.infer<typeof createChapterSchema>;

export type UpdateChapterSchema = z.infer<typeof updateChapterSchema>;
