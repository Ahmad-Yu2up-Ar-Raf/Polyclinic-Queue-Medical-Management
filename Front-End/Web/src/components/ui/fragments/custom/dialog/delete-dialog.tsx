"use client"

import { Spinner } from "../../shadcn-ui/spinner"

import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/fragments/shadcn-ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/fragments/shadcn-ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Trash2 } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import React from "react"

interface DeleteDialogProps {
  id: number
  trigger?: boolean
  // Optional controlled props
  modal?: boolean
  className?: string
  children?: React.ReactNode
  handledeDelete: (id: number) => void
  processing?: boolean
  // Controlled props
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function DeleteDialog({
  id,
  trigger = true,
  open,
  processing = false,
  handledeDelete,
  onOpenChange,
  ...props
}: DeleteDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  // Use controlled state if props are provided, otherwise use internal state
  const isOpen = onOpenChange ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen
  const isDesktop = useIsMobile()

  if (isDesktop) {
    return (
      <Drawer modal={true} {...props} open={isOpen} onOpenChange={setIsOpen}>
        {trigger && <DrawerTrigger asChild>Delete</DrawerTrigger>}

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Apakah Anda benar-benar yakin?</DrawerTitle>
            <DrawerDescription>
              Aksi ini akan menghapus data anda secara permanen{" "}
              <span className="font-medium">Hapus </span>
              dari server kami
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="gap-2 sm:space-x-0">
            <DrawerClose asChild>
              <Button variant="outline" disabled={processing}>
                {" "}
                {processing && (
                  <Spinner
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Batalkan
              </Button>
            </DrawerClose>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={() => handledeDelete(id!)}
              disabled={processing}
            >
              {processing && (
                <Spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog {...props} modal={true} open={isOpen} onOpenChange={setIsOpen}>
      {trigger && (
        <DialogTrigger asChild>
          <HugeiconsIcon icon={Trash2} className="text-destructive" />
        </DialogTrigger>
      )}
      <DialogContent className="max-w-sm m-auto">
        <DialogHeader>
          <DialogTitle>Apakah Anda benar-benar yakin?</DialogTitle>
          <DialogDescription>
            Aksi ini akan menghapus data anda secara permanen{" "}
            <span className="font-medium">hapus</span>
            dari server kami.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline" disabled={processing}>
              {" "}
              {processing && (
                <Spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Batalkan
            </Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => handledeDelete(id!)}
            disabled={processing}
          >
            {processing && (
              <Spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
