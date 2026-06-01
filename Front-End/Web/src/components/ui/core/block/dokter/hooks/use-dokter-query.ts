import { api } from "@/api/clien"

import { useQuery } from "@tanstack/react-query"
import type { DokterResponse } from "../types/dokter-type"

export const FetchDokter = (search: string) => {
  return useQuery({
    // Masukkan search ke dalam queryKey agar TanStack otomatis refetch saat search berubah
    queryKey: ["dokter", search],
    queryFn: async () =>
      api
        .get("dokter", {
          searchParams: {
            // Ky akan otomatis mengubah ini menjadi ?search=keyword di URL
            ...(search ? { search } : {}),
          },
        })
        .json<DokterResponse>(),

    // PENTING: Jangan pakai refetchInterval di sini agar tidak spam!
    staleTime: 5000, // Cache data selama 5 detik
  })
}
