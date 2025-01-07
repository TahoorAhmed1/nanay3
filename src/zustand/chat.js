import { create } from "zustand";

export const useChat = create((set) => ({
  chat: [],
  setChat: (value) => set((state) => ({ chat: value })),
}));

