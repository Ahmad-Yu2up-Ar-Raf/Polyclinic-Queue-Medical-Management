import React from "react"
import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { DokterFormReturnType } from "@/components/ui/core/block/dokter/hooks/use-dokter-mutation"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/clien"
import {
  UserIcon,
  Mail01Icon,
  Hospital01Icon,
  Calendar01Icon,
 
  MaleSymbolIcon,
  FemaleSymbolIcon,
  TextIcon,
  Image01Icon,
  Tick01Icon,
  Cancel01Icon,
  Stethoscope,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type {
  ComboboxOption,
  Poli,
  Jadwal,
} from "@/components/ui/core/block/dokter/types/dokter-type"

interface DokterFormProps {
  form: DokterFormReturnType
  children?: React.ReactNode
}

export default function DokterForm({ form, children }: DokterFormProps) {
  // 1. Fetch Data Poli untuk Select Single
  const { data: poliOptions = [] } = useQuery({
    queryKey: ["polis", "select"],
    queryFn: async () => {
      const res = await api.get("polis/select").json<{ data: Poli[] }>()
      return res.data.map((poli) => ({
        label: poli.nama,
        value: poli.id,
      })) as ComboboxOption[]
    },
  })

  // 2. Fetch Data Jadwal untuk Select Multiple
  const { data: jadwalOptions = [] } = useQuery({
    queryKey: ["jadwal", "select"],
    queryFn: async () => {
      // Pastikan ada endpoint GET /jadwal/select di backend
      const res = await api.get("jadwal/select").json<{ data: Jadwal[] }>()
      return res.data.map((jadwal) => ({
        label: `${jadwal.hari}, ${jadwal.jam_mulai.slice(0, 5)} - ${jadwal.jam_selesai.slice(0, 5)}`,
        value: jadwal.id,
      })) as ComboboxOption[]
    },
  })

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
        <section className="mb-8 space-y-10 border-b px-4 py-10 sm:px-10">
          <FieldGroup>
            <form.AppField name="nama">
              {(field) => (
                <field.Input
                  label="Nama Dokter"
                  LeftIcon={UserIcon}
                  type="text"
                  placeholder="Masukkan nama dokter (e.g. dr. Andi, Sp.PD)"
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldGroup>
            <form.AppField name="email">
              {(field) => (
                <field.Input
                  label="Alamat Email"
                  LeftIcon={Mail01Icon}
                  type="email"
                  placeholder="Masukkan email aktif"
                  iconClassName="text-amber-500"
                  inputClassName="text-amber-600 font-medium focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
                  isFocusClassName="border-b-amber-500 bg-amber-500/10"
                  isValidClassName="border-b-amber-500 bg-amber-500/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* COMBOBOX SINGLE SELECT - POLI */}
          <FieldGroup>
            <form.AppField name="poli_id">
              {(field) => (
                <field.Combobox
                  label="Poli Penempatan"
                  LeftIcon={Hospital01Icon}
                  placeholder="Cari dan pilih poli..."
                  options={poliOptions}
                  multiple={false}
                  iconClassName="text-emerald-500"
                  isFocusClassName="border-b-emerald-500 bg-emerald-500/10"
                  isValidClassName="border-b-emerald-500 bg-emerald-500/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* COMBOBOX MULTIPLE SELECT - JADWAL */}
          <FieldGroup>
            <form.AppField name="jadwal_ids">
              {(field) => (
                <field.Combobox
                  label="Jadwal Praktik"
                  LeftIcon={Calendar01Icon}
                  placeholder="Pilih jadwal praktik dokter (Bisa lebih dari 1)"
                  options={jadwalOptions}
                  multiple={true}
                  iconClassName="text-indigo-500"
                  isFocusClassName="border-b-indigo-500 bg-indigo-500/10"
                  isValidClassName="border-b-indigo-500 bg-indigo-500/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldGroup>
            <form.AppField name="spesialisasi">
              {(field) => (
                <field.Input
                  label="Spesialisasi (Opsional)"
                  LeftIcon={Stethoscope}
                  type="text"
                  placeholder="Contoh: Spesialis Anak"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* RADIO KELAMIN */}
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
                      value: "nonaktif",
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

        {/* SECTION TAMBAHAN */}
        <section className="mt-1 space-y-10 px-4 text-lg text-muted-foreground capitalize sm:px-9">
          <header className="space-y-3">
            <h1 className="text-lg font-semibold">Informasi Tambahan</h1>
            <p className="text-sm text-muted-foreground">
              Field opsional yang tidak wajib diisi
            </p>
          </header>

          <FieldGroup>
            <form.AppField name="deskripsi">
              {(field) => (
                <field.TextArea
                  label="Deskripsi / Biografi"
                  LeftIcon={TextIcon}
                  placeholder="Tulis deskripsi singkat tentang dokter"
                />
              )}
            </form.AppField>
          </FieldGroup>

          {/* Untuk Foto: Jika form butuh file input nanti bisa ditambahkan custom field. */}
        </section>

        {children}
      </main>
    </form>
  )
}
