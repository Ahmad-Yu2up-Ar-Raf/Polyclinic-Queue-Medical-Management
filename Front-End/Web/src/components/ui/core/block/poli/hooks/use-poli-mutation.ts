import { api } from "@/api/clien"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const usePoliDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    // Masukkan poliId ke dalam fungsi mutasi di bawah ini 👇
    mutationFn: async (poliId: string) => {
      return api.delete(`polis/${poliId}`).json()
    },
    onMutate: () => {
      toast.loading("Memproses menghapus Poli...", { id: "poli-delete" })
    },
    onSuccess: () => {
      toast.success(`Poli berhasil dihapus.`, { id: "poli-delete" })

      // 👇 INVALIDATE TRICK: Cukup panggil key utamanya ["poli"]
      // Supaya semua fetch table poli otomatis ter-refresh dan data hilang dari list
      queryClient.invalidateQueries({
        queryKey: ["polis"],
      })
    },
    onError: (error) => {
      toast.error("Gagal menghapus Poli. Coba lagi.", { id: "poli-delete" })
      console.error("Mutation Error:", error)
    },
  })
}

import { useAppForm } from "@/hooks/use-form" // Sesuaikan path alias kamu
import { poliSchema } from "../validations/poli-schema"
import type { UsePoliFormProps, PoliResponse } from "../types/poli-form-types"

export type PoliFormReturnType = ReturnType<typeof usePoliForm>

export const usePoliForm = ({
  defaultValues,
  poliId,
  onSuccessCallback,
}: UsePoliFormProps) => {
  const queryClient = useQueryClient()

  return useAppForm({
    validators: {
      onChange: poliSchema,
    },
    defaultValues: defaultValues ?? {
      nama: "",
      ruangan: "",
    },
    onSubmit: async ({ value: data }) => {
      const isUpdate = !!poliId

      // Tentukan endpoint dan method berdasarkan mode (Update atau Create)
      const actionRequest = isUpdate
        ? api.put(`polis/${poliId}`, { json: data }).json<PoliResponse>()
        : api.post("polis", { json: data }).json<PoliResponse>()
  console.log(data)
      toast.promise(actionRequest, {
        loading: isUpdate
          ? "Memperbarui data poli..."
          : "Menambahkan data poli...",
        success: (res) => {
          // Trigger TanStack Query untuk mereload master data Poli
          queryClient.invalidateQueries({ queryKey: ["polis"] })

          // Jalankan callback (contoh: untuk menutup modal & reset form)
          onSuccessCallback?.()

          return (
            res.message ||
            (isUpdate
              ? "Data Poli berhasil diperbarui!"
              : "Data Poli berhasil ditambahkan!")
          )
        },
        error: (err) => {
          return err.message || "Gagal memproses data Poli!"
        },
      })

      // Wajib di-await agar state isSubmitting pada Form membaca proses ini
      await actionRequest
    },
  })
}
