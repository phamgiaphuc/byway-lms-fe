import { create } from "zustand";

type BreadcrumbHeader = {
  title: string;
  url?: string;
};

type SidebarState = {
  headers: BreadcrumbHeader[];
  isHeaderHidden: boolean;
};

type SidebarActions = {
  setHeaders: (headers: BreadcrumbHeader[]) => void;
  setIsHeaderHidden: (hidden: boolean) => void;
};

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>((set) => ({
  headers: [],
  isHeaderHidden: false,
  setHeaders: (headers: BreadcrumbHeader[]) => set({ headers }),
  setIsHeaderHidden: (hidden: boolean) => set({ isHeaderHidden: hidden }),
}));
