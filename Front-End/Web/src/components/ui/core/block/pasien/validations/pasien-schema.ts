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
    .string()
    .min(16, "NIK harus 16 digit")
    .max(16, "NIK maksimal 16 digit"),

  jenis_kelamin: jenisKelaminEnum,

  tanggal_lahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  no_hp: z
    .string()
    .min(1, "Nomor wajib diisi")
    .max(255, "Maksimal 255 karakter"),
  alamat: z
    .string()
    .max(255, "Alamat maksimal 255 karakter")
    .nullable()
    .optional(),
})
