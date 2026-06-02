import { api } from '@/api/clien';
import { OverviewResponse } from '@/types/overview-types';
 

import { useQuery } from '@tanstack/react-query';

export const FetchOverview = () => {
  return useQuery({
    queryKey: ['overview'],
    queryFn: async () => api.get('overview/pasien').json<OverviewResponse>(),
  });
};
