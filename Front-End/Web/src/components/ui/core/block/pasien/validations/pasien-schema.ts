import * as z from "zod"

export const jenisKelaminEnum = z.enum(["Pria", "Wanita"] as const, {
  message: "Jenis Kelamin wajib dipilih",
})

export const pasienSchema = z.object({
  nama: z
    .string({ error: "Nama wajib diisi" })
    .min(1, "Nama wajib diisi")
    .max(255, "Nama maksimal 255 karakter"),

  nik: z
    .string({ error: "NIK wajib diisi" })
    .min(16, "NIK harus 16 digit")
    .max(16, "NIK maksimal 16 digit")
    .regex(/^[0-9]+$/, "NIK hanya boleh berisi angka"),

  jenis_kelamin: jenisKelaminEnum,

  tanggal_lahir: z
    .string({ error: "Tanggal lahir wajib diisi" })
    .refine((dateString) => {
      const date = new Date(dateString)
      const today = new Date()
      return !isNaN(date.getTime()) && date < today
    }, "Tanggal lahir harus sebelum hari ini"),

  alamat: z
    .string()
    .max(255, "Alamat maksimal 255 karakter")
    .nullable()
    .optional(),
})
