export interface DokterResponse {
  status: boolean;
  message: string;
  data: Dokter[];
  meta: Meta;
}

export interface Dokter {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  poli_id: number;
  nama: string;
  email: string;
  tersedia: boolean;
  jenis_kelamin: string;
  status: string;
  deskripsi: string;
  spesialisasi: string;
  foto: string;
  jadwal_count: number;
  antrian_count: number;
  poli: Poli;
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
