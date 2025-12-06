import { ls } from "@/lib/helpers";
import { initialUser, type User } from "@/types/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserState = {
  profile: User;
  isAuthenticated: boolean;
};

type UserActions = {
  setProfile: (profile: User) => void;
  setIsAuthenticated: (status: boolean) => void;
  signOut: () => void;
};

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    profile: initialUser,
    isAuthenticated: false,
    setProfile: (profile: User) => set({ profile }),
    setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
    signOut: () =>
      set({
        profile: initialUser,
        isAuthenticated: false,
      }),
  })),
);
