import React from "react"
import { FieldGroup } from "@/components/ui/fragments/shadcn-ui/field"
import type { AntrianUpdateFormReturnType } from "../hooks/use-antrian-mutation"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/clien"
import {
  HospitalLocationIcon,
  Calendar01Icon,
  Tick01Icon,
  Cancel01Icon,
  Clock01Icon,
  Megaphone,
  SkipForward,
  Megaphone02FreeIcons,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ComboboxOption, Poli } from "../types/antrian-type"
import { PaymentMethodRadioGroup } from "./payment-method-radio-group"

interface AntrianUpdateFormProps {
  form: AntrianUpdateFormReturnType
  children?: React.ReactNode
}

export default function AntrianUpdateForm({
  form,
  children,
}: AntrianUpdateFormProps) {
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
      id="antrian-update-form"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4 overflow-y-scroll px-0 pt-6 md:overflow-y-clip md:pt-0"
    >
      <main className="mb-6 space-y-8">
        <section className="space-y-6 border-b px-4 pb-8 sm:px-6">
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
                />
              )}
            </form.AppField>
          </FieldGroup>
        </section>

        <section className="space-y-6 border-b px-4 pb-8 sm:px-6">
          <FieldGroup>
            <form.AppField name="status">
              {(field) => (
                <field.RadioGroup
                  label="Status Antrian"
                  containerClassName="h-fit sm:grid    "
                  options={[
                    {
                      label: "Menunggu",
                      value: "menunggu",
                      icon: <HugeiconsIcon icon={Clock01Icon} />,
                      activeContainerClass: "border-blue-500 bg-blue-500/5",
                      activeTextClass: "font-bold text-blue-500",
                      activeIconClass: "text-blue-500",
                      activeRadioClass:
                        "border-blue-500 text-blue-500 data-checked:bg-blue-500",
                    },
                    {
                      label: "Dipanggil",
                      value: "dipanggil",
                      icon: <HugeiconsIcon icon={Megaphone02FreeIcons} />, // Using Cancel as placeholder for Megaphone or similar
                      activeContainerClass: "border-amber-500 bg-amber-500/5",
                      activeTextClass: "font-bold text-amber-500",
                      activeIconClass: "text-amber-500",
                      activeRadioClass:
                        "border-amber-500 text-amber-500 data-checked:bg-amber-500",
                    },

                    {
                      label: "Selesai",
                      value: "selesai",
                      icon: <HugeiconsIcon icon={Tick01Icon} />,
                      activeContainerClass:
                        "border-emerald-500 bg-emerald-500/5",
                      activeTextClass: "font-bold text-emerald-500",
                      activeIconClass: "text-emerald-500",
                      activeRadioClass:
                        "border-emerald-500 text-emerald-500 data-checked:bg-emerald-500",
                    },
                    {
                      label: "Lewati",
                      value: "dilewati",
                      icon: <HugeiconsIcon icon={SkipForward} />, // Using Cancel as placeholder for Megaphone or similar
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
        </section>

        <section className="space-y-6 px-4 sm:px-6">
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
