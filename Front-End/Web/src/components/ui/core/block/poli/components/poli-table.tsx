import type {
  Poli,
  PoliResponse,
} from "@/components/ui/core/block/poli/types/poli-type"
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
  HospitalLocationIcon,
  Stethoscope,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons"
import { format } from "date-fns"
import { RowActions } from "@/components/ui/fragments/custom/table/row-actions"

type ComponentProps = {
  Data: PoliResponse
  onEdit: (item: Poli) => void

  onDelete: (id: number) => void
}

const PoliTable = ({ Data, onDelete, onEdit }: ComponentProps) => {
  const Polis = Data.data
  const DATE_FORMAT = "dd MMMM yyyy"
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Kode Poli</TableHead>
            <TableHead>Ruangan</TableHead>
            <TableHead>Total Dokter</TableHead>
            <TableHead>Total Pasien</TableHead>
            <TableHead>Di Buat Pada</TableHead>
            <TableHead typeColumn="sticky">
              <span className="sr-only">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Polis.map((Poli, i) => (
            <TableRow key={i}>
              <TableCell className="flex items-center gap-3 font-medium">
                <HugeiconsIcon
                  icon={HospitalLocationIcon}
                  className="text-muted-foregrounded size-5"
                />
                {Poli.nama}
              </TableCell>
              <TableCell className=" ">#{Poli.kode}</TableCell>
              <TableCell className="whitespace-nowrap">
                {Poli.ruangan}
              </TableCell>
              <TableCell className="">
                <div className="flex items-center gap-3 font-medium">
                  <HugeiconsIcon
                    icon={Stethoscope}
                    className="text-muted-foregrounded size-5"
                  />
                  {Poli.dokter_count}
                </div>
              </TableCell>

              <TableCell className="">
                <div className="flex items-center gap-3 font-medium">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    className="text-muted-foregrounded size-5"
                  />
                  {Poli.antrian_count}
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {format(Poli.created_at, DATE_FORMAT)}
              </TableCell>
              <TableCell typeColumn="sticky">
                <RowActions
                  onEdit={() => onEdit(Poli)}
                  onDelete={() => onDelete(Poli.id!)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default PoliTable
