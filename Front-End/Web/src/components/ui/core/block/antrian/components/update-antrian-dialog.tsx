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
import { useAntrianUpdateForm } from "../hooks/use-antrian-mutation"
import AntrianUpdateForm from "./antrian-update-form"
import type { UpdateAntrianSchema } from "../types/antrian-type"

interface UpdateAntrianDialogProps {
  id: number
  nomorAntrian: string
  defaultValues: UpdateAntrianSchema
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdateAntrianDialog({
  id,
  nomorAntrian,
  defaultValues,
  open,
  onOpenChange,
}: UpdateAntrianDialogProps) {
  const isMobile = useIsMobile()

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const form = useAntrianUpdateForm({
    antrianId: id,
    defaultValues,
    onSuccessCallback: handleClose,
  })

  React.useEffect(() => {
    if (open) form.reset()
  }, [open, id, defaultValues, form])

  const ActionButtons = () => (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <div className="flex w-full justify-end gap-3 pt-2">
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
            form="antrian-update-form"
            disabled={isSubmitting}
            className="w-fit"
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
              Perbarui Antrian {nomorAntrian}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Ubah data tujuan atau status antrian pasien.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <AntrianUpdateForm form={form} />
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
            Perbarui Antrian{" "}
            <span className="text-primary">{nomorAntrian}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Ubah data poli tujuan, tanggal, status, metode pembayaran
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-2 pt-7">
          <AntrianUpdateForm form={form} />
        </div>
        <DialogFooter className="shrink-0 border-t bg-background p-6">
          <ActionButtons />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
