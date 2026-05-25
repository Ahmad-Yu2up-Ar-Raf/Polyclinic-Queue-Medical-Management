import { type IconSvgElement } from "@hugeicons/react"
import {
  DashboardCircleIcon,
  UserMultipleIcon,
  Plug01Icon,
  HelpCircleIcon,
  ActivityIcon,
  Tv01FreeIcons,
  Timer02FreeIcons,
  UserAccountFreeIcons,
  Home09Icon,
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
 
export const navGroups: SidebarNavGroup[] = [
  {
    items: [
      {
        title: "Overview",
        path: "/dashboard",
        icon: DashboardCircleIcon,
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
        icon: Home09Icon,
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
