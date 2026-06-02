import type {
  Pasien,
  PasienResponse,
} from "@/components/ui/core/block/pasien/types/pasien-type"
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
import { format } from "date-fns"
import { RowActions } from "@/components/ui/fragments/custom/table/row-actions"

type ComponentProps = {
  Data: PasienResponse
  onEdit: (item: Pasien) => void
  onDelete: (id: number) => void
}

const PasienTable = ({ Data, onDelete, onEdit }: ComponentProps) => {
  const Pasiens = Data.data
  const DATE_FORMAT = "dd MMMM yyyy"

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>NIK</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>No Hp</TableHead>
            <TableHead>Total Kunjungan</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Tanggal Pendaftaran</TableHead>
            <TableHead typeColumn="sticky">
              <span className="sr-only">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Pasiens.map((Pasien, i) => {
            // Logic untuk nentuin warna badge Jenis Kelamin
            const jenisKelamin = String(Pasien.jenis_kelamin || "")
              .toUpperCase()
              .trim()
            const isWanita =
              jenisKelamin === "WANITA" || jenisKelamin === "PEREMPUAN"

            return (
              <TableRow key={Pasien.id ?? i}>
                {/* 👇 1. NAMA: Perhatikan penambahan shrink-0 dan truncate */}
                <TableCell className="items-center font-medium whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={User}
                      // 👇 shrink-0 bikin icon gak bakal mengecil
                      className="text-muted-foregrounded/10 size-5 shrink-0"
                    />
                    {/* 👇 truncate bikin teks panjang jadi ada elipsis (...) */}
                    <span   title={Pasien.nama}>
                      {Pasien.nama || "-"}
                    </span>
                  </div>
                </TableCell>

                {/* 2. NIK */}
                <TableCell className="whitespace-nowrap">
                  {Pasien.nik}
                </TableCell>

                {/* 3. JENIS KELAMIN */}
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

                {/* 4. TOTAL KUNJUNGAN */}
                <TableCell className="whitespace-nowrap">
                  {Pasien.no_hp}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {Pasien.total_kunjungan ?? 0}x
                </TableCell>

                {/* 5. TANGGAL LAHIR */}
                <TableCell className="whitespace-nowrap">
                  {Pasien.tanggal_lahir
                    ? format(new Date(Pasien.tanggal_lahir), DATE_FORMAT)
                    : "-"}
                </TableCell>

                {/* 6. TANGGAL PENDAFTARAN */}
                <TableCell className="whitespace-nowrap">
                  {Pasien.created_at
                    ? format(new Date(Pasien.created_at), DATE_FORMAT)
                    : "-"}
                </TableCell>

                {/* 7. ACTION */}
                <TableCell typeColumn="sticky">
                  <RowActions
                    onEdit={() => onEdit(Pasien)}
                    onDelete={() => onDelete(Pasien.id!)}
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

export default PasienTable
