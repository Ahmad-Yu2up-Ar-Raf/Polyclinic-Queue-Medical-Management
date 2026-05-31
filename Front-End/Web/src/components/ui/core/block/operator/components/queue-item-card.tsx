import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/fragments/shadcn-ui/card"

import type { Antrian } from "../types/operator-types"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserIcon } from "@hugeicons/core-free-icons"

type Props = {
  antrian: Antrian
  iconColorClass: string
}

export const QueueItemCard = ({ antrian, iconColorClass }: Props) => {
  const isBpjs = antrian.metode_pembayaran?.toUpperCase() === "BPJS"
  const paymentColor = isBpjs ? "text-purple-700" : "text-green-700"

  return (
    <Card className="flex items-center ring-0 justify-between gap-6 rounded-none border-b border-border bg-transparent p-0 pb-7 shadow-none">
      <CardContent className="flex w-full justify-between border-0 p-0">
        <div className="flex items-center gap-4">
          <HugeiconsIcon
            icon={UserIcon}
            className={`size-7 ${iconColorClass}`}
          />
          <div className="space-y-1">
            <CardTitle className="text-sm font-bold">
              {antrian.pasien?.nama}
            </CardTitle>
            <CardDescription className="flex flex-row items-center gap-2 text-xs font-bold">
              <span className="text-muted-foreground">
                Dr. {antrian.dokter?.nama}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className={`capitalize ${paymentColor}`}>
                {antrian.metode_pembayaran}
              </span>
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-end text-right">
          <span className="text-xs font-semibold">NO</span>
          <span className="text-sm font-bold text-primary">
            {antrian.nomor_antrian}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
