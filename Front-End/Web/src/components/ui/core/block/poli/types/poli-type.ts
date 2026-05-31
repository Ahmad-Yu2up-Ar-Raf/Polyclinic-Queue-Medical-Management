import type { Meta } from "../../monitor/types/monitor-types"

export interface PoliResponse {
  status: boolean
  message: string
  data: Poli[]
  meta: Meta
}

export interface Poli {
  id: number
  created_at: Date
  updated_at: Date
  nama: string
  kode: string
  ruangan: string
  dokter_count: number
  antrian_count: number
}
