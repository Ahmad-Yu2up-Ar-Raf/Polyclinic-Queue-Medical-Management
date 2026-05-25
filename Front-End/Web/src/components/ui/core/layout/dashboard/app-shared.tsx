import type { ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  CheckListIcon,
  Analytics02Icon,
  Message01Icon,
  UserMultipleIcon,
  Plug01Icon,
  Settings01Icon,
  HelpCircleIcon,
  ActivityIcon,
  Tv01FreeIcons,
  Timer02FreeIcons,
  UserAccountFreeIcons,
  DoorOpenIcon,
} from "@hugeicons/core-free-icons"

export type SidebarNavItem = {
  title: string
  path: string
  icon: IconSvgElement

  subItems?: SidebarNavItem[]
}

export type SidebarNavGroup = {
  label?: string
  items: SidebarNavItem[]
}
DashboardSquare01Icon
export const navGroups: SidebarNavGroup[] = [
  {
    items: [
      {
        title: "Overview",
        path: "/dashboard",
        icon: DashboardSquare01Icon,
      },
    ],
  },
  {
    label: "Layanan",
    items: [
      {
        title: "Monitor",
        path: "/monitor",
        icon: Tv01FreeIcons,
      },
      {
        title: "Antrian",
        path: "/dashboard/antrian",
        icon: Timer02FreeIcons,
      },
    ],
  },
  {
    label: "Manajemen Data",
    items: [
      {
        title: "Dokter",
        path: "/dashboard/dokter",
        icon: UserMultipleIcon,
      },
      {
        title: "Pasien",
        path: "/dashboard/pasien",
        icon: UserAccountFreeIcons,
      },
      {
        title: "Poliklinik",
        path: "/dashboard/poli",
        icon: DoorOpenIcon,
      },
    ],
  },
  {
    label: "Konfigurasi Staf",
    items: [
      {
        title: "operator",
        path: "/dashboard/operator",
        icon: Plug01Icon,
      },
    ],
  },
]

export const footerNavLinks: SidebarNavItem[] = [
  {
    title: "Help Center",
    path: "#/help",
    icon: HelpCircleIcon,
  },
  {
    title: "System status",
    path: "#/status",
    icon: ActivityIcon,
  },
]

export const navLinks: SidebarNavItem[] = [
  ...navGroups.flatMap((group) =>
    group.items.flatMap((item) =>
      item.subItems?.length ? [item, ...item.subItems] : [item]
    )
  ),
  ...footerNavLinks,
]
