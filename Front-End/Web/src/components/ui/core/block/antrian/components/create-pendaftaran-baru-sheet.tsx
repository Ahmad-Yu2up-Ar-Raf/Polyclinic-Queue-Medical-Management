import * as React from "react"
import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
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
import { useAntrianBaruForm } from "../hooks/use-antrian-mutation"
import AntrianBaruForm from "./antrian-baru-form"

interface CreatePendaftaranBaruProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreatePendaftaranBaruSheet({
  open,
  onOpenChange,
}: CreatePendaftaranBaruProps) {
  const isMobile = useIsMobile()

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const form = useAntrianBaruForm({
    onSuccessCallback: handleClose,
  })

  React.useEffect(() => {
    if (open) form.reset()
  }, [open, form])

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
              Pendaftaran Pasien Baru
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Isi rincian data pasien baru dan tujuannya.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <AntrianBaruForm form={form} />
          </div>
          <DrawerFooter className="shrink-0 border-t px-4 py-4">
            <ActionButtons />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-[540px] flex-col gap-0 overflow-y-scroll sm:max-w-xl">
        <SheetHeader className="top-0 z-30 shrink-0 space-y-1 border-b bg-background p-6 text-left sm:px-9">
          <SheetTitle className="text-lg font-semibold text-muted-foreground capitalize">
            Biodata Pasien
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Isi data pasien baru secara lengkap sesuai KTP.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-0">
          <AntrianBaruForm form={form}>
            <SheetFooter className="sticky bottom-0 z-50 flex w-full flex-row justify-end gap-3 border-t bg-background px-8 py-4 pb-6 sm:space-x-0">
              <ActionButtons />
            </SheetFooter>
          </AntrianBaruForm>
        </div>
      </SheetContent>
    </Sheet>
  )
}
