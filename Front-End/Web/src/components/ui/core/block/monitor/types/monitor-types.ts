export interface MonitorResponse {
  meta: Meta
  data: Data
}

export interface Data {
  dipanggil: Dipanggil[]
  poli: PoliElement[]
}

export interface Dipanggil {
  id: number
  nomor_antrian: string
  status: string
  poli: DipanggilPoli
  pasien_nama: string
  dokter_nama: string
  created_at: Date
}

export interface DipanggilPoli {
  nama: string
  ruangan: string
}

export interface PoliElement {
  id: number
  nama: string
  total_antrian: number
  antrian_tunggu: AntrianTunggu[]
}

export interface AntrianTunggu {
  id: number
  nomor_antrian: string
  status: string

  pasien_nama: string
  dokter_nama: string
  created_at: Date
}

export interface Meta {
  terminal_id: string
  timestamp: Date
}
