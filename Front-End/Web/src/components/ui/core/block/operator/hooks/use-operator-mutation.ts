import { api } from "@/api/clien"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"

export const useOperatorActionMutation = (poliId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    // status: 'selesai' untuk Next, 'dilewati' untuk Skip
    mutationFn: async (status: "selesai" | "dilewati") => {
      return api.post(`operator/${status}/${poliId}`).json()
    },
    onMutate: () => {
      toast.loading("Memproses antrian...", { id: "queue-action" })
    },
    onSuccess: (_, status) => {
      const actionText = status === "selesai" ? "dipanggil" : "dilewati"
      toast.success(`Antrian berhasil ${actionText}.`, { id: "queue-action" })

      // Refresh data di UI
      queryClient.invalidateQueries({
        queryKey: ["operator", `operator-poli-${poliId}`],
      })
    },
    onError: (error) => {
      toast.error("Gagal memproses antrian. Coba lagi.", { id: "queue-action" })
      console.error("Mutation Error:", error)
    },
  })
}
