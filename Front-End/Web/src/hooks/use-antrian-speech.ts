// @/hooks/use-antrian-speech.ts
import { useEffect, useRef } from "react"
import type { Dipanggil } from "@/components/ui/core/block/monitor/types/monitor-types"

export const useAntrianSpeech = (dipanggil: Dipanggil[]) => {
  // Gunakan useRef sebagai pengganti window.listAntrianAktif (Aman dari re-render)
  const activeIdsRef = useRef<number[]>([])

  useEffect(() => {
    if (!dipanggil || dipanggil.length === 0) {
      activeIdsRef.current = [] // Bersihkan memori jika kosong
      return
    }

    const currentServerIds = dipanggil.map((a) => a.id)

    // Filter antrian yang benar-benar baru
    const newAntrians = dipanggil.filter(
      (a) => !activeIdsRef.current.includes(a.id)
    )

    if (newAntrians.length > 0) {
      newAntrians.forEach((antrian) => {
        // Langsung catat agar tidak double saat interval berikutnya
        activeIdsRef.current.push(antrian.id)

        const nomorEja = antrian.nomor_antrian.split("").join(" ")
        const namaPoli = antrian.poli?.nama ?? ""
        const namaDokter = antrian.dokter_nama ?? ""

        const text = `Nomor antrian, ${nomorEja}, silahkan menuju ke, ${namaPoli}, ${namaDokter}`

        const speech = new SpeechSynthesisUtterance(text)
        speech.lang = "id-ID"
        speech.rate = 0.85
        speech.pitch = 1.0

        window.speechSynthesis.speak(speech)
      })
    }

    // HOUSEKEEPING: Hapus ID lama yang sudah tidak ada di server
    activeIdsRef.current = activeIdsRef.current.filter((id) =>
      currentServerIds.includes(id)
    )
  }, [dipanggil]) // Hanya dieksekusi jika prop dipanggil berubah
}
