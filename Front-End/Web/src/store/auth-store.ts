import type { AuthResponse, User } from "@/types/auth-type"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface authStoreType {
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = create<authStoreType>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
    }),
    {
      name: "auth-store",
    }
  )
)

export const setLogOut = () =>
  useAuthStore.setState(useAuthStore.getInitialState())

export const setLogin = (data: AuthResponse) =>
  useAuthStore.setState(() => ({
    ...data,
    isAuthenticated: true,
  }))
