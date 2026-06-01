// @/components/ui/core/block/monitor/monitor-header.tsx
import AppLogoIcon from "@/components/ui/fragments/svg/logo-app"
import { useMonitorClock } from "@/hooks/use-monitor-clock"

export const MonitorHeader = () => {
  const { jam, tanggal } = useMonitorClock()

  return (
    <div className="m-auto flex w-full flex-col border-b px-7 py-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
        <div className="flex aspect-square size-11 items-center justify-center rounded-md text-white">
          <AppLogoIcon className="size-full fill-current text-white dark:text-black" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-accent-foreground">
            Live Monitor
          </h1>
          <p className="text-sm font-semibold text-muted-foreground">
            Central Hall Display. Terminal ID: MN-01
          </p>
        </div>
      </div>

      <div className="hidden text-right md:block">
        <div className="text-3xl font-black tracking-tight text-primary">
          {jam}
        </div>
        <div className="mt-1 text-lg font-bold tracking-wider text-muted-foreground uppercase">
          {tanggal}
        </div>
      </div>
    </div>
  )
}
