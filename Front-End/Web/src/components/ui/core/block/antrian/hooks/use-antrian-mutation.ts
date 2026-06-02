import { api } from "@/api/clien"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAppForm } from "@/hooks/use-form"
import {
  pendaftaranLamaSchema,
  pendaftaranBaruSchema,
  updateAntrianSchema,
} from "../validation/antrian-schema"
import type {
  UseAntrianLamaFormProps,
  UseAntrianBaruFormProps,
  UseAntrianUpdateFormProps,
  AntrianResponse,
} from "../types/antrian-type"

export type AntrianLamaFormReturnType = ReturnType<typeof useAntrianLamaForm>
export type AntrianBaruFormReturnType = ReturnType<typeof useAntrianBaruForm>
export type AntrianUpdateFormReturnType = ReturnType<
  typeof useAntrianUpdateForm
>

export const useAntrianDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (antrianId: string | number) => {
      return api.delete(`antrian/${antrianId}`).json()
    },
    onMutate: () => {
      toast.loading("Memproses penghapusan data Antrian...", {
        id: "antrian-delete",
      })
    },
    onSuccess: () => {
      toast.success("Antrian berhasil dihapus.", { id: "antrian-delete" })
      queryClient.invalidateQueries({ queryKey: ["antrian"] })
      queryClient.invalidateQueries({ queryKey: ["monitor"] })
    },
    onError: (error) => {
      toast.error("Gagal menghapus Antrian. Coba lagi.", {
        id: "antrian-delete",
      })
      console.error("Mutation Error:", error)
    },
  })
}

export const useAntrianLamaForm = ({
  defaultValues,
  onSuccessCallback,
}: UseAntrianLamaFormProps) => {
  const queryClient = useQueryClient()

  return useAppForm({
    validators: {
      onChange: pendaftaranLamaSchema,
      onSubmit: pendaftaranLamaSchema,
    },
    defaultValues: defaultValues ?? {
      poli_id: undefined,
      pasien_id: undefined,
      jadwal_kunjungan: "",
      metode_pembayaran: "mandiri",
    },
    onSubmit: async ({ value: data }) => {
      const actionRequest = api
        .post("antrian", { json: data })
        .json<{ message: string; data: AntrianResponse }>()
      console.log(data)
      toast.promise(actionRequest, {
        loading: "Mendaftarkan antrian pasien...",
        success: (res) => {
          queryClient.invalidateQueries({ queryKey: ["antrian"] })
          queryClient.invalidateQueries({ queryKey: ["monitor"] })
          onSuccessCallback?.()
          return res.message || "Antrian berhasil didaftarkan!"
        },
        error: (err) => {
          return err.message || "Gagal mendaftarkan antrian!"
        },
      })

      await actionRequest
    },
  })
}

export const useAntrianBaruForm = ({
  defaultValues,
  onSuccessCallback,
}: UseAntrianBaruFormProps) => {
  const queryClient = useQueryClient()

  return useAppForm({
    validators: {
      onChange: pendaftaranBaruSchema,
      onSubmit: pendaftaranBaruSchema,
    },
    defaultValues: defaultValues ?? {
      nama: "",
      nik: "",
      tanggal_lahir: "",
      jenis_kelamin: "pria",
      no_hp: "",
      alamat: "",
      poli_id: undefined,
      jadwal_kunjungan: "",
      metode_pembayaran: "mandiri",
    },
    onSubmit: async ({ value: data }) => {
      const actionRequest = api
        .post("antrian/pendaftaranBaru", { json: data })
        .json<{ message: string; data: AntrianResponse }>()
      console.log(data)
      toast.promise(actionRequest, {
        loading: "Membuat data pasien & mendaftarkan antrian...",
        success: (res) => {
          queryClient.invalidateQueries({ queryKey: ["antrian"] })
          queryClient.invalidateQueries({ queryKey: ["monitor"] })
          queryClient.invalidateQueries({ queryKey: ["pasien"] })
          onSuccessCallback?.()
          return res.message || "Pasien dan antrian berhasil dibuat!"
        },
        error: (err) => {
          return err.message || "Gagal membuat pasien baru!"
        },
      })

      await actionRequest
    },
  })
}

export const useAntrianUpdateForm = ({
  antrianId,
  defaultValues,
  onSuccessCallback,
}: UseAntrianUpdateFormProps) => {
  const queryClient = useQueryClient()

  return useAppForm({
    validators: {
      onChange: updateAntrianSchema,
      onSubmit: updateAntrianSchema,
    },
    defaultValues,
    onSubmit: async ({ value: data }) => {
      const actionRequest = api
        .put(`antrian/${antrianId}`, { json: data })
        .json<{ message: string; data: AntrianResponse }>()
      console.log(data)
      toast.promise(actionRequest, {
        loading: "Memperbarui data antrian...",
        success: (res) => {
          queryClient.invalidateQueries({ queryKey: ["antrian"] })
          queryClient.invalidateQueries({ queryKey: ["monitor"] })
          onSuccessCallback?.()
          return res.message || "Antrian berhasil diperbarui!"
        },
        error: (err) => {
          return err.message || "Gagal memperbarui antrian!"
        },
      })

      await actionRequest
    },
  })
}
