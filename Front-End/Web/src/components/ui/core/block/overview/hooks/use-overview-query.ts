import { api } from "@/api/clien"

import { useQuery } from "@tanstack/react-query"
import type { OverviewResponse } from "../types/overview-type"

export const FetchOverview = () => {
  return useQuery({
    // Masukkan search ke dalam queryKey agar TanStack otomatis refetch saat search berubah
    queryKey: ["overview"],
    queryFn: async () => api.get("overview").json<OverviewResponse>(),

    // PENTING: Jangan pakai refetchInterval di sini agar tidak spam!
    staleTime: 5000, // Cache data selama 5 detik
  })
}
