export type Role = "user" | "instructor" | "admin";

export const USER_ROLE: Role = "user";
export const INSTRUCTOR_ROLE: Role = "instructor";
export const ADMIN_ROLE: Role = "admin";

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
