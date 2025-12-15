import { fileSchema } from "@/types/file";
import z from "zod";

export const createCourseSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: fileSchema,
    isFree: z.boolean(),
    price: z.number().min(0),
    isPublished: z.boolean(),
    categoryIds: z
      .array(
        z.object({
          value: z.uuid(),
          label: z.string(),
        }),
      )
      .min(1, "Select at least one category"),
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
