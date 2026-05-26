// File: @/store/auth-store.ts
import type { AuthResponse, User } from '@/types/auth-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 Pastikan sudah install ini ya bro

interface authStoreType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean; // 👈 1. Tambahkan state pelacak ini
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<authStoreType>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      _hasHydrated: false, // Default awal pasti false sebelum selesai dimuat
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage), // 👈 2. Gunakan AsyncStorage bawaan React Native
      onRehydrateStorage: (state) => {
        // 3. Begitu proses pemuatan dari internal HP selesai, ubah status jadi true
        return () => state?.setHasHydrated(true);
      },
    }
  )
);

export const setLogin = (Data: AuthResponse) =>
  useAuthStore.setState((state) => ({
    ...Data,
    isAuthenticated: true,
  }));

export const setLogout = () => useAuthStore.setState(useAuthStore.getInitialState());
