import { useState } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import { QueueItemCard } from "./components/queue-item-card"
import { useDebounce } from "@/hooks/use-debounce"
import { FetchOperatorPoli } from "./hooks/use-operator-query"
import { useOperatorActionMutation } from "./hooks/use-operator-mutation"

import { OperatorHeader } from "./components/operator-header"
import { ActiveQueueCard } from "./components/active-queue-card"
import { QueueActions } from "./components/queue-actions"
import { QueueListSection } from "./components/queue-list-section"

import { Search01FreeIcons } from "@hugeicons/core-free-icons"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"

export default function OperatorBlock({ id }: { id: string }) {
  const [searchInput, setSearchInput] = useState("")
  const debouncedSearch = useDebounce(searchInput, 500)

  const { data, isLoading, isFetching } = FetchOperatorPoli(debouncedSearch, id)
  const { mutate: mutateAction, isPending } = useOperatorActionMutation(id)

  const Data = data?.data
  const poli = Data?.poli

  const handleNext = () => mutateAction("selesai")
  const handleSkip = () => mutateAction("dilewati")

  const antrians_berjalan = Data?.antrian_menunggu ?? []
  const antrians_selesai = Data?.antrian_selesai ?? []
  const antrians_dilewati = Data?.antrian_dilewati ?? []
  const antrian_berikutnya = Data?.antrian_berikutnya

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-20">
        <Spinner className="size-8 text-primary" />
      </div>
    )
  }

  if (!poli) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="text-neutral-500">
          Data poli tidak ditemukan atau gagal dimuat.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl px-10 py-5">
      <OperatorHeader poli={poli} />
      <hr className="border-border/40" />

      <div className="grid gap-12 md:gap-20 lg:grid-cols-2">
        {/* KOLOM KIRI */}
        <div className="mx-auto w-full max-w-lg pt-0">
          <div className="sticky top-40 space-y-7">
            <ActiveQueueCard antrian={Data?.antrian_dipanggil ?? null} />
            {Data?.antrian_dipanggil && (
              <QueueActions
                onNext={handleNext}
                onSkip={handleSkip}
                isLoading={isPending}
              />
            )}
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="space-y-10 md:space-y-5">
          <div className="top-0 z-10 w-full max-w-xl bg-background px-2 py-3 md:sticky">
            <div className="relative">
              <Input
                leftIcon={Search01FreeIcons}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari pasien, dokter, atau antrian..."
              />
              {isFetching && (
                <div className="absolute top-1/2 right-3 -translate-y-1/2">
                  <Spinner className="size-4 text-primary" />
                </div>
              )}
            </div>
          </div>

          <div
            className={`transition-opacity duration-200 ${
              isFetching ? "pointer-events-none opacity-50" : "opacity-100"
            }`}
          >
            {/* Seksie ini otomatis tersembunyi total jika data yang dicari tidak sesuai */}
            {antrian_berikutnya && (
              <div className="mb-5 max-w-xl space-y-10 rounded-xl p-3">
                <div className="border-b border-border pb-5">
                  <h3 className="mb-1 text-lg font-bold text-neutral-800 dark:text-neutral-200">
                  Antrian Berikunya
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Antrian yang akan di panggil
                  </p>
                </div>
                <div className="space-y-7">
                  <QueueItemCard
                    key={"antrian-berikutnya"}
                    antrian={antrian_berikutnya}
                    iconColorClass="text-purple-500 fill-purple-500"
                  />
                </div>
              </div>
            )}

            <QueueListSection
              title="Antrian Berjalan"
              description="Daftar pasien berikutnya"
              items={antrians_berjalan}
              iconColorClass="text-amber-500 fill-amber-500"
            />

            <QueueListSection
              title="Antrian Selesai"
              description="Pasien yang sudah berobat"
              items={antrians_selesai}
              iconColorClass="text-primary fill-primary"
            />

            <QueueListSection
              title="Pasien Dilewati"
              description="Pasien yang dilewati"
              items={antrians_dilewati}
              iconColorClass="text-muted-foreground fill-muted-foreground"
            />

            {/* Global Empty State */}
            {antrians_berjalan.length === 0 &&
              antrians_selesai.length === 0 &&
              antrians_dilewati.length === 0 &&
              !antrian_berikutnya && (
                <div className="max-w-xl py-10 text-center text-neutral-400">
                  Tidak ada data antrian yang cocok dengan pencarian Anda.
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
