"use client"

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
import PoliForm from "./poli-form"
import { useIsMobile } from "@/hooks/use-mobile"

import { usePoliForm } from "../hooks/use-poli-mutation"
import type { PoliSchema } from "../validations/poli-schema"

interface UpdatePoliProps {
  id: number | string | null
  defaultValues?: PoliSchema
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdatePoliDialog({
  id,
  defaultValues,
  open,
  onOpenChange,
}: UpdatePoliProps) {
  const isMobile = useIsMobile()

  const handleClose = React.useCallback(() => {
    form.reset()
    onOpenChange(false)
  }, [onOpenChange])

  const form = usePoliForm({
    poliId: id,
    defaultValues,
    onSuccessCallback: handleClose,
  })

  // Reset form ketika ID berubah agar form menampilkan data yang baru di-select
  React.useEffect(() => {
    if (open && defaultValues) {
      form.reset()
    }
  }, [open, id, defaultValues])

  // Guard clause: Jangan render form jika tidak ada ID yang dipilih
  if (!id) return null

  const ActionButtons = () => (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <div className="flex w-full justify-end gap-3 pt-4 sm:space-x-0">
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
            Simpan Perubahan
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
            <DrawerTitle className="text-xl">
              Perbarui{" "}
              <span className="font-semibold text-primary">
                {defaultValues?.nama}
              </span>
            </DrawerTitle>
            <DrawerDescription className="text-sm">
              Isi rincian data poli di bawah ini.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-4">
            <PoliForm form={form}>
              <DrawerFooter className="px-0">
                <ActionButtons />
              </DrawerFooter>
            </PoliForm>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Perbarui{" "}
            <span className="font-semibold text-primary">
              {defaultValues?.nama}
            </span>
          </DialogTitle>
          <DialogDescription>
            Isi rincian data poli baru di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <PoliForm form={form}>
          <DialogFooter>
            <ActionButtons />
          </DialogFooter>
        </PoliForm>
      </DialogContent>
    </Dialog>
  )
}
