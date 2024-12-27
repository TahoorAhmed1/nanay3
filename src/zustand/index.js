import { create } from "zustand";

export const useNanny = create((set) => ({
  isOpenTable: false,
  setIsOpen: (value) => set((state) => ({ isOpenTable: value })),
}));

