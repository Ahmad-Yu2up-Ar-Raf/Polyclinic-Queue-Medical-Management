import type {
  Dokter,
  DokterResponse,
} from "@/components/ui/core/block/dokter/types/dokter-type"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/fragments/shadcn-ui/table"
import { HugeiconsIcon } from "@hugeicons/react"
import { User } from "@hugeicons/core-free-icons"
import { RowActions } from "@/components/ui/fragments/custom/table/row-actions"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/fragments/shadcn-ui/avatar"
import { useInitials } from "@/hooks/use-initial"
type ComponentProps = {
  Data: DokterResponse
  onEdit: (item: Dokter) => void
  onDelete: (id: number) => void
}

const DokterTable = ({ Data, onDelete, onEdit }: ComponentProps) => {
  const Dokters = Data.data
  const initial = useInitials()
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Dokter</TableHead>
            <TableHead>Spesialisasi</TableHead>
            <TableHead>Poli</TableHead>
            <TableHead>Total Pasien</TableHead>
            <TableHead>Status</TableHead>
            <TableHead typeColumn="sticky">
              <span className="sr-only">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Dokters.map((Dokter, i) => {
            // Logic untuk menentukan warna badge Status
            const status = String(Dokter.status || "")
              .toLowerCase()
              .trim()
            const isAktif = status === "aktif"

            // Logic untuk foto profil (Avatar)
            const fotoUrl = Dokter.foto?.startsWith("http")
              ? Dokter.foto
              : Dokter.foto
                ? `${import.meta.env.VITE_API_BASE_URL}/storage/dokter/${Dokter.foto}` // Sesuaikan dengan base URL lu
                : null

            return (
              <TableRow key={Dokter.id ?? i}>
                {/* 1. NAMA DOKTER & AVATAR */}
                <TableCell className="flex w-[20em] items-center gap-3 font-medium">
                  <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 ring-1 ring-border/50 dark:bg-neutral-800">
                    {fotoUrl ? (
                      <Avatar className="size-8">
                        <AvatarImage src={fotoUrl} alt={Dokter.nama} />
                        <AvatarFallback className="text-xs">
                          {initial(Dokter.nama)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <HugeiconsIcon
                        icon={User}
                        className="size-4 fill-muted-foreground/40 text-neutral-400"
                      />
                    )}
                  </div>
                  <span className="truncate" title={`${Dokter.nama}`}>
                    {Dokter.nama || "-"}
                  </span>
                </TableCell>

                {/* 2. SPESIALISASI */}
                <TableCell className="whitespace-nowrap">
                  {Dokter.spesialisasi || "-"}
                </TableCell>

                {/* 3. POLI */}
                <TableCell className="whitespace-nowrap">
                  {/* Catatan: Pastikan di tipe Dokter ada relasi poli -> { poli?: { nama: string } } */}
                  {Dokter.poli?.nama || "-"}
                </TableCell>

                {/* 4. TOTAL PASIEN (Antrian Count) */}
                <TableCell className="whitespace-nowrap">
                  {Dokter.antrian_count ?? 0}
                </TableCell>

                {/* 5. STATUS */}
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${
                      isAktif
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-destructive/10 text-destructive ring-destructive/20 dark:text-red-400"
                    }`}
                  >
                    {status || "-"}
                  </span>
                </TableCell>

                {/* 6. ACTION */}
                <TableCell typeColumn="sticky">
                  <RowActions
                    onEdit={() => onEdit(Dokter)}
                    onDelete={() => onDelete(Dokter.id!)}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default DokterTable
