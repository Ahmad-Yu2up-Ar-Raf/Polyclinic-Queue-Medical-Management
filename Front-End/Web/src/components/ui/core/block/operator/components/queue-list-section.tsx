import { QueueItemCard } from "./queue-item-card"
import type { Antrian } from "../types/operator-types"

type Props = {
  title: string
  description: string
  items: Antrian[]
  iconColorClass: string
}

export const QueueListSection = ({
  title,
  description,
  items,
  iconColorClass,
}: Props) => {
  if (items.length === 0) return null

  return (
    <div className="max-w-xl space-y-10 rounded-xl p-3">
      <div className="border-b  border-border pb-5">
        <h3 className="mb-1 text-lg font-bold text-neutral-800 dark:text-neutral-200">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-7">
        {items.map((item) => (
          <QueueItemCard
            key={item.id}
            antrian={item}
            iconColorClass={iconColorClass}
          />
        ))}
      </div>
    </div>
  )
}
