import { api } from "@/api/clien"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAppForm } from "@/hooks/use-form"
import { pasienSchema } from "../validations/pasien-schema"
import type { UsePasienFormProps, PasienResponse } from "../types/pasien-type"

export type PasienFormReturnType = ReturnType<typeof usePasienForm>

export const usePasienDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (pasienId: string | number) => {
      return api.delete(`pasiens/${pasienId}`).json()
    },
    onMutate: () => {
      toast.loading("Memproses menghapus data Pasien...", {
        id: "pasien-delete",
      })
    },
    onSuccess: () => {
      toast.success("Pasien berhasil dihapus.", { id: "pasien-delete" })
      queryClient.invalidateQueries({ queryKey: ["pasiens"] })
    },
    onError: (error) => {
      toast.error("Gagal menghapus Pasien. Coba lagi.", { id: "pasien-delete" })
      console.error("Mutation Error:", error)
    },
  })
}

export const usePasienForm = ({
  defaultValues,
  pasienId,
  onSuccessCallback,
}: UsePasienFormProps) => {
  const queryClient = useQueryClient()

  return useAppForm({
    validators: {
      onChange: pasienSchema,
    },
    defaultValues: defaultValues ?? {
      nama: "",
      nik: "",
      jenis_kelamin: "Pria",
      tanggal_lahir: "",
      alamat: "",
    },
    onSubmit: async ({ value: data }) => {
      const isUpdate = !!pasienId

      const actionRequest = isUpdate
        ? api
            .put(`pasiens/${pasienId}`, { json: data })
            .json<{ message: string; data: PasienResponse }>()
        : api
            .post("pasiens", { json: data })
            .json<{ message: string; data: PasienResponse }>()

      toast.promise(actionRequest, {
        loading: isUpdate
          ? "Memperbarui data pasien..."
          : "Menambahkan data pasien...",
        success: (res) => {
          queryClient.invalidateQueries({ queryKey: ["pasiens"] })
          onSuccessCallback?.()
          return (
            res.message ||
            (isUpdate
              ? "Data Pasien berhasil diperbarui!"
              : "Data Pasien berhasil ditambahkan!")
          )
        },
        error: (err) => {
          return err.message || "Gagal memproses data Pasien!"
        },
      })

      await actionRequest
    },
  })
}
