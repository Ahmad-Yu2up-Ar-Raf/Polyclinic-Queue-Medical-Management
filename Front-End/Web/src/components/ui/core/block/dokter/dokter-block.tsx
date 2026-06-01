import React, { useState } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import {
  IdentityCardFreeIcons,
  Search01FreeIcons,
} from "@hugeicons/core-free-icons"
import { useDebounce } from "@/hooks/use-debounce"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchDokter } from "@/components/ui/core/block/dokter/hooks/use-dokter-query"
import DokterTable from "./components/dokter-table"
import DeleteDialog from "@/components/ui/fragments/custom/dialog/delete-dialog"
import { useDokterDeleteMutation } from "./hooks/use-dokter-mutation"
import type { Dokter } from "@/components/ui/core/block/dokter/types/dokter-type"
import { toast } from "sonner"

// ✅ INTEGRASI: Membuka segel import komponen dialog & sheet manipulasi data dokter
import CreateDokterSheet from "./components/create-dokter-sheet"
import UpdateDokterSheet from "./components/update-dokter-sheet"

const DokterBlock = () => {
  const [searchInput, setSearchInput] = useState("")
  const [dokterId, setdokterId] = useState<number | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const debouncedSearch = useDebounce(searchInput, 500)
  const { data, isLoading, isError } = FetchDokter(debouncedSearch)
  const dokterList = data?.data ?? []

  const [currentDokter, setCurrentDokter] = useState<Dokter | null>(null)
  const { mutate: deleteDokter, isPending } = useDokterDeleteMutation()

  const handleDelete = React.useCallback(
    (id: number) => {
      deleteDokter(`${id}`, {
        onSuccess: () => {
          setOpenDelete(false)
          setdokterId(null)
        },
      })
    },
    [deleteDokter]
  )

  const handleEdit = React.useCallback((item: Dokter) => {
    if (!item.id) {
      console.error("❌ Gagal memproses aksi: ID Dokter tidak ditemukan!", item)
      toast.error("Data Dokter tidak valid")
      return
    }

    setCurrentDokter(item)
    setOpenUpdate(true)
  }, [])

  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col gap-7 rounded-xl px-10 py-8">
        <div className="space-y-3">
          <div className="items-center space-y-7 sm:flex sm:justify-between">
            <HeaderDashboard
              Icon={IdentityCardFreeIcons}
              Title="Daftar Dokter"
              Deskrpsi="Kelola informasi data dokter poliklinik."
            />
            {/* ✅ INTEGRASI: Mengaktifkan komponen pendaftaran dokter baru */}
            <CreateDokterSheet />
          </div>

          <Input
            leftIcon={Search01FreeIcons}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari dokter..."
            className="sm:max-w-sm"
          />
        </div>

        {isLoading ? (
          <div className="flex w-full justify-center py-20">
            <Spinner className="size-8 text-primary" />
          </div>
        ) : isError ? (
          <div className="col-span-full py-10 text-center text-red-500">
            Gagal memuat data dari server.
          </div>
        ) : (
          <div>
            {dokterList.length > 0 && data ? (
              <DokterTable
                Data={data}
                onEdit={handleEdit}
                onDelete={(id) => {
                  setdokterId(id)
                  setOpenDelete(true)
                }}
              />
            ) : (
              <div className="col-span-full py-10 text-center text-neutral-400">
                <p>Tidak ada data dokter ditemukan.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <DeleteDialog
        open={openDelete}
        onOpenChange={(open) => {
          setOpenDelete(open)
          if (!open) setdokterId(null)
        }}
        handledeDelete={handleDelete}
        processing={isPending}
        id={dokterId ?? 0}
        trigger={false}
      />

      {/* ✅ INTEGRASI: Mengaktifkan komponen pembaruan profil & memetakan defaultValues sesuai skema Dokter */}
      {currentDokter && (
        <UpdateDokterSheet
          id={currentDokter.id}
          defaultValues={{
            nama: currentDokter.nama,
            email: currentDokter.email,
            poli_id: currentDokter.poli_id,
            // Mengekstrak list ID Jadwal murni dari relasi objek tabel pivot
            jadwal_ids: currentDokter.jadwal?.map((j) => j.id) || [],
            spesialisasi: currentDokter.spesialisasi || "",
            jenis_kelamin: currentDokter.jenis_kelamin,
            status: currentDokter.status,
            deskripsi: currentDokter.deskripsi || "",
            foto: null,
          }}
          open={openUpdate}
          onOpenChange={(open) => {
            setOpenUpdate(open)
            if (!open) setCurrentDokter(null)
          }}
        />
      )}
    </>
  )
}

export default DokterBlock
