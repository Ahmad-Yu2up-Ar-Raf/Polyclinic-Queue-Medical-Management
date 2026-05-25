import { AppShell } from "@/components/ui/core/layout/dashboard/app-shell"
import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import DashboardPage from "@/pages/dashboard/dashboard"
import WelcomePage from "@/pages/welcome"
import { useAuthStore } from "@/store/auth-store"
import { createBrowserRouter, Outlet, Navigate } from "react-router"

const GuestGuard = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  return isAuthenticated ? <Navigate to={"/dashboard"} /> : <Outlet />
}
const AuthenticatedGuard = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  return !isAuthenticated ? <Navigate to={"/login"} /> : <Outlet />
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
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
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
])
