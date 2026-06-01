// =============================================================================
// ANALYTICS CHART CONFIG - UPDATED
// =============================================================================
import type { ChartConfig } from "@/components/ui/fragments/shadcn-ui/chart"

// ... (Simpan konfigurasi lama kamu di sini seperti categoryChartConfig, dll)
export const distributionColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const
// ============================================
// STATUS & GENDER CHART CONFIG
// ============================================

export const antrianStatusChartConfig: ChartConfig = {
  count: { label: "Jumlah" },
  selesai: { label: "Selesai", color: "var(--chart-1)" },
  dilewati: { label: "Dilewati", color: "var(--chart-2)" },
  dipanggil: { label: "Dipanggil", color: "var(--chart-3)" },
  menunggu: { label: "Menunggu", color: "var(--chart-4)" },
}

export const dokterStatusChartConfig: ChartConfig = {
  count: { label: "Jumlah" },
  aktif: { label: "Aktif", color: "var(--chart-1)" },
  "tidak-aktif": { label: "Tidak Aktif", color: "var(--chart-5)" },
}

export const genderChartConfig: ChartConfig = {
  count: { label: "Jumlah" },
  pria: { label: "Pria", color: "var(--chart-1)" },
  wanita: { label: "Wanita", color: "var(--chart-2)" },
}

// ============================================
// HELPER: Get label from config
// ============================================

// ... (Simpan helper lama kamu di sini)

export function getAntrianStatusLabel(status: string): string {
  const config = antrianStatusChartConfig[status]
  return typeof config?.label === "string" ? config.label : status
}

export function getDokterStatusLabel(status: string): string {
  const config = dokterStatusChartConfig[status]
  return typeof config?.label === "string" ? config.label : status
}

export function getGenderLabel(gender: string): string {
  const config = genderChartConfig[gender]
  return typeof config?.label === "string" ? config.label : gender
}
