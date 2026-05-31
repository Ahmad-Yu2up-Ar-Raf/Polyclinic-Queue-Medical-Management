import * as React from "react"
import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/fragments/shadcn-ui/dialog"
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

interface UpdatePasienDialogProps {
  id: number
  defaultValues: PasienSchema
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdatePasienDialog({
  id,
  defaultValues,
  open,
  onOpenChange,
}: UpdatePasienDialogProps) {
  const isMobile = useIsMobile()

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const form = usePasienForm({
    pasienId: id,
    defaultValues,
    onSuccessCallback: handleClose,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-muted-foreground capitalize">
            Perbarui Pasien
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Ubah rincian informasi data pasien di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <PasienForm form={form}>
          <DialogFooter>
            <ActionButtons />
          </DialogFooter>
        </PasienForm>
      </DialogContent>
    </Dialog>
  )
}
