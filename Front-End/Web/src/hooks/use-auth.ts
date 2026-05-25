import { loginSchema } from "@/lib/validations/auth-validation"
import { useAppForm } from "./form/use-form"
import { api } from "@/api/clien"
import type { AuthResponse } from "@/types/auth-type"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { setLogin, setLogOut } from "@/store/auth-store"
import { useQueryClient } from "@tanstack/react-query"

export type useAuthType = ReturnType<typeof useAuth>
export type loginReturnType = ReturnType<useAuthType["handleLogin"]>

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleLogin = () => {
    return useAppForm({
      validators: {
        onSubmit: loginSchema,
      },
      defaultValues: {
        email: "",
        password: "",
      },
      onSubmit: async ({ value: data }) => {
        const login = api
          .post("auth/login", { json: data })
          .json<AuthResponse>()

        toast.promise(login, {
          success: (data) => {
            setLogin(data)
            navigate("/dashboard")
            return `Welcome back ${data.user.name}`
          },
          error: (err) => {
            return err.message || "Login gagal!"
          },
          loading: "Loading...",
        })

        await login
      },
    })
  }

  const handleLogout = () => {
    const logoutAction = async () => {
      queryClient.clear()
      const result = await api.post("auth/logout").json<{ succes: boolean }>()
      setLogOut()

      if (!result) {
        throw new Error("Gagal logout")
      }

      navigate("/login")
      return result
    }

    return toast.promise(logoutAction(), {
      loading: "Log Out...",
      success: "Logout berhasil!",
      error: (err) => {
        return err.message || "Gagal Log Out!"
      },
    })
  }

  return {
    handleLogin,
    handleLogout,
  }
}
