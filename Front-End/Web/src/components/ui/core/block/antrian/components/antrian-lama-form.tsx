import React from "react"
import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { AntrianLamaFormReturnType } from "../hooks/use-antrian-mutation"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/clien"
import {
  HospitalLocationIcon,
  UserIcon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons"
import type { ComboboxOption, Poli, Pasien } from "../types/antrian-type"
import { PaymentMethodRadioGroup } from "./payment-method-radio-group"

interface AntrianLamaFormProps {
  form: AntrianLamaFormReturnType
  children?: React.ReactNode
}

export default function AntrianLamaForm({
  form,
  children,
}: AntrianLamaFormProps) {
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

  const { data: pasienOptions = [] } = useQuery({
    queryKey: ["pasien", "select"],
    queryFn: async () => {
      const res = await api.get("pasien").json<{ data: Pasien[] }>()
      return res.data.map((pasien) => ({
        label: `${pasien.nama} - ${pasien.nik}`,
        value: pasien.id,
      })) as ComboboxOption[]
    },
  })

  return (
    <form
      id="antrian-lama-form"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4 overflow-y-scroll px-0 pt-6 md:overflow-y-clip md:pt-0"
    >
      <main className="mb-6 space-y-8 py-10">
        <section className="space-y-10 px-4 pb-8 sm:px-6">
          <FieldGroup>
            <form.AppField name="pasien_id">
              {(field) => (
                <field.Combobox
                  label="Pilih Pasien Terdaftar"
                  LeftIcon={UserIcon}
                  placeholder="Cari nama atau NIK pasien..."
                  options={pasienOptions}
                  iconClassName="text-blue-500"
                  isFocusClassName="border-b-blue-500 bg-blue-500/10"
                  isValidClassName="border-b-blue-500 bg-blue-500/10"
                />
              )}
            </form.AppField>
          </FieldGroup>

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
                  disableFuture={false}
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
