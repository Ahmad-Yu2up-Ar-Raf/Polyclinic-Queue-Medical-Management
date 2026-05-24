import type { User } from "@/types/auth-type"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export { create } from "zustand"
export { persist } from "zustand/middleware"

interface authStoreType {
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = create<authStoreType>()(
  persist(
    (state) => ({
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
