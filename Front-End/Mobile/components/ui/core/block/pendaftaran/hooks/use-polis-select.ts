import { api } from '@/api/clien';

import { useQuery } from '@tanstack/react-query';
import { SelectResponse } from '../types/select-type';

export const FetchPolisSelect = () => {
  return useQuery({
    queryKey: ['polis', 'select'],
    queryFn: async () => api.get('polis/select').json<SelectResponse>(),
  });
};
