import * as React from "react"
import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/fragments/shadcn-ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/fragments/shadcn-ui/drawer"

import { useIsMobile } from "@/hooks/use-mobile"
import { usePasienForm } from "../hooks/use-pasien-mutation"
import PasienForm from "./pasien-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus } from "@hugeicons/core-free-icons"

interface CreatePasienProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: boolean
}

export default function CreatePasienSheet({
  open: externalOpen,
  onOpenChange: setExternalOpen,
  trigger = true,
}: CreatePasienProps) {
  const isMobile = useIsMobile()
  const [internalOpen, setInternalOpen] = React.useState(false)

  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = setExternalOpen || setInternalOpen

  const handleClose = () => {
    form.reset()
    setOpen(false)
  }

  const form = usePasienForm({
    onSuccessCallback: handleClose,
  })

  const ActionButtons = () => (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <div className="flex w-full justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-fit"
          >
            Batalkan
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-fit">
            {isSubmitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </div>
      )}
    </form.Subscribe>
  )

  const TriggerButton = trigger ? (
    <Button className="w-fit text-sm">
      <HugeiconsIcon icon={Plus} className="mr-2 h-4 w-4" />
      Tambah Pasien
    </Button>
  ) : null

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {trigger && <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>}
        <DrawerContent className="flex flex-col">
          <DrawerHeader className="border-b p-4 text-left">
            <DrawerTitle className="text-lg font-semibold text-muted-foreground capitalize">
              Tambah Pasien
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Isi rincian data pasien baru di bawah ini.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <PasienForm form={form}>
              <DrawerFooter className="px-0">
                <ActionButtons />
              </DrawerFooter>
            </PasienForm>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {trigger && (
        <SheetTrigger asChild>
          <Button className="w-fit text-sm">
            <HugeiconsIcon icon={Plus} className="mr-3" />
            Tambahkan Baru
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="flex flex-col gap-0 overflow-y-scroll">
        <SheetHeader className="top-0 z-30 space-y-1 border-b bg-background p-6 text-left sm:px-9">
          <SheetTitle className="text-lg font-semibold text-muted-foreground capitalize">
            Tambah Pasien
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Isi rincian data pasien baru di bawah ini.
          </SheetDescription>
        </SheetHeader>
        <PasienForm form={form}>
          <SheetFooter className="sticky bottom-0 z-50 flex w-full flex-row justify-end gap-3 border-t bg-background px-8 py-4 pb-6 sm:space-x-0">
            <ActionButtons />
          </SheetFooter>
        </PasienForm>
      </SheetContent>
    </Sheet>
  )
}
