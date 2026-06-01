import React from "react"
import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { DokterFormReturnType } from "@/components/ui/core/block/dokter/hooks/use-dokter-mutation"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/clien"
import { FormInput } from "@/components/ui/fragments/custom/form/form-input"
import { FormTextArea } from "@/components/ui/fragments/custom/form/form-textarea"
import { FormCombobox } from "@/components/ui/fragments/custom/form/form-combobox"
import { FormCheckboxGroup } from "@/components/ui/fragments/custom/form/form-checkbox-group"
import {
  UserIcon,
  Mail01Icon,
  HospitalLocationIcon,
  Calendar01Icon,
  MaleSymbolIcon,
  FemaleSymbolIcon,
  TextIcon,
  Image01Icon,
  Tick01Icon,
  Cancel01Icon,
  Stethoscope,
} from "@hugeicons/core-free-icons"
import type {
  Poli,
  Jadwal,
} from "@/components/ui/core/block/dokter/types/dokter-type"
import { HugeiconsIcon } from "@hugeicons/react"

interface DokterFormProps {
  form: DokterFormReturnType
  children?: React.ReactNode
}

export default function DokterForm({ form, children }: DokterFormProps) {
  // Fetch Poli Select
  const { data: poliOptions = [] } = useQuery({
    queryKey: ["polis", "select"],
    queryFn: async () => {
      const res = await api.get("polis/select").json<{ data: Poli[] }>()
      return res.data.map((poli) => ({ label: poli.nama, value: poli.id }))
    },
  })
  console.log(poliOptions)
  // Fetch Jadwal Select
  const { data: jadwalOptions = [] } = useQuery({
    queryKey: ["jadwal", "select"],
    queryFn: async () => {
      const res = await api.get("jadwal/select").json<{ data: Jadwal[] }>()
      return res.data.map((j) => ({
        label: `${j.hari} (${j.jam_mulai.substring(0, 5)} - ${j.jam_selesai.substring(0, 5)})`,
        value: j.id,
      }))
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <main className="flex-1 space-y-4 overflow-y-auto">
        <section className="space-y-6 px-4 py-10 sm:px-9">
          <FieldGroup>
            <form.AppField name="nama">
              {() => (
                <FormInput
                  label="Nama Lengkap"
                  placeholder="Masukkan nama dokter beserta gelar"
                  LeftIcon={UserIcon}
                />
              )}
            </form.AppField>

            <form.AppField name="email">
              {() => (
                <FormInput
                  label="Alamat Email"
                  type="email"
                  placeholder="contoh@poliklinik.com"
                  LeftIcon={Mail01Icon}
                />
              )}
            </form.AppField>

            <form.AppField name="spesialisasi">
              {() => (
                <FormInput
                  label="Spesialisasi"
                  placeholder="Contoh: Anak, Jantung, Bedah"
                  LeftIcon={Stethoscope}
                />
              )}
            </form.AppField>

            <form.AppField name="poli_id">
              {() => (
                <FormCombobox
                  label="Poliklinik"
                  placeholder="Pilih Poliklinik Tugas"
                  LeftIcon={HospitalLocationIcon}
                  options={poliOptions}
                />
              )}
            </form.AppField>
          </FieldGroup>
          <FieldGroup>
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
                        "border-blue-500 text-blue-500 data-checked:bg-blue-500",
                    },
                    {
                      label: "Wanita",
                      value: "wanita",
                      icon: <HugeiconsIcon icon={FemaleSymbolIcon} />,
                      activeContainerClass: "border-pink-500 bg-pink-500/5",
                      activeTextClass: "font-bold text-pink-500",
                      activeIconClass: "text-pink-500",
                      activeRadioClass:
                        "border-pink-500 text-pink-500 data-checked:bg-pink-500",
                    },
                  ]}
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* RADIO STATUS */}
          <FieldGroup>
            <form.AppField name="status">
              {(field) => (
                <field.RadioGroup
                  label="Status Dokter"
                  containerClassName="h-14"
                  options={[
                    {
                      label: "Aktif",
                      value: "aktif",
                      icon: <HugeiconsIcon icon={Tick01Icon} />,
                      activeContainerClass:
                        "border-emerald-500 bg-emerald-500/5",
                      activeTextClass: "font-bold text-emerald-500",
                      activeIconClass: "text-emerald-500",
                      activeRadioClass:
                        "border-emerald-500 text-emerald-500 data-checked:bg-emerald-500",
                    },
                    {
                      label: "Nonaktif",
                      value: "tidak aktif",
                      icon: <HugeiconsIcon icon={Cancel01Icon} />,
                      activeContainerClass:
                        "border-destructive bg-destructive/5",
                      activeTextClass: "font-bold text-destructive",
                      activeIconClass: "text-destructive",
                      activeRadioClass:
                        "border-destructive text-destructive data-checked:bg-destructive",
                    },
                  ]}
                />
              )}
            </form.AppField>
          </FieldGroup>
        </section>

        <section className="mb-10 space-y-4 px-4 sm:px-9">
          <header className="space-y-1">
            <h1 className="text-base font-semibold text-foreground">
              Jadwal Praktik
            </h1>
            <p className="text-xs text-muted-foreground">
              Pilih satu atau beberapa jadwal kerja dokter di poliklinik
            </p>
          </header>
          <form.AppField name="jadwal_ids">
            {() => <FormCheckboxGroup label="" options={jadwalOptions} />}
          </form.AppField>
        </section>

        <section className="space-y-12 px-4 sm:px-9">
          {/* <header className="space-y-1">
            <h1 className="text-base font-semibold text-foreground">
              Informasi Tambahan
            </h1>
          </header> */}
          <FieldGroup>
            <form.AppField name="deskripsi">
              {() => (
                <FormTextArea
                  label="Biografi / Deskripsi Singkat"
                  placeholder="Tulis biografi singkat dokter..."
                  LeftIcon={TextIcon}
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
