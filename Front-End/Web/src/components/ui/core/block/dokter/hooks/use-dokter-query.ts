import { keepPreviousData, useQuery } from "@tanstack/react-query"
import type { DokterResponse } from "../types/dokter-type"
import { api } from "@/api/clien"

interface FetchDokterParams {
  search: string
  page: number
  perPage: number
}

export const FetchDokter = ({ search, page, perPage }: FetchDokterParams) => {
  return useQuery({
    queryKey: ["dokter", search, page, perPage],
    queryFn: async () =>
      api
        .get("dokter", {
          searchParams: {
            page: page.toString(),
            perPage: perPage.toString(),
            ...(search ? { search } : {}),
          },
        })
        .json<DokterResponse>(),
    staleTime: 5000,
    placeholderData: keepPreviousData, // Menjaga UI tabel tetap stabil saat memuat halaman baru
  })
}
