import { create } from "zustand";

interface SearchValueState {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const useSearchValueStore = create<SearchValueState>((set) => ({
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
}));
