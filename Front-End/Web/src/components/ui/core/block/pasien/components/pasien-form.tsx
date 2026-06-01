import React from "react"
import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { PasienFormReturnType } from "../hooks/use-pasien-mutation"
import {
  UserIcon,
  Calendar01Icon,
  PassportIcon,
  MaleSymbolIcon,
  FemaleSymbolIcon,
  Location01Icon,
  CallIcon,
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
      className="flex flex-col gap-4 overflow-y-scroll px-0 pt-6 md:overflow-y-clip md:pt-0"
    >
      <main className="mb-6 space-y-6">
        <section className="mb-12 space-y-13 border-b px-4 py-10 sm:px-10">
          {/* FIELD: NAMA */}
          <FieldGroup>
            <form.AppField name="nama">
              {(field) => (
                <field.Input
                  label="Nama Lengkap"
                  LeftIcon={UserIcon}
                  type="text"
                  placeholder="Masukkan nama sesuai KTP (e.g. John Doe)"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* FIELD: TANGGAL LAHIR */}
          <FieldGroup>
            <form.AppField name="tanggal_lahir">
              {(field) => (
                <field.DateInput
                  label="Tanggal Lahir"
                  LeftIcon={Calendar01Icon}
                  captionLayout="dropdown"
                  placeholder="Pilih tanggal lahir pasien"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* FIELD: NIK */}
          <FieldGroup>
            <form.AppField name="nik">
              {(field) => (
                <field.Input
                  label="Nomor Induk Kependudukan (NIK)"
                  LeftIcon={PassportIcon}
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan 16 digit angka NIK KTP"
                  maxLength={16}
                  iconClassName="text-amber-500"
                  inputClassName="text-amber-600 font-medium focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
                  isFocusClassName="border-b-amber-500 bg-amber-500/10 focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
                  isValidClassName="border-b-amber-500 bg-amber-500/10 focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
                  isInvalidClassName="border-b-destructive bg-destructive/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* FIELD: NOMOR HP */}
          <FieldGroup>
            <form.AppField name="no_hp">
              {(field) => (
                <field.Input
                  label="Nomor Handphone aktif"
                  LeftIcon={CallIcon}
                  type="text"
                  inputMode="numeric"
                  placeholder="Contoh format: 081234567890"
                  maxLength={13}
                  iconClassName="text-violet-500"
                  inputClassName="text-violet-600 font-medium focus-visible:text-violet-500 focus-visible:placeholder:text-violet-500"
                  isFocusClassName="border-b-violet-500 bg-violet-500/10 focus-visible:text-violet-500 focus-visible:placeholder:text-violet-500"
                  isValidClassName="border-b-violet-500 bg-violet-500/10 focus-visible:text-violet-500 focus-visible:placeholder:text-violet-500"
                  isInvalidClassName="border-b-destructive bg-destructive/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* FIELD: RADIO GROUP JENIS KELAMIN */}
          <FieldGroup className="">
            <form.AppField name="jenis_kelamin">
              {(field) => (
                <field.RadioGroup
                  label="Jenis Kelamin"
                  containerClassName="h-14"
                  options={[
                    {
                      label: "Pria",
                      value: "pria",
                      icon: <HugeiconsIcon icon={MaleSymbolIcon} />,
                      activeContainerClass: "border-blue-500 bg-blue-500/5",
                      activeTextClass: "font-bold text-blue-500",
                      activeIconClass: "text-blue-500",
                      activeRadioClass:
                        "border-blue-500 text-blue-500 [&_span[data-state=checked]]:text-blue-500 data-checked:border-blue-500 aria-invalid:aria-checked:border-blue-500 data-checked:bg-blue-500 data-checked:text-blue-500-foreground dark:data-checked:bg-blue-500",
                    },
                    {
                      label: "Wanita",
                      value: "wanita",
                      icon: <HugeiconsIcon icon={FemaleSymbolIcon} />,
                      activeContainerClass: "border-pink-500 bg-pink-500/5",
                      activeTextClass: "font-bold text-pink-500",
                      activeIconClass: "text-pink-500",
                      activeRadioClass:
                        "border-pink-500 text-pink-500 [&_span[data-state=checked]]:text-pink-500 data-checked:border-pink-500 aria-invalid:aria-checked:border-pink-500 data-checked:bg-pink-500 data-checked:text-pink-500-foreground dark:data-checked:bg-pink-500",
                    },
                  ]}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </section>

        {/* SECTION OPTIONAL: ALAMAT */}
        <section className="mt-1 space-y-10 px-4 text-lg text-muted-foreground capitalize sm:px-9">
          <header className="space-y-3">
            <h1 className="text-lg font-semibold">Informasi Tambahan</h1>
            <p className="text-sm text-muted-foreground">
              Field opsional yang tidak wajib diisi
            </p>
          </header>

          <FieldGroup>
            <form.AppField name="alamat">
              {(field) => (
                <field.TextArea
                  label="Alamat Rumah Domisili" // 🎯 Berikan properti label eksplisit jika komponen menuntutnya
                  LeftIcon={Location01Icon}
                  placeholder="Tulis alamat rumah lengkap (Nama jalan, nomor rumah, RT/RW, kecamatan/kelurahan)"
                  iconClassName="text-emerald-500"
                  inputClassName="text-emerald-600 font-medium focus-visible:text-emerald-500 focus-visible:placeholder:text-emerald-500"
                  isFocusClassName="border-b-emerald-500 bg-emerald-500/10 focus-visible:text-emerald-500 focus-visible:placeholder:text-emerald-500"
                  isValidClassName="border-b-emerald-500 bg-emerald-500/10 focus-visible:text-emerald-500 focus-visible:placeholder:text-emerald-500"
                  isInvalidClassName="border-b-destructive bg-destructive/10"
                />
              )}
            </form.AppField>
          </FieldGroup>
        </section>

        {children}
      </main>
    </form>
  )
}
