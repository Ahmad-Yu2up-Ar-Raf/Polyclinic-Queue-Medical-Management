import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import DashboardPage from "@/pages/dashboard/dashboard"
import { useAuthStore } from "@/store/auth-store"
import { createBrowserRouter, Outlet, Navigate } from "react-router"

const GuestGuard = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  return !isAuthenticated ? <Outlet /> : <Navigate to={"/dashboard"} />
}
const AuthenticatedGuard = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  return isAuthenticated ? <Outlet /> : <Navigate to={"/dashboard"} />
}

export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <AuthenticatedGuard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
])
