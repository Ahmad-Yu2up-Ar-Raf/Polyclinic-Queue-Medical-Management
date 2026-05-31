import { api } from "@/api/clien"
import type { PoliResponse } from "@/components/ui/core/block/poli/types/poli-type"
import { useQuery } from "@tanstack/react-query"

export const FetchPoli = (search: string) => {
  return useQuery({
    // Masukkan search ke dalam queryKey agar TanStack otomatis refetch saat search berubah
    queryKey: ["polis", search],
    queryFn: async () =>
      api
        .get("polis", {
          searchParams: {
            // Ky akan otomatis mengubah ini menjadi ?search=keyword di URL
            ...(search ? { search } : {}),
          },
        })
        .json<PoliResponse>(),

    // PENTING: Jangan pakai refetchInterval di sini agar tidak spam!
    staleTime: 5000, // Cache data selama 5 detik
  })
}
