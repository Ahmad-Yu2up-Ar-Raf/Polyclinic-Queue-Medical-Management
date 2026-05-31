import type { Poli } from "../../poli/types/poli-type"

export interface OperatorResponse {
  data: Data
}

export interface Data {
  poli: Poli
  antrian_dipanggil: Antrian
  antrian_berikutnya: Antrian
  antrian_menunggu: Antrian[]
  antrian_selesai: Antrian[]
  antrian_dilewati: Antrian[]
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
  metode_pembayaran: MetodePembayaran
  dokter: Dokter
  pasien: Pasien
}

export interface Dokter {
  nama: string
  id: number
  spesialisasi: string
}

export type MetodePembayaran = "BPJS" | "mandiri"

export interface Pasien {
  id: number
  nama: string
  jenis_kelamin: JenisKelamin
}

export type JenisKelamin = "pria" | "wanita"
