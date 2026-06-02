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
  DrawerFooter,
} from "@/components/ui/fragments/shadcn-ui/drawer"

import { useIsMobile } from "@/hooks/use-mobile"
import { usePasienForm } from "../hooks/use-pasien-mutation"
import PasienForm from "./pasien-form"
import type { PasienSchema } from "../types/pasien-type"

interface UpdatePasienSheetProps {
  id: number
  defaultValues: PasienSchema
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccessCallback?: () => void
}

export default function UpdatePasienSheet({
  id,
  defaultValues,
  open,
  onOpenChange,
  onSuccessCallback,
}: UpdatePasienSheetProps) {
  const isMobile = useIsMobile()

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const form = usePasienForm({
    pasienId: id,
    defaultValues,

    onSuccessCallback,
  })

  // Sinkronisasi data ketika defaultValues berubah saat dialog dibuka
  React.useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [open, id])

  const ActionButtons = () => (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <div className="flex w-full justify-end gap-3 pt-4">
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
            Perbarui
          </Button>
        </div>
      )}
    </form.Subscribe>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="flex flex-col">
          <DrawerHeader className="border-b p-4 text-left">
            <DrawerTitle className="text-lg font-semibold text-muted-foreground capitalize">
              Perbarui Pasien
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Ubah rincian informasi data pasien di bawah ini.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-4">
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col gap-0 overflow-y-scroll">
        <SheetHeader className="top-0 z-30 space-y-1 border-b bg-background p-6 text-left sm:px-9">
          <SheetTitle className="text-lg font-semibold text-muted-foreground capitalize">
            Perbarui{" "}
            <span className="font-semibold text-primary">
              {defaultValues?.nama}
            </span>
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Ubah rincian informasi data pasien di bawah ini.
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
