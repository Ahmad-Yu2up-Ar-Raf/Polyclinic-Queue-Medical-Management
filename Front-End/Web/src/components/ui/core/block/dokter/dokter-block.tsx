import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import {
  Search01FreeIcons,
  Stethoscope02FreeIcons,
} from "@hugeicons/core-free-icons"
import { useDebounce } from "@/hooks/use-debounce"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchDokter } from "@/components/ui/core/block/dokter/hooks/use-dokter-query"
import DokterTable from "./components/dokter-table"
import DeleteDialog from "@/components/ui/fragments/custom/dialog/delete-dialog"
import { useDokterDeleteMutation } from "./hooks/use-dokter-mutation"
import type { Dokter } from "@/components/ui/core/block/dokter/types/dokter-type"
import { toast } from "sonner"
import CreateDokterSheet from "./components/create-dokter-sheet"
import UpdateDokterSheet from "./components/update-dokter-sheet"

import { usePagination } from "@/hooks/use-pagination"
import { DataTablePagination } from "@/components/ui/fragments/custom/table/data-table-paggination"

const DokterBlock = () => {
  const [searchInput, setSearchInput] = useState("")
  const [dokterId, setdokterId] = useState<number | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const debouncedSearch = useDebounce(searchInput, 500)

  // Implementasi Pagination
  const { page, perPage, setPage, handlePageChange, handlePerPageChange } =
    usePagination(10)

  // Reset ke halaman 1 jika user mengetik pencarian baru
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, setPage])

  const { data, isLoading, isError, isFetching } = FetchDokter({
    search: debouncedSearch,
    page,
    perPage,
  })

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
              Icon={Stethoscope02FreeIcons}
              Title="Daftar Dokter"
              Deskrpsi="Kelola informasi data dokter poliklinik."
            />
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

        <div
          className={`flex flex-col gap-4 transition-opacity duration-200 ${isFetching && !isLoading ? "pointer-events-none opacity-60" : "opacity-100"}`}
        >
          {isLoading ? (
            <div className="flex w-full justify-center py-20">
              <Spinner className="size-8 text-primary" />
            </div>
          ) : isError ? (
            <div className="col-span-full py-10 text-center text-red-500">
              Gagal memuat data dari server.
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-xl bg-card">
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
                  <div className="col-span-full py-16 text-center text-neutral-400">
                    <p>Tidak ada data dokter ditemukan.</p>
                  </div>
                )}
              </div>

              {/* Tampilkan Pagination jika request sukses dan memiliki object meta */}
              {data?.meta?.pagination && (
                <DataTablePagination
                  pagination={data.meta.pagination}
                  onPageChange={handlePageChange}
                  onPerPageChange={handlePerPageChange}
                  isLoading={isFetching}
                />
              )}
            </>
          )}
        </div>
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

      {currentDokter && (
        <UpdateDokterSheet
          id={currentDokter.id}
          defaultValues={{
            nama: currentDokter.nama,
            email: currentDokter.email,
            poli_id: currentDokter.poli_id,
            jadwal_ids: currentDokter.jadwal?.map((j) => j.id) || [],
            spesialisasi: currentDokter.spesialisasi || "",
            jenis_kelamin: currentDokter.jenis_kelamin,
            status: currentDokter.status,
            deskripsi: currentDokter.deskripsi || "",
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
