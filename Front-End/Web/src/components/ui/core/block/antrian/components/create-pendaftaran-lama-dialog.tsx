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
import { useAntrianLamaForm } from "../hooks/use-antrian-mutation"
import AntrianLamaForm from "./antrian-lama-form"

interface CreatePendaftaranLamaProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreatePendaftaranLamaDialog({
  open,
  onOpenChange,
}: CreatePendaftaranLamaProps) {
  const isMobile = useIsMobile()

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const form = useAntrianLamaForm({
    onSuccessCallback: handleClose,
  })

  React.useEffect(() => {
    if (open) form.reset()
  }, [open, form])

  const ActionButtons = () => (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <div className="flex w-full justify-end gap-3 pt-0">
          <Button
            size={"lg"}
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-fit"
          >
            Batalkan
          </Button>
          <Button
            size={"lg"}
            type="submit"
            disabled={isSubmitting}
            className="w-fit"
            form="antrian-lama-form"
          >
            {isSubmitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </div>
      )}
    </form.Subscribe>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="flex h-[90vh] flex-col">
          <DrawerHeader className="shrink-0 border-b p-4 text-left">
            <DrawerTitle className="text-lg font-semibold text-muted-foreground capitalize">
              Pendaftaran Antrian Lama
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Pilih pasien terdaftar untuk dimasukkan ke antrian poliklinik.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <AntrianLamaForm form={form} />
          </div>
          <DrawerFooter className="shrink-0 border-t px-4 py-4">
            <ActionButtons />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[46em] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="shrink-0 border-b bg-background p-6 text-left">
          <DialogTitle className="text-lg font-semibold text-muted-foreground capitalize">
            Pendaftaran Antrian Lama
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Pilih pasien terdaftar untuk dimasukkan ke antrian poliklinik.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <AntrianLamaForm form={form} />
        </div>
        <DialogFooter className="shrink-0 border-t bg-background p-6">
          <ActionButtons />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
