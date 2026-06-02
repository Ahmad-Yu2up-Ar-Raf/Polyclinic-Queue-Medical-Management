import React from "react"
import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { AntrianBaruFormReturnType } from "../hooks/use-antrian-mutation"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/clien"
import {
  UserIcon,
  Calendar01Icon,
  PassportIcon,
  MaleSymbolIcon,
  FemaleSymbolIcon,
  Location01Icon,
  CallIcon,
  HospitalLocationIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ComboboxOption, Poli } from "../types/antrian-type"
import { PaymentMethodRadioGroup } from "./payment-method-radio-group"

interface AntrianBaruFormProps {
  form: AntrianBaruFormReturnType
  children?: React.ReactNode
}

export default function AntrianBaruForm({
  form,
  children,
}: AntrianBaruFormProps) {
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4 overflow-y-scroll px-0 pt-6 md:overflow-y-clip md:pt-0"
    >
      <main className="mb-6 space-y-8">
        {/* SECTION: BIODATA PASIEN BARU */}
        <section className="space-y-15 px-4 py-7 pb-5 sm:px-8">
          <form.AppField name="nama">
            {(field) => (
              <field.Input
                label="Nama Lengkap"
                LeftIcon={UserIcon}
                type="text"
                placeholder="Masukkan nama sesuai KTP"
              />
            )}
          </form.AppField>

          <form.AppField name="tanggal_lahir">
            {(field) => (
              <field.DateInput
                label="Tanggal Lahir"
                LeftIcon={Calendar01Icon}
                placeholder="Pilih tanggal lahir pasien"
                captionLayout="dropdown"
                disableFuture={true} // 👈 Pasien tidak mungkin lahir di masa depan
              />
            )}
          </form.AppField>

          <FieldGroup>
            <form.AppField name="nik">
              {(field) => (
                <field.Input
                  label="Nomor Induk Kependudukan (NIK)"
                  LeftIcon={PassportIcon}
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan 16 digit angka NIK"
                  maxLength={16}
                  iconClassName="text-amber-500"
                  inputClassName="text-amber-600 font-medium focus-visible:text-amber-500 focus-visible:placeholder:text-amber-500"
                  isFocusClassName="border-b-amber-500 bg-amber-500/10"
                  isValidClassName="border-b-amber-500 bg-amber-500/10"
                  isInvalidClassName="border-b-destructive bg-destructive/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldGroup>
            <form.AppField name="no_hp">
              {(field) => (
                <field.Input
                  label="Nomor Handphone"
                  LeftIcon={CallIcon}
                  type="text"
                  inputMode="numeric"
                  placeholder="Contoh: 081234567890"
                  maxLength={13}
                  iconClassName="text-violet-500"
                  inputClassName="text-violet-600 font-medium focus-visible:text-violet-500 focus-visible:placeholder:text-violet-500"
                  isFocusClassName="border-b-violet-500 bg-violet-500/10"
                  isValidClassName="border-b-violet-500 bg-violet-500/10"
                  isInvalidClassName="border-b-destructive bg-destructive/10"
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

          <FieldGroup>
            <form.AppField name="alamat">
              {(field) => (
                <field.TextArea
                  label="Alamat Rumah Domisili"
                  LeftIcon={Location01Icon}
                  placeholder="Tulis alamat rumah lengkap"
                  iconClassName="text-emerald-500"
                  inputClassName="text-emerald-600 font-medium focus-visible:text-emerald-500 focus-visible:placeholder:text-emerald-500"
                  isFocusClassName="border-b-emerald-500 bg-emerald-500/10"
                  isValidClassName="border-b-emerald-500 bg-emerald-500/10"
                  isInvalidClassName="border-b-destructive bg-destructive/10"
                />
              )}
            </form.AppField>
          </FieldGroup>
        </section>

        {/* SECTION: DATA ANTRIAN */}
        <section className="space-y-11 px-4 pb-10 sm:px-8">
          <header className="mb-15 space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Data Antrian
            </h2>
            <p className="text-sm text-muted-foreground">
              Tentukan tujuan poliklinik dan jadwal kunjungan pasien.
            </p>
          </header>

          <FieldGroup>
            <form.AppField name="poli_id">
              {(field) => (
                <field.Combobox
                  label="Poli Tujuan"
                  LeftIcon={HospitalLocationIcon}
                  placeholder="Pilih poli tujuan"
                  options={poliOptions}
                  iconClassName="text-emerald-500"
                  isFocusClassName="border-b-emerald-500 bg-emerald-500/10"
                  isValidClassName="border-b-emerald-500 bg-emerald-500/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldGroup>
            <form.AppField name="jadwal_kunjungan">
              {(field) => (
                <field.DateInput
                  label="Tanggal Kunjungan"
                  LeftIcon={Calendar01Icon}
                  placeholder="Pilih tanggal kunjungan"
                  defaultMonthFallback={new Date()}
                  disablePast={true} // 👈 Tidak boleh daftar untuk tanggal yang sudah lewat
                />
              )}
            </form.AppField>
          </FieldGroup>
          <FieldGroup>
            <form.AppField name="metode_pembayaran">
              {() => <PaymentMethodRadioGroup label="Metode Pembayaran" />}
            </form.AppField>
          </FieldGroup>
        </section>

        {children}
      </main>
    </form>
  )
}
