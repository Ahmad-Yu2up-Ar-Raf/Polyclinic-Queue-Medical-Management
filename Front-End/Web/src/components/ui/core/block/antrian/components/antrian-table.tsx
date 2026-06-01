import type {
  Antrian,
  AntrianResponse,
} from "@/components/ui/core/block/antrian/types/antrian-type"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/fragments/shadcn-ui/table"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  User,
  Tick01FreeIcons,
  Clock01FreeIcons,
  Megaphone,
  Wallet01FreeIcons,
  BankFreeIcons,
  SkipForward,
} from "@hugeicons/core-free-icons"
import { RowActions } from "@/components/ui/fragments/custom/table/row-actions"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/fragments/shadcn-ui/avatar"
import { useInitials } from "@/hooks/use-initial"
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge"

type ComponentProps = {
  Data: AntrianResponse
  onEdit: (item: Antrian) => void
  onDelete: (id: number) => void
}

const AntrianTable = ({ Data, onDelete, onEdit }: ComponentProps) => {
  const Antrians = Data.data || []
  const initial = useInitials()

  // Helper untuk format tanggal ke format lokal Indonesia (d F Y)
  const formatTanggal = (dateInput: Date | string) => {
    if (!dateInput) return "-"
    const date = new Date(dateInput)
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nomor Antrian</TableHead>
          <TableHead>Pasien</TableHead>
          <TableHead>Poli</TableHead>
          <TableHead>Dokter</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Metode Pembayaran</TableHead>
          <TableHead>Tanggal Pendaftaran</TableHead>
          <TableHead typeColumn="sticky" className="right-0">
            <span className="sr-only">Action</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Antrians.length === 0 ? (
          <TableRow>
            <TableCell className="py-10 text-center text-neutral-400">
              Tidak ada data antrian ditemukan.
            </TableCell>
          </TableRow>
        ) : (
          Antrians.map((antrian, i) => {
            // 1. Logic Status Badge & Icon
            const statusStr = (antrian.status || "").trim().toLowerCase()

            let statusBadgeClass =
              "bg-neutral-50 text-neutral-700 ring-neutral-600/20 dark:bg-neutral-500/10 dark:text-neutral-400"
            let statusIcon = Megaphone

            switch (statusStr) {
              case "menunggu":
                statusBadgeClass =
                  "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-500/10 dark:text-blue-400"
                statusIcon = Clock01FreeIcons
                break
              case "dipanggil":
                statusBadgeClass =
                  "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400"
                statusIcon = Megaphone
                break
              case "selesai":
                statusBadgeClass =
                  "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                statusIcon = Tick01FreeIcons
                break
              case "dilewati":
                statusBadgeClass =
                  "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-500/10 dark:text-pink-400"
                statusIcon = SkipForward
                break
              default:
                statusBadgeClass =
                  "bg-neutral-50 text-neutral-700 ring-neutral-600/20 dark:bg-neutral-500/10 dark:text-neutral-400"
            }
            // 2. Logic Metode Pembayaran Badge & Icon
            const metodeStr = (antrian.metode_pembayaran || "")
              .trim()
              .toUpperCase()
            const isBpjs = metodeStr === "BPJS"
            const metodeBadgeClass = isBpjs
              ? "bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-500/10 dark:text-purple-400"
              : "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400"
            const metodeIcon = isBpjs ? Wallet01FreeIcons : BankFreeIcons

            // 3. Logic Foto Profil Dokter
            const fotoUrl = antrian.dokter?.foto?.startsWith("http")
              ? antrian.dokter.foto
              : antrian.dokter?.foto
                ? `${import.meta.env.VITE_API_BASE_URL}/storage/dokter/${antrian.dokter.foto}`
                : null

            return (
              <TableRow key={antrian.id ?? i}>
                {/* 1. NOMOR ANTRIAN */}
                <TableCell className="font-medium whitespace-nowrap">
                  {antrian.nomor_antrian || "-"}
                </TableCell>

                {/* 2. PASIEN */}
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={User}
                      className="size-5 text-muted-foregrounded "
                    />
                    <span>{antrian.pasien?.nama || "-"}</span>
                  </div>
                </TableCell>

                {/* 3. POLI */}
                <TableCell className="whitespace-nowrap">
                  {antrian.poli?.nama || "-"}
                </TableCell>

                {/* 4. DOKTER */}
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-6">
                      {fotoUrl ? (
                        <AvatarImage src={fotoUrl} alt={antrian.dokter?.nama} />
                      ) : null}
                      <AvatarFallback className="text-[10px]">
                        {initial(antrian.dokter?.nama || "D")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      Dr. {antrian.dokter?.nama || "-"}
                    </span>
                  </div>
                </TableCell>

                {/* 5. STATUS */}
                <TableCell className="whitespace-nowrap">
                  <Badge
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${statusBadgeClass}`}
                  >
                    <HugeiconsIcon icon={statusIcon} className="size-3.5" />
                    {statusStr || "-"}
                  </Badge>
                </TableCell>

                {/* 6. METODE PEMBAYARAN */}
                <TableCell className="whitespace-nowrap">
                  <Badge
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${metodeBadgeClass}`}
                  >
                    <HugeiconsIcon icon={metodeIcon} className="size-3.5" />
                    {metodeStr || "-"}
                  </Badge>
                </TableCell>

                {/* 7. TANGGAL PENDAFTARAN */}
                <TableCell className="whitespace-nowrap">
                  {formatTanggal(antrian.created_at)}
                </TableCell>

                {/* 8. ACTION */}
                <TableCell typeColumn="sticky" className="right-0">
                  <RowActions
                    onEdit={() => onEdit(antrian)}
                    onDelete={() => onDelete(antrian.id)}
                  />
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}

export default AntrianTable
