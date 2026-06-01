import { api } from "@/api/clien"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAppForm } from "@/hooks/use-form"

import type { UseDokterFormProps, DokterResponse } from "../types/dokter-type"
import { dokterSchema } from "../validation/dokter-schema"

export type DokterFormReturnType = ReturnType<typeof useDokterForm>

export const useDokterDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dokterId: string | number) => {
      return api.delete(`dokter/${dokterId}`).json()
    },
    onMutate: () => {
      toast.loading("Memproses menghapus data Dokter...", {
        id: "dokter-delete",
      })
    },
    onSuccess: () => {
      toast.success("Dokter berhasil dihapus.", { id: "dokter-delete" })
      queryClient.invalidateQueries({ queryKey: ["dokter"] })
    },
    onError: (error) => {
      toast.error("Gagal menghapus Dokter. Coba lagi.", { id: "dokter-delete" })
      console.error("Mutation Error:", error)
    },
  })
}

export const useDokterForm = ({
  defaultValues,
  dokterId,
  onSuccessCallback,
}: UseDokterFormProps) => {
  const queryClient = useQueryClient()

  return useAppForm({
    validators: {
      onChange: dokterSchema,
      onSubmit: dokterSchema,
    },
    defaultValues: defaultValues ?? {
      nama: "",
      email: "",
      poli_id: undefined,
      jadwal_ids: [],
      jenis_kelamin: "pria",
      status: "aktif",
      spesialisasi: "",
      deskripsi: "",
    },
    onSubmit: async ({ value: data }) => {
      const isUpdate = !!dokterId

      // Menyiapkan payload
      const payload = {
        ...data,
      }

      const actionRequest = isUpdate
        ? api
            .put(`dokter/${dokterId}`, { json: payload })
            .json<{ message: string; data: DokterResponse }>()
        : api
            .post("dokter", { json: payload })
            .json<{ message: string; data: DokterResponse }>()

      toast.promise(actionRequest, {
        loading: isUpdate
          ? "Memperbarui data dokter..."
          : "Menambahkan data dokter...",
        success: (res) => {
          queryClient.invalidateQueries({ queryKey: ["dokter"] })
          onSuccessCallback?.()
          return (
            res.message ||
            (isUpdate
              ? "Data Dokter berhasil diperbarui!"
              : "Data Dokter berhasil ditambahkan!")
          )
        },
        error: (err) => {
          return err.message || "Gagal memproses data Dokter!"
        },
      })

      await actionRequest
    },
  })
}
