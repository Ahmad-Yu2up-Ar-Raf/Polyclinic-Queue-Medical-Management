import { api } from '@/api/clien';

import { useQuery } from '@tanstack/react-query';
import { SelectResponse } from '../types/select-type';

export const FetchPasienSelect = () => {
  return useQuery({
    queryKey: ['pasien', 'select'],
    queryFn: async () => api.get('pasien/select').json<SelectResponse>(),
  });
};
