import * as z from "zod"

export const jenisKelaminEnum = z.enum(["pria", "wanita"] as const, {
  message: "Jenis kelamin wajib dipilih",
})

<<<<<<< HEAD
export const statusDokterEnum = z.enum(["aktif", "nonaktif"] as const, {
=======
export const statusDokterEnum = z.enum(["aktif", "tidak aktif"] as const, {
>>>>>>> 084ee958cd25ffd5b0b573422f9ce0406c9e2962
  message: "Status wajib dipilih",
})

export const dokterSchema = z.object({
  nama: z
    .string({ error: "Nama wajib diisi" })
    .min(1, "Nama wajib diisi")
    .max(255, "Nama maksimal 255 karakter"),

  email: z
    .string({ error: "Email wajib diisi" })
    .email("Format email tidak valid")
    .max(255, "Email maksimal 255 karakter"),

  poli_id: z
    .number({
      error: "Poli wajib dipilih",
    })
    .min(1, "Poli wajib dipilih"),

  jadwal_ids: z
    .array(z.number(), {
      error: "Jadwal harus berupa list",
    })
    .optional()
    .default([]),

  spesialisasi: z
    .string()
    .min(1, "Spesialisasi wajib diisi")
    .max(255, "Spesialisasi maksimal 255 karakter"),

  jenis_kelamin: jenisKelaminEnum,

  status: statusDokterEnum,

  deskripsi: z
    .string()

    .nullable()
    .optional(),

  // Catatan: Untuk foto (File), biasanya di-handle terpisah dengan FormData
  // Tapi kita define optional di schema
  // foto: z.any().nullable().optional(),
})
