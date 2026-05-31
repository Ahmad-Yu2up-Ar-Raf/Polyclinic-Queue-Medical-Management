import { z } from 'zod';
const TanggalLahir = z
  .string()
  .min(1, 'Tanggal lahir wajib diisi')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD')
  .refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Tanggal tidak valid')
  .refine((date) => {
    const inputDate = new Date(date);
    // 1. Reset jam input ke 00:00:00
    inputDate.setHours(0, 0, 0, 0);

    const today = new Date();
    // 2. Reset jam "hari ini" ke 00:00:00
    today.setHours(0, 0, 0, 0);

    // 3. Pakai operator < (kurang dari) biar WAJIB sebelum hari ini.
    // (Kalau hari ini masih boleh, ganti jadi <= )
    return inputDate < today;
  }, 'Tanggal lahir harus sebelum hari ini');

const JadwalKunjungan = z
  .string()
  .min(1, 'Tanggal wajib diisi')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD')
  .refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Tanggal tidak valid')
  .refine((date) => {
    const inputDate = new Date(date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate >= today;
  }, 'Tanggal tidak boleh di masa lalu');

const JenisKelamin = z.enum(['wanita', 'pria'], {
  required_error: 'Jenis kelamin wajib dipilih',
  invalid_type_error: 'Jenis kelamin wajib dipilih',
});
const StatusEnum = z.enum(['dipanggil', 'dilewati', 'menunggu', 'selesai'], {
  required_error: 'Status wajib  ada',
  invalid_type_error: 'Status wajib ada',
});

const MetodePembayaran = z.enum(['mandiri', 'BPJS'], {
  required_error: 'Metode pembayaran wajib dipilih',
  invalid_type_error: 'Metode pembayaran wajib dipilih',
});

// File: pendaftaran-validation.ts
const baseAntreanFields = {
  // Ganti z.number menjadi z.coerce.number
  poli_id: z.coerce.number({ required_error: 'Poli wajib dipilih' }),
  dokter_id: z.coerce.number({ required_error: 'Dokter wajib ada' }),
  nomor_urut: z.coerce.number({ required_error: 'Nomor urut wajib ada' }),
  status: StatusEnum,
  nomor_antrian: z.string().min(1, 'Nomor Antrean Wajib ada').max(255, 'Maksimal 255 karakter'),

  // dokter_id: z.number({ required_error: 'Dokter wajib dipilih' }),
  // jadwal_id: z.number({ required_error: 'Jadwal wajib dipilih' }),
  metode_pembayaran: MetodePembayaran,
  jadwal_kunjungan: JadwalKunjungan,
};

export const antrianStoreSchema = z.object({
  ...baseAntreanFields,
});

export const pendaftaranBaruSchema = z.object({
  ...baseAntreanFields,
  nama: z.string().min(1, 'Nama wajib diisi').max(255, 'Maksimal 255 karakter'),
  no_hp: z.string().min(1, 'Nomor wajib diisi').max(255, 'Maksimal 255 karakter'),
  jenis_kelamin: JenisKelamin,
  tanggal_lahir: TanggalLahir,
  nik: z.string().regex(/^\d{16}$/, 'NIK harus terdiri dari 16 digit angka'),
  alamat: z.string().min(1, 'Alamat wajib diisi').max(255, 'Maksimal 255 karakter'),
});

export const firstStepSchema = pendaftaranBaruSchema.pick({
  nama: true,
  no_hp: true,
  alamat: true,
  nik: true,
  tanggal_lahir: true,
  jenis_kelamin: true,
});

export type FirstStepSchema = z.infer<typeof firstStepSchema>;

export const secondStepSchema = pendaftaranBaruSchema.pick({
  poli_id: true,
  jadwal_kunjungan: true,
  metode_pembayaran: true,
});

export type SecondStepSchema = z.infer<typeof secondStepSchema>;

export type AntreanStoreSchema = z.infer<typeof antrianStoreSchema>;
export type PendaftaranBaruSchema = z.infer<typeof pendaftaranBaruSchema>;
