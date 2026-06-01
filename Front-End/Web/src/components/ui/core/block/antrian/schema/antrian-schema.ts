import * as z from "zod"

export const metodePembayaranEnum = z.enum(["mandiri", "BPJS"])

export const antrianStatusEnum = z.enum(["Menunggu", "Dipanggil", "Selesai"])

export const jenisKelaminEnum = z.enum(["pria", "wanita"])

export const pendaftaranLamaSchema = z.object({
  poli_id: z
    .number({
      error: "Poli wajib dipilih",
    })
    .min(1, "Poli wajib dipilih"),
  pasien_id: z
    .number({
      error: "Pasien wajib dipilih",
    })
    .min(1, "Pasien wajib dipilih"),
  jadwal_kunjungan: z
    .string({ error: "Jadwal kunjungan wajib diisi" })
    .min(1, "Jadwal kunjungan wajib diisi")
    .refine((dateString) => {
      const date = new Date(dateString)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return !isNaN(date.getTime()) && date >= today
    }, "Jadwal kunjungan tidak boleh di masa lalu"),
  metode_pembayaran: metodePembayaranEnum,
})

export const pendaftaranBaruSchema = z.object({
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
  poli_id: z
    .number({
      error: "Poli wajib dipilih",
    })
    .min(1, "Poli wajib dipilih"),
  jadwal_kunjungan: z
    .string({ error: "Jadwal kunjungan wajib diisi" })
    .min(1, "Jadwal kunjungan wajib diisi")
    .refine((dateString) => {
      const date = new Date(dateString)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return !isNaN(date.getTime()) && date >= today
    }, "Jadwal kunjungan tidak boleh di masa lalu"),
  metode_pembayaran: metodePembayaranEnum,
})

export const updateAntrianSchema = z.object({
  poli_id: z
    .number({
      error: "Poli wajib dipilih",
    })
    .min(1, "Poli wajib dipilih"),
  jadwal_kunjungan: z
    .string({ error: "Jadwal kunjungan wajib diisi" })
    .min(1, "Jadwal kunjungan wajib diisi"),
  metode_pembayaran: metodePembayaranEnum,
  status: antrianStatusEnum.optional(),
})
