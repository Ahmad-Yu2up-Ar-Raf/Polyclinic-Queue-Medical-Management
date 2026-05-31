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
      <FieldGroup className="gap-4">
        <form.AppField name="nama">
          {(field) => (
            <field.Input
              LeftIcon={AmbulanceIcon}
              type="text"
              placeholder="Nama"
            />
          )}
        </form.AppField>

        <form.AppField name="ruangan">
          {(field) => (
            <field.Input
              LeftIcon={DoorOpen}
              type="text"
              placeholder="Ruangan"
            />
          )}
        </form.AppField>
      </FieldGroup>

      {/* Render children (Action Buttons) di bagian bawah form */}
      {children}
    </form>
  )
}
