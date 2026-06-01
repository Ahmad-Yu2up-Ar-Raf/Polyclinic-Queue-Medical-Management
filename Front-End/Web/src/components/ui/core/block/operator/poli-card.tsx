import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/fragments/shadcn-ui/card"

import type { Poli } from "@/components/ui/core/block/poli/types/poli-type"
import { Link } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight, HospitalLocationIcon } from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge"

type PoliCardProps = {
  item: Poli
}

export const PoliCard = ({ item }: PoliCardProps) => {
  return (
    <Link
      to={`/dashboard/operator/${item.id}`}
      aria-label={`Buka ${item.nama}`}
    >
      <Card className="group relative space-y-6 overflow-hidden bg-card transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
        {/* Icon Arrow di pojok kanan atas */}
        <div className="absolute top-5 right-5 scale-60 opacity-50 transition-all duration-300 ease-out group-hover:opacity-100">
          <HugeiconsIcon
            icon={ArrowUpRight}
            className="size-10 text-muted-foreground"
          />
        </div>

        <CardHeader className="pb-0">
          <div className="flex aspect-square size-11 items-center justify-center rounded-md border border-border bg-background text-primary ">
            <HugeiconsIcon icon={HospitalLocationIcon} className="size-7" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <CardTitle className="line-clamp-1 flex items-center gap-2 text-sm font-bold">
              {item.nama}
            </CardTitle>
            <CardDescription className="mt-1 text-xs text-muted-foreground capitalize">
              {item.ruangan}
            </CardDescription>
          </div>

          <Badge className="h-fit w-fit bg-green-50 py-2 dark:bg-green-800">
            <span className="dark:bg- text-xs font-bold text-green-500">
              {item.antrian_count} Antrian
            </span>
          </Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
