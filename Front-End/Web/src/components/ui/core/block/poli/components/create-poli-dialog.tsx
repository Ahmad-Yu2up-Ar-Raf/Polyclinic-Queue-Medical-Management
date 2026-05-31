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
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/fragments/shadcn-ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/fragments/shadcn-ui/drawer"

import { useIsMobile } from "@/hooks/use-mobile"
import { usePoliForm } from "../hooks/use-poli-mutation"
import PoliForm from "./poli-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus } from "@hugeicons/core-free-icons"

interface CreatePoliProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: boolean // Menentukan apakah button trigger dirender dari dalam atau luar
}

export default function CreatePoliDialog({
  open: externalOpen,
  onOpenChange: setExternalOpen,
  trigger = true,
}: CreatePoliProps) {
  const isMobile = useIsMobile()
  const [internalOpen, setInternalOpen] = React.useState(false)

  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = setExternalOpen || setInternalOpen

  const handleClose = () => {
    form.reset()
    setOpen(false)
  }

  const form = usePoliForm({
    onSuccessCallback: handleClose,
  })

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
            Tambahkan
          </Button>
        </div>
      )}
    </form.Subscribe>
  )

  const TriggerButton = trigger ? (
    <Button className="w-fit text-sm">
      <HugeiconsIcon icon={Plus} className="mr-2 h-4 w-4" />
      Tambah Poli
    </Button>
  ) : null

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {trigger && <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>}
        <DrawerContent className="flex flex-col">
          <DrawerHeader className="border-b p-4 text-left">
            <DrawerTitle className="text-lg font-semibold text-muted-foreground capitalize">
              Tambah Poli
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Isi rincian data poli baru di bawah ini.
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
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{TriggerButton}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-muted-foreground capitalize">
            {" "}
            Tambah Poli
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
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
