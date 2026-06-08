export interface Antrean {
  id: number;
  created_at: Date;
  updated_at: Date;
  poli_id: number;
  pasien_id: number;
  dokter_id: number;
  jadwal_kunjungan: string;
  nomor_antrian: string;
  nomor_urut: number;
  status: string;
  metode_pembayaran: string;
  dokter: AntreanDokter;
  poli: Poli;
  pasien: Pasien;
}

export interface AntreanDokter {
  nama: string;
  id: number;
  spesialisasi: string;
  foto: string;
}

export interface Jadwal {
  id: number;
  created_at: Date;
  updated_at: Date;
  nama: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
}

export interface Pasien {
  id: number;
  nama: string;
  nik: string;
}

export interface Poli {
  id: number;
  nama: string;
}

export interface AntreanCreateResponse {
  succes: boolean;
  data: Data;
}

export interface Data {
  poli_id: number;
  dokter_id: number;
  jadwal_id: number;
  metode_pembayaran: string;
  pasien_id: number;
  nomor_antrian: string;
  status: string;
  nomor_urut: number;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export interface JadwalResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  dipanggil: Antrean[];
  dilewati: Antrean[];
  menunggu: Antrean[];
  selesai: Antrean[];
}

export interface Dokter {
  nama: string;
  id: number;
  foto: string;
  spesialisasi: string;
  jadwal_ids: number[];
}

export interface Pasien {
  id: number;
  nama: string;
  nik: string;
}

export interface Poli {
  id: number;
  nama: string;
}
