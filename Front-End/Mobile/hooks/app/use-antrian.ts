import { api } from '@/api/clien';
import { Antrean } from '@/types/antrian-types';

import { useQuery } from '@tanstack/react-query';

export const FetchAntreanMonitor = () => {
  return useQuery({
    queryKey: ['monitor'],
    queryFn: async () => api.get('antrian/monitor').json<Response>(),
  });
};

export const FetchJadwal = (search: string = '') => {
  return useQuery({
    // Masukkan 'search' ke dalam queryKey agar otomatis refetch saat search berubah
    queryKey: ['jadwal', search],
    queryFn: async () =>
      api
        .get('antrian/user', {
          searchParams: {
            // Ky akan otomatis mengubah ini menjadi ?search=keyword di URL
            ...(search ? { search } : {}),
          },
        })
        .json<Response>(),
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });
};

export const FetchAntreanDetail = (id: string) => {
  return useQuery({
    queryKey: ['antrian'],
    queryFn: async () =>
      api.get(`antrian/${id}`).json<{
        data: Antrean;
      }>(),
  });
};

export interface Response {
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
