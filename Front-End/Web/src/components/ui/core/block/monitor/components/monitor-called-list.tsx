// @/components/ui/core/block/monitor/monitor-called-list.tsx
import type { Dipanggil } from "@/components/ui/core/block/monitor/types/monitor-types"
import { MonitorCalledCard } from "./monitor-called-card"
import { MonitorEmptyState } from "./monitor-empty-state"
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { Megaphone } from "@hugeicons/core-free-icons"

export const MonitorCalledList = ({ data }: { data: Dipanggil[] }) => {
  return (
    <div className="space-y-8 md:space-y-6">
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <HugeiconsIcon icon={Megaphone} className="size-6 text-primary" />
          <h2 className="text-lg font-bold tracking-tighter">
            Memanggil Antrian:
          </h2>
        </div>
        <Badge className="bg-green-100/20 font-bold text-green-600 uppercase hover:bg-green-100/30">
          Live Update
        </Badge>
      </header>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {data.length === 0 ? (
          <MonitorEmptyState message="Tidak ada antrian dipanggil saat ini." />
        ) : (
          data.map((item, index) => (
            <MonitorCalledCard key={item.id} data={item} index={index} />
          ))
        )}
      </div>
    </div>
  )
}
