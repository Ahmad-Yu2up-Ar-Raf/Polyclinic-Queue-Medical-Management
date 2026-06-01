import MonitorBlock from "@/components/ui/core/block/monitor/monitor-block"

import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchMonitor } from "@/components/ui/core/block/monitor/hooks/use-monitor-query"

const MonitorPage = () => {
  const { isLoading, data } = FetchMonitor()

  if (isLoading) {
    return (
      <div className="flex min-h-dvh w-full content-center items-center justify-center py-20">
        <Spinner className="size-10 text-primary" />
      </div>
    )
  }

  return <MonitorBlock Data={data!} />
}

export default MonitorPage
