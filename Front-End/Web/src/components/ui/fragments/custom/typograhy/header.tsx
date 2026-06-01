import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

type compoenentProp = {
  Title: string
  Deskrpsi: string
  Icon: IconSvgElement
}

const HeaderDashboard = ({ Icon, Title, Deskrpsi }: compoenentProp) => {
  return (
    <div className="flex flex-row items-center gap-5 md:w-fit">
      <div className="flex aspect-square size-11 items-center justify-center rounded-md bg-primary p-2.5 text-white">
        <HugeiconsIcon
          icon={Icon}
          className="size-full  text-primary-foreground"
        />
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
