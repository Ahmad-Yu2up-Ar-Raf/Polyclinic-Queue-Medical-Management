// @/components/ui/core/block/monitor/monitor-antrian-item.tsx
import type { AntrianTunggu } from "@/components/ui/core/block/monitor/types/monitor-types"
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge"

type Props = {
  data: AntrianTunggu
  isFirst: boolean
  isLast: boolean
  iteration: number
}

export const MonitorAntrianItem = ({
  data,
  isFirst,
  isLast,
  iteration,
}: Props) => {
  return (
    <div
      className={`flex items-center justify-between gap-6 ${isLast ? "border-none pb-0" : "border-b border-border pb-5"}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex aspect-square size-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary dark:text-amber-400">
          {iteration}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold">{data.nomor_antrian}</h3>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center text-right">
        {isFirst ? (
          <Badge className="bg-green-100 font-bold text-green-700 uppercase hover:bg-green-200">
            Berikutnya
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-xs font-semibold text-muted-foreground uppercase"
          >
            Menunggu
          </Badge>
        )}
      </div>
    </div>
  )
}
