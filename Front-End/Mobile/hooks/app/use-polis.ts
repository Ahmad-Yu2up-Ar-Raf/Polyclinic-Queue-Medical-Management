export interface PolisResponse {
  status: boolean;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  nama: string;
}

import { api } from '@/api/clien';

import { useQuery } from '@tanstack/react-query';

export const FetchPolisSelect = () => {
  return useQuery({
    queryKey: ['polis', 'select'],
    queryFn: async () => api.get('polis/select').json<PolisResponse>(),
  });
};
