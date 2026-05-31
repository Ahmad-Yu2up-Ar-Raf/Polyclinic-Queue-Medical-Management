// @/components/ui/core/block/monitor/monitor-called-card.tsx
import type { Dipanggil } from "@/components/ui/core/block/monitor/types/monitor-types"
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge" // Asumsi letak badge
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/fragments/shadcn-ui/card" // Asumsi letak card
import { HugeiconsIcon } from "@hugeicons/react"
import { BellRing, Notification01FreeIcons } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

type Props = {
  data: Dipanggil
  index: number
}

export const MonitorCalledCard = ({ data, index }: Props) => {
  // Translasi styling dinamis Flux UI ke Tailwind murni
  const colorSchemes = [
    {
      border: "border-l-primary",
      badge: "bg-primary/10 text-primary",
      text: "text-primary",
      bg: "bg-primary",
      shadow: "shadow-primary/50",
    },
    {
      border: "border-l-blue-400",
      badge: "bg-blue-100 text-blue-700",
      text: "text-blue-400",
      bg: "bg-blue-400",
      shadow: "shadow-blue-400/50",
    },
    {
      border: "border-l-green-400",
      badge: "bg-green-100 text-green-700",
      text: "text-green-400",
      bg: "bg-green-400",
      shadow: "shadow-green-400/50",
    },
    {
      border: "border-l-yellow-400",
      badge: "bg-yellow-100 text-yellow-700",
      text: "text-yellow-400",
      bg: "bg-yellow-400",
      shadow: "shadow-yellow-400/50",
    },
  ]

  const scheme = colorSchemes[index % 4] // Fallback loop jika data > 3

  return (
    <Card
      className={cn(
        `m-auto w-full max-w-md space-y-11 rounded-2xl border border-l-8 border-border px-6 py-5 text-center shadow-lg`,

        scheme.border
      )}
    >
      <CardHeader className="flex w-full items-center justify-between p-0">
        <Badge className={`${scheme.badge} font-bold uppercase`}>
          {data.poli.nama}
        </Badge>
        <span className="space-x-0.5 font-bold text-muted-foreground/70">
          {data.poli.ruangan}
        </span>
      </CardHeader>

      <div className="space-y-3">
        <CardTitle className="space-x-0.5 font-bold text-muted-foreground/70 uppercase">
          nomor antrian
        </CardTitle>
        <CardDescription className="lg:text-line-6 mb-6 text-5xl font-bold tracking-tighter">
          {data.nomor_antrian}
        </CardDescription>
      </div>

      <footer className="flex w-full items-center justify-between border-t pt-5">
        <p className="relative flex h-fit w-fit items-center gap-1 rounded-full py-1 pr-5 pl-5.5 font-bold">
          <span className="absolute left-0 mb-1 text-3xl text-green-600">
            •
          </span>
          <span className="pl-2 text-sm font-bold text-muted-foreground/80">
            Memanggil...
          </span>
        </p>
        <div
          className={`flex aspect-square p-2 ${scheme.bg} size-10 items-center shadow-lg ${scheme.shadow} justify-center rounded-full text-white`}
        >
          <HugeiconsIcon icon={Notification01FreeIcons} className="size-full" />
        </div>
      </footer>
    </Card>
  )
}
