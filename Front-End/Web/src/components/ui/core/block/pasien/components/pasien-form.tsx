import React from "react"
import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { PasienFormReturnType } from "../hooks/use-pasien-mutation"
import {
  UserIcon,
  Calendar01Icon,
  PassportIcon,
  UserCircleIcon,
  Location01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

interface PasienFormProps {
  form: PasienFormReturnType
  children?: React.ReactNode
}

export default function PasienForm({ form, children }: PasienFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <FieldGroup className="grid grid-cols-2 gap-4">
        <form.AppField name="nama">
          {(field) => (
            <field.Input
              LeftIcon={UserIcon}
              type="text"
              placeholder="Nama Lengkap"
              className="[&_input]:pl-11"
            />
          )}
        </form.AppField>

        <form.AppField name="tanggal_lahir">
          {(field) => (
            <field.DateInput
              LeftIcon={Calendar01Icon}
              placeholder="Tanggal Lahir"
              className="[&_button]:pl-11"
            />
          )}
        </form.AppField>
      </FieldGroup>

      <FieldGroup>
        <form.AppField name="nik">
          {(field) => (
            <field.Input
              LeftIcon={PassportIcon}
              type="text"
              
            //   inputMode="numeric"
              placeholder="NIK"
              className="[&_input]:pl-11"
            //   maxLength={16}
            />
          )}
        </form.AppField>
      </FieldGroup>

      <FieldGroup className="relative">
        <label className="text-sm font-semibold text-muted-foreground">
          Jenis Kelamin
        </label>
        <form.AppField name="jenis_kelamin">
          {(field) => (
            <field.RadioGroup
              containerClassName="flex gap-4 mt-2"
              options={[
                {
                  label: "Pria",
                  value: "Pria",
                  icon: (
                    <HugeiconsIcon
                      icon={UserIcon}
                      className="fill-blue-500 text-blue-500"
                    />
                  ),
                },
                {
                  label: "Wanita",
                  value: "Wanita",
                  icon: (
                    <HugeiconsIcon
                      icon={UserCircleIcon}
                      className="fill-pink-500 text-pink-500"
                    />
                  ),
                },
              ]}
            />
          )}
        </form.AppField>
      </FieldGroup>

      <div className="pt-2">
        <h1 className="text-base font-semibold text-muted-foreground">
          Detail Tambahan
        </h1>
        <p className="text-xs text-neutral-500">
          Informasi opsional untuk melengkapi data pasien
        </p>
      </div>

      <FieldGroup>
        <form.AppField name="alamat">
          {(field) => (
            <field.TextArea
              LeftIcon={Location01Icon}
              placeholder="Alamat"
              rows={3}
              className="text-amber-500"
            />
          )}
        </form.AppField>
      </FieldGroup>

      {children}
    </form>
  )
}
