import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import { Megaphone03FreeIcons, NextIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type Props = {
  onSkip: () => void
  onNext: () => void
  isLoading: boolean
}

export const QueueActions = ({ onSkip, onNext, isLoading }: Props) => {
  return (
    <div className="bottom-3 mt-8 w-full gap-2">
      <div className="flex h-16 gap-2">
        {" "}
        {/* Fix height agar sama seperti flux */}
        <Button
          onClick={onSkip}
          disabled={isLoading}
          className="flex h-full w-full flex-1 flex-col items-center justify-center gap-0   bg-amber-200/60 py-1.5 text-base font-bold text-amber-500 hover:bg-amber-200/80 hover:opacity-80 dark:bg-amber-300 dark:text-amber-900 rounded-2xl"
        >
          <HugeiconsIcon
            icon={NextIcon}
            className="m-auto mb-0 size-5 fill-amber-500"
          />
          <span className="font-bold">Lewati</span>
        </Button>
        <Button
          onClick={onNext}
          disabled={isLoading}
          className="flex h-full w-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-primary py-1 text-base font-bold text-primary-foreground hover:bg-primary/90"
        >
          <HugeiconsIcon
            icon={Megaphone03FreeIcons}
            className="m-auto mb-0 size-5 fill-primary-foreground"
          />
          <span>Berikutnya</span>
        </Button>
      </div>
    </div>
  )
}
