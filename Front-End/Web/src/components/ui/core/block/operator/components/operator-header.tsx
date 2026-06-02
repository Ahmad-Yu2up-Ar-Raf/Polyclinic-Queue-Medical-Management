import { useEffect, useState } from "react"

import type { Poli } from "@/components/ui/core/block/poli/types/poli-type"
import { HugeiconsIcon } from "@hugeicons/react"
import { HospitalLocationIcon } from "@hugeicons/core-free-icons"

export const OperatorHeader = ({ poli }: { poli: Poli }) => {
  const [time, setTime] = useState({ jam: "--:--", tanggal: "-- ---- ----" })

  useEffect(() => {
    const updateWaktu = () => {
      const sekarang = new Date()
      setTime({
        jam: sekarang
          .toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(".", ":"),
        tanggal: sekarang.toLocaleDateString("id-ID", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      })
    }

    updateWaktu() // Init
    const interval = setInterval(updateWaktu, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex w-full flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex flex-row items-center gap-5 md:w-fit">
       <div className="flex aspect-square size-14 items-center justify-center    border rounded-full p-2.5 text-white">
        <HugeiconsIcon
          icon={HospitalLocationIcon}
          className="size-full  text-primary "
        />
      </div>
        <div>
          <h1 className="w-fit text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {poli.nama}
          </h1>
          <p className="w-fit text-sm text-neutral-500">
            {" "}
            Lokasi Ruangan:{" "}
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              {poli.ruangan}
            </span>
          </p>
        </div>
      </div>

      <div className="hidden text-right md:block">
        <div className="text-3xl font-black tracking-tight text-primary">
          {time.jam}
        </div>
        <div className="mt-1 text-lg font-bold tracking-wider text-muted-foreground uppercase">
          {time.tanggal}
        </div>
      </div>
    </div>
  )
}
