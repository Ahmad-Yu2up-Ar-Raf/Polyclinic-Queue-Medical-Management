import { api } from '@/api/clien';

import { useQuery } from '@tanstack/react-query';
import { Dokter } from '../types/dokter-type';

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

