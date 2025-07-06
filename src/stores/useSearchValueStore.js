import { create } from "zustand";

export const useSearchValueStore = create((set) => ({
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
}));
