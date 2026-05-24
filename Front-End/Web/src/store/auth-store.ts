import { create } from "zustand"
import { persist } from "zustand/middleware"

interface authStoreType {
  isAuthenticated: boolean
  token: string | null
  user: string | null
}

export const useAuthStore = create<authStoreType>()(
  persist(
    (state) => ({
      isAuthenticated: false,
      token: null,
      user: null,
    }),
    {
      name: "auth-store",
    }
  )
)



