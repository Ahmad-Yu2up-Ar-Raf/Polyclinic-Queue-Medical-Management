import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/fragments/shadcn-ui/card"

import type { Antrian } from "../types/operator-types"
import { HugeiconsIcon } from "@hugeicons/react"
import { Megaphone03Icon } from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge"

export const ActiveQueueCard = ({ antrian }: { antrian: Antrian | null }) => {
  if (!antrian) {
    return (
      <Card className="border-dashed border-2 p-10 text-center shadow-none ring-0">
        <HugeiconsIcon
          icon={Megaphone03Icon}
          className="mx-auto mb-3 size-12 text-muted-foreground/60"
        />
        <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-300">
          Belum Ada Antrian Dipanggil
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Silakan klik "Berikutnya" untuk memanggil antrian pertama.
        </p>
      </Card>
    )
  }

  const sapaan =
    (antrian.pasien?.jenis_kelamin ?? "pria") === "pria" ? "Bapak" : "Ibu"

  return (
    <Card className="rounded-2xl border-0 bg-transparent p-5 text-center ring-0 shadow-none">
      <CardContent>
        <Badge className="relative mx-auto mb-9 flex h-fit w-fit items-center gap-2 rounded-full border border-border/50 bg-green-50 py-3 pr-5 pl-10 font-bold text-green-600 uppercase">
          <span className="absolute left-2.5 mb-1.5 text-5xl">•</span>
          <span className="font-bold">{antrian.status}</span>
        </Badge>
        <CardTitle className="mb-8 text-6xl font-bold">
          {antrian.nomor_antrian}
        </CardTitle>
        <div className="space-y-2">
          <CardDescription className="text-3xl font-bold tracking-tighter">
            {sapaan} {antrian.pasien?.nama ?? "Nama Tidak Diketahui"}
          </CardDescription>
          <p className="space-x-0.5 text-lg font-bold tracking-tighter text-muted-foreground/70">
            <span>{antrian.dokter?.spesialisasi ?? "-"}</span>
            <span className="text-muted-foreground"> • </span>
            <span>Dr. {antrian.dokter?.nama ?? "Nama Dokter"}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
