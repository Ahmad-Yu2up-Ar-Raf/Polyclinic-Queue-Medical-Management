import * as z from "zod"
import type { Meta } from "@/types/pagination-type"
import type { JenisKelamin } from "../../operator/types/operator-types"
import { pasienSchema } from "../validations/pasien-schema"

export interface PasienResponse {
  status: boolean
  message: string
  data: Pasien[]
  meta: Meta
}

export interface Pasien {
  id: number
  created_at: Date
  updated_at: Date
  nama: string
  user_id: number
  jenis_kelamin: JenisKelamin
  no_hp: string
  tanggal_lahir: Date
  nik: string
  alamat: string
  total_kunjungan: number
}

export type PasienSchema = z.infer<typeof pasienSchema>

export interface UsePasienFormProps {
  defaultValues?: Partial<PasienSchema>
  pasienId?: number | string
  onSuccessCallback?: () => void
}
