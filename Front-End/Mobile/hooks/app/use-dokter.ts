import { api } from '@/api/clien';

import { useQuery } from '@tanstack/react-query';

// Tambahkan parameter search (default string kosong)
export const FetchDokter = (search: string = '') => {
  return useQuery({
    // Masukkan 'search' ke dalam queryKey agar otomatis refetch saat search berubah
    queryKey: ['dokter', search],
    queryFn: async () =>
      api
        .get('dokter/poli', {
          searchParams: {
            // Ky akan otomatis mengubah ini menjadi ?search=keyword di URL
            ...(search ? { search } : {}),
          },
        })
        .json<Response>(),
  });
};
export const FetchDokterDetail = (id: string) => {
  return useQuery({
    queryKey: ['dokter', id, `dokter-${id}`],
    queryFn: async () =>
      api.get(`dokter/${id}`).json<{
        data: Dokter;
      }>(),
  });
};

export interface Response {
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
