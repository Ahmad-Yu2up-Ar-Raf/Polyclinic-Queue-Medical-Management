import { api } from "@/api/clien"
import type { OperatorResponse } from "@/components/ui/core/block/operator/types/operator-types"
import { useQuery, keepPreviousData } from "@tanstack/react-query" // 👈 Import ini (untuk v5)

export const FetchOperatorPoli = (search: string, id: string) => {
  return useQuery({
    queryKey: ["operator", `operator-poli-${id}`, search],
    queryFn: async () =>
      api
        .get(`operator/${id}`, {
          searchParams: {
            ...(search ? { search } : {}),
          },
        })
        .json<OperatorResponse>(),

    staleTime: 5000,
    // 👈 INI KUNCI RAHASIANYA! Tahan data lama saat fetch data baru
    placeholderData: keepPreviousData,
  })
}
