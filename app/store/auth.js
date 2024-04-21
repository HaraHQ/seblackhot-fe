import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

const authStore = createStore(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      resetToken: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default authStore;
