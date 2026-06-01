import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

type compoenentProp = {
  Title: string
  Deskrpsi: string
  Icon: IconSvgElement
}

const HeaderDashboard = ({ Icon, Title, Deskrpsi }: compoenentProp) => {
  return (
    <div className="flex flex-row items-center gap-8 md:w-fit">
      <div className="flex aspect-square size-14 items-center justify-center rounded-md border border-border bg-background text-primary shadow-lg p-2.5">
        <HugeiconsIcon icon={Icon} className="size-full text-primary" />
      </div>
      <div>
        <h1 className="w-fit text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {Title}
        </h1>
        <p className="w-fit text-sm text-neutral-500">{Deskrpsi}</p>
      </div>
    </div>
  )
}

export default HeaderDashboard
