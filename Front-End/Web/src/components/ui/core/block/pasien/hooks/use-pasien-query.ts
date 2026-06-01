import { api } from "@/api/clien"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import type { PasienResponse } from "../types/pasien-type"

interface FetchPasienParams {
  search: string
  page: number
  perPage: number
}

export const FetchPasien = ({ search, page, perPage }: FetchPasienParams) => {
  return useQuery({
    // Masukkan search ke dalam queryKey agar TanStack otomatis refetch saat search berubah
    queryKey: ["pasien", search, page, perPage],
    queryFn: async () =>
      api
        .get("pasien", {
          searchParams: {
            page: page.toString(),
            perPage: perPage.toString(),
            ...(search ? { search } : {}),
          },
        })
        .json<PasienResponse>(),

    // PENTING: Jangan pakai refetchInterval di sini agar tidak spam!
    staleTime: 5000, // Cache data selama 5 detik
    placeholderData: keepPreviousData, // Menjaga UI tabel tetap stabil saat memuat halaman baru
  })
}

