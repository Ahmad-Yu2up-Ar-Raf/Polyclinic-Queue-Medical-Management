// @/components/ui/core/block/monitor/monitor-poli-card.tsx
import type { PoliElement } from "@/components/ui/core/block/monitor/types/monitor-types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/fragments/shadcn-ui/card"

import { MonitorAntrianItem } from "./monitor-antrian-item"
import { MonitorEmptyState } from "./monitor-empty-state"
import { HugeiconsIcon } from "@hugeicons/react"
import { ClinicIcon } from "@hugeicons/core-free-icons"

export const MonitorPoliCard = ({ data }: { data: PoliElement }) => {
  return (
    <Card className="flex-col gap-0 rounded-2xl border border-border bg-transparent p-0 pb-5 shadow-lg">
      <CardHeader className="flex gap-5 border-b p-5">
        <div className="flex aspect-square size-11 items-center justify-center rounded-md border border-border p-3 text-primary shadow-lg">
          <HugeiconsIcon icon={ClinicIcon} className="size-full" />
        </div>
        <div>
          <CardTitle className="mb-1 text-lg font-bold text-neutral-800 dark:text-neutral-200">
            {data.nama}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Total Antrian:{" "}
            <span className="font-bold">{data.total_antrian}</span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-7 p-7">
        {data.antrian_tunggu.length === 0 ? (
          <MonitorEmptyState message="Tidak ada antrian menunggu." />
        ) : (
          data.antrian_tunggu.map((antrian, idx) => (
            <MonitorAntrianItem
              key={antrian.id}
              data={antrian}
              iteration={idx + 1}
              isFirst={idx === 0}
              isLast={idx === data.antrian_tunggu.length - 1}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}
