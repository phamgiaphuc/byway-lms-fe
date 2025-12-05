export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: string;
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
  role: "",
};
