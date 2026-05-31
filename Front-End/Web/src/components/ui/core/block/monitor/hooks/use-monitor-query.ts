// @/hooks/fetch/use-monitor.ts

import { api } from "@/api/clien"
import type { MonitorResponse } from "@/components/ui/core/block/monitor/types/monitor-types"
import { useQuery } from "@tanstack/react-query"

export const FetchMonitor = () => {
  return useQuery({
    queryKey: ["monitor"],
    queryFn: async () => api.get("monitor").json<MonitorResponse>(),
    // BEST PRACTICE POLLING: Refresh setiap 2 detik.
    // refetchOnWindowFocus mencegah spam request jika tab di-minimize.
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  })
}
