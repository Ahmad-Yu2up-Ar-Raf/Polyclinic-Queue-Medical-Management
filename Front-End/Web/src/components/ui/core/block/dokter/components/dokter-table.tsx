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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Dokter</TableHead>
          <TableHead>Spesialisasi</TableHead>
          <TableHead>Poli</TableHead>
          <TableHead>Jenis Kelamin</TableHead>
          <TableHead>Total Pasien</TableHead>
          <TableHead>Status</TableHead>
          <TableHead typeColumn="sticky" className="right-0">
            <span className="sr-only">Action</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Dokters.map((Dokter, i) => {
          const status = String(Dokter.status || "")
            .toLowerCase()
            .trim()
          const isAktif = status === "aktif"

          const fotoUrl = Dokter.foto?.startsWith("http")
            ? Dokter.foto
            : Dokter.foto
              ? `${import.meta.env.VITE_API_BASE_URL}/storage/dokter/${Dokter.foto}`
              : null

          const jenisKelamin = String(Dokter.jenis_kelamin || "")
            .toUpperCase()
            .trim()
          const isWanita =
            jenisKelamin === "WANITA" || jenisKelamin === "PEREMPUAN"

          return (
            <TableRow key={Dokter.id ?? i}>
              <TableCell className="items-center font-medium whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-border/50 dark:bg-neutral-800">
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
                  <span title={`${Dokter.nama}`}>{Dokter.nama || "-"}</span>
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {Dokter.spesialisasi || "-"}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {Dokter.poli?.nama || "-"}
              </TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${
                    isWanita
                      ? "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-500/10 dark:text-pink-400 dark:ring-pink-500/20"
                      : "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20"
                  }`}
                >
                  {jenisKelamin || "-"}
                </span>
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {Dokter.antrian_count || 0}
              </TableCell>

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

              <TableCell typeColumn="sticky" className="right-0">
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
  )
}

export default DokterTable
