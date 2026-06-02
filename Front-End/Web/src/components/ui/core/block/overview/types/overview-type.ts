export interface OverviewResponse {
  reports: Reports
}

export interface Reports {
  totalDokter: number
  totalPasien: number
  totalAntrian: number
  totalPoli: number
  topDokter: TopDokter[]
  AntrianstatusCount: AntrianstatusCount
  DokterstatusCount: DokterstatusCount
  JenisKelaminPasienCount: JenisKelaminCount
  JenisKelaminDokterCount: JenisKelaminCount
  countsByDate: CountsByDate[]
}

export interface AntrianstatusCount {
  selesai: number
  dilewati: number
  dipanggil: number
  menunggu: number
}

export interface DokterstatusCount {
  aktif: number
  "tidak aktif": number
}

export interface JenisKelaminCount {
  wanita: number
  pria: number
}

export interface CountsByDate {
  date: Date

  pasien: number
  antrian: number
}

export interface TopDokter {
  nama: string
  antrian_count: number
}
