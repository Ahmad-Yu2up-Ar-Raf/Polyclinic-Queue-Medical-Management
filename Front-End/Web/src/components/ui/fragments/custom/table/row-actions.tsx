// resources/js/components/tahun-ajar/RowActions.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/fragments/shadcn-ui/dropdown-menu"
import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { Ellipsis } from "@hugeicons/core-free-icons"

interface RowActionsProps {
  onEdit: () => void
  onDelete: () => void
  
  Icon?: IconSvgElement
}

export function RowActions({
  onEdit,
  onDelete,
  Icon = Ellipsis,
}: RowActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="sticky right-2">
        <Button
          aria-label="Open menu"
          variant="ghost"
          className="sticky right-2 flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <HugeiconsIcon icon={Icon} className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          Delete
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
