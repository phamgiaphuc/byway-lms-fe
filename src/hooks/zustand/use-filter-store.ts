import type { CategoryFilter } from "@/types/category";
import { create } from "zustand";

type FilterState = {
  category: CategoryFilter;
};

type FilterAction = {
  updateFilter: <T extends keyof FilterState>(filter: T, value: Partial<FilterState[T]>) => void;
  resetFilter: <T extends keyof FilterState>(filter: T) => void;
};

type FilterStore = FilterAction & {
  filter: FilterState;
};

const initFilterState: FilterState = {
  category: {
    keyword: "",
  },
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  filter: initFilterState,
  updateFilter: (filterKey, values) => {
    const filter = get().filter;
    set({ filter: { ...filter, [filterKey]: { ...filter[filterKey], ...values } } });
  },
  resetFilter: (filterKey) => {
    const initValue = initFilterState[filterKey];
    const filter = get().filter;
    set({ filter: { ...filter, [filterKey]: initValue } });
  },
}));
