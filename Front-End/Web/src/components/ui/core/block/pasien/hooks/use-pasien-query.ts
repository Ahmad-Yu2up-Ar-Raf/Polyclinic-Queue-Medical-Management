import { api } from "@/api/clien"

import { useQuery } from "@tanstack/react-query"
import type { PasienResponse } from "../types/pasien-type"

export const FetchPasien = (search: string) => {
  return useQuery({
    // Masukkan search ke dalam queryKey agar TanStack otomatis refetch saat search berubah
    queryKey: ["pasien", search],
    queryFn: async () =>
      api
        .get("pasien", {
          searchParams: {
            // Ky akan otomatis mengubah ini menjadi ?search=keyword di URL
            ...(search ? { search } : {}),
          },
        })
        .json<PasienResponse>(),

    // PENTING: Jangan pakai refetchInterval di sini agar tidak spam!
    staleTime: 5000, // Cache data selama 5 detik
  })
}
