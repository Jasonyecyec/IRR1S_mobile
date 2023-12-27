import { create } from "zustand";

const useUserStore = create((set) => ({
  email: null,
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  setEmail: (email) => set({ email }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useUserStore;
