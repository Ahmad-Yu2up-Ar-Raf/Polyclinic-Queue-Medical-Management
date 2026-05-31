import * as z from "zod"

export const poliSchema = z.object({
  nama: z
    .string({ error: "Nama Poli wajib diisi" })
    .min(3, "Nama Poli minimal 3 karakter")
    .max(255, "Nama Poli maksimal 255 karakter"),
  ruangan: z
    .string({ error: "Ruangan wajib diisi" })
    .min(1, "Ruangan wajib diisi")
    .max(255, "Ruangan maksimal 255 karakter"),
})

export type PoliSchema = z.infer<typeof poliSchema>
