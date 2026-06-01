import * as z from "zod"
import type { Meta } from "@/types/pagination-type"
import type { dokterSchema } from "../validation/dokter-schema"

// Mengikuti tipe enum string dari backend
export type JenisKelamin = "pria" | "wanita"
export type StatusDokter = "aktif" | "nonaktif"

// Tipe helper untuk select option
export interface ComboboxOption {
  label: string
  value: string | number
}

// Representasi Model Poli (Minimal)
export interface Poli {
  id: number
  nama: string
}

// Representasi Model Jadwal (Minimal)
export interface Jadwal {
  id: number
  hari: string
  jam_mulai: string
  jam_selesai: string
}

export interface DokterResponse {
  status: boolean
  message: string
  data: Dokter[]
  meta: Meta
}

export interface Dokter {
  id: number
  created_at: Date
  updated_at: Date
  nama: string
  user_id: number
  poli_id: number
  email: string
  jenis_kelamin: JenisKelamin
  status: StatusDokter
  spesialisasi?: string
  deskripsi?: string
  foto?: string
  poli?: Poli
  jadwal?: Jadwal[]
  total_kunjungan?: number
}

export type DokterSchema = z.infer<typeof dokterSchema>

export interface UseDokterFormProps {
  defaultValues?: Partial<DokterSchema>
  dokterId?: number | string
  onSuccessCallback?: () => void
}
