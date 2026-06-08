export interface DokterResponse {
  status: boolean;
  message: string;
  data: Dokter[];
  meta: Meta;
}

export interface Poli {
  id: number;
  nama: string;
}

export interface Meta {
  filters: Filters;
  pagination: Pagination;
}

export interface Filters {
  search: string;
}

export interface Pagination {
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  hasMore: boolean;
}

export interface Poli {
  id: number;
  nama: string;
}

export interface Dokter {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  poli_id: number;
  nama: string;
  email: string;
  jenis_kelamin: string;
  status: string;
  deskripsi: string;
  spesialisasi: string;
  foto: string;
  jadwal_count: number;
  antrian_count: number;
  tersedia: boolean;
  poli: Poli;
  jadwal: Jadwal[];
}

export interface Jadwal {
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
}

export interface Poli {
  id: number;
  nama: string;
}

export interface DokterPoliResponse {
  status: boolean;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  created_at: Date;
  updated_at: Date;
  nama: string;
  kode: string;
  ruangan: string;
  dokter: Dokter[];
}

export interface Dokter {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  poli_id: number;
  nama: string;
  email: string;
  jenis_kelamin: string;
  status: string;
  deskripsi: string;
  spesialisasi: string;
  foto: string;
  jadwal_count: number;
  antrian_count: number;
  tersedia: boolean;
  jadwal_ids: number[];
  poli: Poli;
  jadwal: Jadwal[];
}

export interface Jadwal {
  id: number;
  pivot: Pivot;
}

export interface Pivot {
  dokter_id: number;
  jadwal_id: number;
  created_at: Date;
  updated_at: Date;
}

export enum JenisKelamin {
  Pria = 'pria',
  Wanita = 'wanita',
}

export interface Poli {
  id: number;
  nama: string;
}

export enum Spesialisasi {
  SpesialisAnak = 'Spesialis Anak',
  SpesialisGigi = 'Spesialis Gigi',
  SpesialisTulang = 'Spesialis Tulang',
}

export enum Status {
  Aktif = 'aktif',
  TidakAktif = 'tidak aktif',
}
