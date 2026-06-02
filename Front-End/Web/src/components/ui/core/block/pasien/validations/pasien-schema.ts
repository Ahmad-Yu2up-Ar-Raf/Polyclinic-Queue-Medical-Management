import * as z from "zod"

// ✅ FIX: Gunakan required_error & invalid_type_error
export const jenisKelaminEnum = z.enum(["pria", "wanita"] as const, {
  message: "Jenis kelamin wajib dipilih",
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
  no_hp: z
    .string({ error: "Nomor HP wajib diisi" })
    .min(10, "Nomor HP minimal 10 digit")
    .max(13, "Nomor HP maksimal 13 digit")
    .regex(/^08[0-9]+$/, "Nomor HP harus diawali dengan 08 dan berisi angka"),
  jenis_kelamin: jenisKelaminEnum,
  tanggal_lahir: z
    .string({ error: "Tanggal lahir wajib diisi" })
    .min(1, "Tanggal lahir wajib diisi")
    .refine((dateString) => {
      const date = new Date(dateString)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return !isNaN(date.getTime()) && date < today
    }, "Tanggal lahir harus sebelum hari ini"),
  alamat: z
    .string()
    .max(255, "Alamat maksimal 255 karakter")
    .nullable()
    .optional(),
})
