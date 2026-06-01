import React from "react"

import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { PoliFormReturnType } from "../hooks/use-poli-mutation"
import { AmbulanceIcon, DoorOpen } from "@hugeicons/core-free-icons"

interface PoliFormProps {
  form: PoliFormReturnType
  children?: React.ReactNode // Untuk menyisipkan Button dari luar (Dialog/Drawer)
}

export default function PoliForm({ form, children }: PoliFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <FieldGroup className="gap-8">
        <form.AppField name="nama">
          {(field) => (
            <field.Input
              label="Nama Poli"
              LeftIcon={AmbulanceIcon}
              type="text"
              placeholder="Poli Anak"
            />
          )}
        </form.AppField>

        <form.AppField name="ruangan">
          {(field) => (
            <field.Input
              label="Ruangan"
              LeftIcon={DoorOpen}
              type="text"
              placeholder="123-230"
              iconClassName="text-amber-500"
              inputClassName="text-amber-600 font-medium focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
              isFocusClassName="border-b-amber-500 bg-amber-500/10 focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
              isValidClassName="border-b-amber-500 bg-amber-500/10 focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
              isInvalidClassName="border-b-destructive bg-destructive/10"
            />
          )}
        </form.AppField>
      </FieldGroup>

      {/* Render children (Action Buttons) di bagian bawah form */}
      {children}
    </form>
  )
}
