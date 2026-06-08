// File: @/store/auth-store.ts
import type { AuthResponse, User } from '@/components/ui/core/block/auth/types/auth-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface authStoreType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const INITIAL_AUTH_STATE = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<authStoreType>()(
  persist(
    (set) => ({
      ...INITIAL_AUTH_STATE,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        return () => state?.setHasHydrated(true);
      },
    }
  )
);

export const setLogin = (Data: AuthResponse) =>
  useAuthStore.setState({
    ...Data,
    isAuthenticated: true,
  });

export const setLogout = () => useAuthStore.setState(INITIAL_AUTH_STATE);
