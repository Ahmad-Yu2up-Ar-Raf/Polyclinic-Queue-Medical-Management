import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import DashboardPage from "@/pages/dashboard/dashboard"
import PoliPage from "@/pages/dashboard/poli"
import MonitorPage from "@/pages/monitor"
import { useAuthStore } from "@/store/auth-store"
import { createBrowserRouter, Navigate, Outlet } from "react-router"

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
    element: <MonitorPage />,
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
    path: "/dashboard",
    element: <AuthenticatedGuard />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/poli",
        element: <PoliPage />,
      },
    ],
  },
])
