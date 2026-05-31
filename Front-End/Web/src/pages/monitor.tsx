import MonitorBlock from "@/components/ui/core/block/monitor/monitor-block"

import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchMonitor } from "@/components/ui/core/block/monitor/hooks/use-monitor-query"

const MonitorPage = () => {
  const { isLoading, data } = FetchMonitor()

  if (isLoading) {
    return <Spinner className="m-auto w-full text-primary" />
  }

  return <MonitorBlock Data={data!} />
}

export default MonitorPage
