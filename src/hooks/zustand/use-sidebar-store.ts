import { create } from "zustand";

type BreadcrumbHeader = {
  title: string;
  url?: string;
};

type SidebarState = {
  headers: BreadcrumbHeader[];
};

type SidebarActions = {
  setHeaders: (headers: BreadcrumbHeader[]) => void;
};

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>((set) => ({
  headers: [],
  setHeaders: (headers: BreadcrumbHeader[]) => set({ headers }),
}));
