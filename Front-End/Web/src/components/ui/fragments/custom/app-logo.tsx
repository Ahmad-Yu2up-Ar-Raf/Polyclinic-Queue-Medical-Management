import { cn } from "@/lib/utils"
import AppLogoIcon from "../svg/logo-app"

type componentProps = {
  className?: string
}

export default function AppLogo({ className }: componentProps) {
  return (
    <>
      <div
        className={cn(
          "flex aspect-square size-10 items-center justify-center rounded-md text-sidebar-primary-foreground",
          className
        )}
      >
        <AppLogoIcon className="size-full fill-current text-white dark:text-black" />
      </div>
      <div className="ml-3 grid flex-1 text-left text-2xl">
        <span className="mb-0.5 truncate leading-tight font-bold text-primary">
          LiveUp
        </span>
      </div>
    </>
  )
}
