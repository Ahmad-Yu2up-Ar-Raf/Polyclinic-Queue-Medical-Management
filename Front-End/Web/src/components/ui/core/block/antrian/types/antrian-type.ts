import * as z from "zod"
 
import {
  pendaftaranLamaSchema,
  pendaftaranBaruSchema,
  updateAntrianSchema,
} from "../validation/antrian-schema"
import type { Meta } from "@/types/pagination-type"

export interface AntrianResponse {
  status: boolean
  message: string
  data: Antrian[]
  meta: Meta
}

export interface Antrian {
  id: number
  created_at: Date
  updated_at: Date
  poli_id: number
  pasien_id: number
  dokter_id: number
  nomor_antrian: string
  nomor_urut: number
  jadwal_kunjungan: Date
  status: string
  metode_pembayaran: "BPJS" | "mandiri"
  deskripsi?: string
  dokter: Dokter
  poli: Poli
  pasien: Pasien
}

export interface Dokter {
  id: number
  nama: string
  foto: null | string
  spesialisasi: string
}

export interface Pasien {
  id: number
  nama: string
  nik: string
  no_hp?: string
  jenis_kelamin?: string
  tanggal_lahir?: Date
  alamat?: string
}

export interface Poli {
  id: number
  nama: string
}

export type PendaftaranLamaSchema = z.infer<typeof pendaftaranLamaSchema>
export type PendaftaranBaruSchema = z.infer<typeof pendaftaranBaruSchema>
export type UpdateAntrianSchema = z.infer<typeof updateAntrianSchema>

export interface UseAntrianLamaFormProps {
  defaultValues?: Partial<PendaftaranLamaSchema>
  onSuccessCallback?: () => void
}

export interface UseAntrianBaruFormProps {
  defaultValues?: Partial<PendaftaranBaruSchema>
  onSuccessCallback?: () => void
}

export interface UseAntrianUpdateFormProps {
  antrianId: number | string
  defaultValues: Partial<UpdateAntrianSchema>
  onSuccessCallback?: () => void
}

export interface ComboboxOption {
  label: string
  value: string | number
}
