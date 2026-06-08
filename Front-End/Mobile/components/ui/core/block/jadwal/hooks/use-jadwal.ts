import { api } from '@/api/clien';
import { Antrean, JadwalResponse } from '@/components/ui/core/block/jadwal/types/jadwal-types';

import { useQuery } from '@tanstack/react-query';

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
        .json<JadwalResponse>(),
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
