import { api } from "@/api/clien"
import type { PoliResponse } from "@/components/ui/core/block/poli/types/poli-type"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

interface FetchPasienParams {
  search: string
  page: number
  perPage: number
}

export const FetchPoli = ({ search, page, perPage }: FetchPasienParams) => {
  return useQuery({
    // Masukkan search ke dalam queryKey agar TanStack otomatis refetch saat search berubah
    queryKey: ["polis", search, page, perPage],
    queryFn: async () =>
      api
        .get("polis", {
          searchParams: {
            page: page.toString(),
            perPage: perPage.toString(),
            ...(search ? { search } : {}),
          },
        })
        .json<PoliResponse>(),

    // PENTING: Jangan pakai refetchInterval di sini agar tidak spam!
    staleTime: 5000, // Cache data selama 5 detik
    placeholderData: keepPreviousData, // Menjaga UI tabel tetap stabil saat memuat halaman baru
  })
}
