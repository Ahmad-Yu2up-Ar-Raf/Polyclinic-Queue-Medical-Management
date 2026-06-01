import { AppShell } from "@/components/ui/core/layout/dashboard/app-shell"
import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import AntrianPage from "@/pages/dashboard/antrian"
import DashboardPage from "@/pages/dashboard/dashboard"
import DokterPage from "@/pages/dashboard/dokter"
import PasienPage from "@/pages/dashboard/pasien"
import PoliPage from "@/pages/dashboard/poli"
import MonitorPage from "@/pages/monitor"
import OperatorPage from "@/pages/operator/operator"
import SelectPoli from "@/pages/operator/select-poli"

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
          {
            path: "poli", // Bisa langsung 'poli' jika parent-nya sudah /dashboard
            element: <PoliPage />,
          },
          {
            path: "antrian", // Bisa langsung 'poli' jika parent-nya sudah /dashboard
            element: <AntrianPage />,
          },
          {
            path: "pasien", // Bisa langsung 'poli' jika parent-nya sudah /dashboard
            element: <PasienPage />,
          },
          {
            path: "dokter", // Bisa langsung 'poli' jika parent-nya sudah /dashboard
            element: <DokterPage />,
          },
          {
            path: "operator",
            element: <SelectPoli />,
          },
          // TAMBAHKAN INI:
          {
            path: "operator/:id",
            element: <OperatorPage />, // Buat komponen page baru untuk detail poli
          },
        ],
      },
    ],
  },
])
