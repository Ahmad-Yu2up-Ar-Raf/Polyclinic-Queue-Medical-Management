"use client"

import React from "react"
import { SectionCards, type DataCard } from "./components/section-card"
import { FetchOverview } from "./hooks/use-overview-query"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import {
  UserIcon,
  Queue01Icon,
  HospitalLocationIcon,
  Stethoscope02FreeIcons,
  Timer01FreeIcons,
  Timer02FreeIcons,
  UserMultiple03FreeIcons,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons"

// Import komponen Chart dan Config-nya
import { ChartDistribution } from "./components/chart-distribution"
import {
  antrianStatusChartConfig,
  dokterStatusChartConfig,
  genderChartConfig,
} from "@/config/analytics-chart-config" // Sesuaikan path-nya ya bro
import { ChartActivityTrends } from "./components/chart-activity-trends"
import { useMonitorClock } from "@/hooks/use-monitor-clock"

function OverviewBlock() {
  const { data, isLoading, isError } = FetchOverview()
  const activityTrends = data?.reports.countsByDate
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-dvh w-full content-center items-center justify-center py-20">
        <Spinner className="size-10 text-primary" />
      </div>
    )
  }

  // 2. Error State / Data Empty
  if (isError || !data?.reports) {
    return (
      <div className="flex w-full justify-center py-20 text-muted-foreground">
        Gagal memuat data overview.
      </div>
    )
  }

  const reports = data.reports

  // 3. Mapping data dari API ke Format Card
  const dataCards: DataCard[] = [
    {
      title: "Total Dokter",
      description: "Jumlah dokter yang terdaftar",
      value: reports.totalDokter,
      icon: Stethoscope02FreeIcons,
      label: "Dokter",
    },
    {
      title: "Total Antrian",
      description: "Total kunjungan antrian",
      value: reports.totalAntrian,

      icon: Timer02FreeIcons,
      label: "Antrian",
    },
    {
      title: "Total Pasien",
      description: "Jumlah pasien terdaftar",
      value: reports.totalPasien,
      icon: UserMultipleIcon,

      label: "Pasien",
    },
    {
      title: "Total Poli",
      description: "Jumlah poliklinik tersedia",
      value: reports.totalPoli,

      icon: HospitalLocationIcon,
      label: "Poli",
    },
  ]

  // 4. Transform Data API Object ke Array of Object untuk Chart
  // Pake fallback {} biar gak crash kalau datanya undefined dari API
  const antrianStatusData = Object.entries(
    reports.AntrianstatusCount || {}
  ).map(([key, value]) => ({
    name: key,
    count: value,
  }))

  const dokterStatusData = Object.entries(reports.DokterstatusCount || {}).map(
    ([key, value]) => ({
      // Normalize string "tidak aktif" jadi "tidak-aktif" biar cocok dengan config chart
      name: key.replace(" ", "-"),
      count: value,
    })
  )

  const genderPasienData = Object.entries(
    reports.JenisKelaminPasienCount || {}
  ).map(([key, value]) => ({
    name: key,
    count: value,
  }))

  const genderDokterData = Object.entries(
    reports.JenisKelaminDokterCount || {}
  ).map(([key, value]) => ({
    name: key,
    count: value,
  }))
  const { jam, tanggal } = useMonitorClock()
  return (
    <section className="space-y-4 px-10 py-4">
      <div className="@container/main flex flex-1 flex-col gap-10">
        <header className="m-auto flex w-full flex-col border-b px-0 pb-7   md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="w-fit text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Selamat
              <span className="text-primary"> Datang</span>
            </h1>
            <p className="w-fit text-lg text-neutral-500">
              Berikut ini rangkuman data keseluruhan
            </p>
          </div>

          <div className="hidden text-right md:block">
            <div className="text-3xl font-black tracking-tight text-primary">
              {jam}
            </div>
            <div className="mt-1 text-lg font-bold tracking-wider text-muted-foreground uppercase">
              {tanggal}
            </div>
          </div>
        </header>

        {/* --- STATS CARDS --- */}
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards dataCards={dataCards} />
        </div>

        {/* --- CHARTS GRID --- */}
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
          <ChartActivityTrends
            className="col-span-3"
            data={activityTrends || []}
            title="Tren Aktivitas"
            description="Votes, destinasi, dan artikel per hari"
          />
          <ChartDistribution
            data={antrianStatusData}
            chartConfig={antrianStatusChartConfig}
            title="Status Antrian"
            description="Distribusi status hari ini"
            nameKey="Antrian"
            emptyMessage="status antrian"
          />

          {/* <ChartDistribution
            data={dokterStatusData}
            chartConfig={dokterStatusChartConfig}
            title="Status Dokter"
            description="Aktivitas dokter saat ini"
            nameKey="Status"
            emptyMessage="status dokter"
          />

          <ChartDistribution
            data={genderPasienData}
            chartConfig={genderChartConfig}
            title="Gender Pasien"
            description="Distribusi demografi pasien"
            nameKey="Gender"
            emptyMessage="data pasien"
          />

          <ChartDistribution
            data={genderDokterData}
            chartConfig={genderChartConfig}
            title="Gender Dokter"
            description="Distribusi demografi dokter"
            nameKey="Gender"
            emptyMessage="data dokter"
          /> */}
        </div>
      </div>
    </section>
  )
}

export default OverviewBlock
