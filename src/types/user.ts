import type { Course } from "@/types/course";
import { fileSchema } from "@/types/file";
import z from "zod";

export type Role = "user" | "instructor" | "admin";

export const USER_ROLE: Role = "user";
export const INSTRUCTOR_ROLE: Role = "instructor";
export const ADMIN_ROLE: Role = "admin";

export const redirectOnRole: Record<Role, string> = {
  admin: "/admin/dashboard",
  user: "/",
  instructor: "/instructor/dashboard",
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: Role;
};

export type UserCourse = {
  id: string;
  courseId: string;
  status: string;
  progress: number;
  enrolledAt: Date;
  completedAt: Date | null;
  userId: string;
  course: Course;
};

export type UserLesson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
  lessonId: string;
  userCourseId: string;
  isCompleted: boolean;
  lastPosition: number | null;
};

export const initialUser: User = {
  id: "",
  name: "",
  email: "",
  emailVerified: false,
  image: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
  role: "user",
};

export const updateUserSchema = z.object({
  email: z.string(),
  name: z.string().min(1, "Name is required"),
  image: fileSchema,
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
