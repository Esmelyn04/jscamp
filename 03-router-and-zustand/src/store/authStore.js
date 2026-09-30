import { create } from "zustand"

export const useAuthStore = create((set) => ({
  // Initial state
  isLoggedIn: false,

  // Actions
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false })
}))