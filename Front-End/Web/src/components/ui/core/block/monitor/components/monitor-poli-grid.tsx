// @/components/ui/core/block/monitor/monitor-poli-grid.tsx
import type { PoliElement } from "@/components/ui/core/block/monitor/types/monitor-types"
import { MonitorPoliCard } from "./monitor-poli-card"

export const MonitorPoliGrid = ({ data }: { data: PoliElement[] }) => {
  if (data.length === 0) return null

  return (
    <div className="mt-3 border-t pt-10">
      <div className="grid grid-cols-1 gap-4 rounded-xl sm:grid-cols-2 md:grid-cols-3">
        {data.map((poli) => (
          <MonitorPoliCard key={poli.id} data={poli} />
        ))}
      </div>
    </div>
  )
}
