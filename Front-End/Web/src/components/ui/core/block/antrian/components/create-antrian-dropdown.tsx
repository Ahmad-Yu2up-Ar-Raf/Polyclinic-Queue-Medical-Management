import * as React from "react"
import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/fragments/shadcn-ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus, UserAdd01Icon, UserIcon } from "@hugeicons/core-free-icons"

interface CreateAntrianDropdownProps {
  onSelectBaru: () => void
  onSelectLama: () => void
}

export function CreateAntrianDropdown({
  onSelectBaru,
  onSelectLama,
}: CreateAntrianDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-fit text-sm">
          <HugeiconsIcon icon={Plus} className="mr-2 size-4" />
          Tambah Antrian
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={onSelectBaru}
          className="cursor-pointer gap-3 py-3"
        >
          <HugeiconsIcon
            icon={UserAdd01Icon}
            className="size-4 text-muted-foreground"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Pendaftaran Baru</span>
            <span className="text-xs text-muted-foreground">
              Pasien belum terdaftar
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onSelectLama}
          className="cursor-pointer gap-3 py-3"
        >
          <HugeiconsIcon
            icon={UserIcon}
            className="size-4 text-muted-foreground"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Pendaftaran Lama</span>
            <span className="text-xs text-muted-foreground">
              Pasien sudah memiliki rekam medis
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
