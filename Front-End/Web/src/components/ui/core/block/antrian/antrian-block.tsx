import React, { useState } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import {
  IdentityCardFreeIcons,
  Search01FreeIcons,
  Timer02FreeIcons,
} from "@hugeicons/core-free-icons"
import { useDebounce } from "@/hooks/use-debounce"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchAntrian } from "@/components/ui/core/block/antrian/hooks/use-antrian-query"
import AntrianTable from "./components/antrian-table"
import DeleteDialog from "@/components/ui/fragments/custom/dialog/delete-dialog"
import { useAntrianDeleteMutation } from "./hooks/use-antrian-mutation"
import type { Antrian } from "@/components/ui/core/block/antrian/types/antrian-type"
import { toast } from "sonner"
import { CreateAntrianDropdown } from "./components/create-antrian-dropdown"
import CreatePendaftaranBaruSheet from "./components/create-pendaftaran-baru-sheet"
import CreatePendaftaranLamaDialog from "./components/create-pendaftaran-lama-dialog"
import UpdateAntrianDialog from "./components/update-antrian-dialog"
import { usePagination } from "@/hooks/use-pagination"
import { DataTablePagination } from "@/components/ui/fragments/custom/table/data-table-paggination"
// ✅ INTEGRASI: Membuka segel import komponen dialog & sheet manipulasi data antrian
// import CreateAntrianSheet from "./components/create-antrian-sheet"
// import UpdateAntrianSheet from "./components/update-antrian-sheet"

const AntrianBlock = () => {
  const [searchInput, setSearchInput] = useState("")
  const [currentAntrian, setCurrentAntrian] = useState<Antrian | null>(null)
  const [openCreateBaru, setOpenCreateBaru] = useState(false)
  const [openCreateLama, setOpenCreateLama] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [antrianId, setAntrianId] = useState<number | null>(null)
  const debouncedSearch = useDebounce(searchInput, 500)
  const { page, perPage, setPage, handlePageChange, handlePerPageChange } =
    usePagination(10)

  const { data, isLoading, isError, isFetching } = FetchAntrian({
    search: debouncedSearch,
    page,
    perPage,
  })
  const antrianList = data?.data ?? []

  const { mutate: deleteAntrian, isPending } = useAntrianDeleteMutation()

  const handleDelete = React.useCallback(
    (id: number) => {
      deleteAntrian(`${id}`, {
        onSuccess: () => {
          setOpenDelete(false)
          setAntrianId(null)
        },
      })
    },
    [deleteAntrian]
  )

  const handleEdit = React.useCallback((item: Antrian) => {
    if (!item.id) {
      console.error(
        "❌ Gagal memproses aksi: ID Antrian tidak ditemukan!",
        item
      )
      toast.error("Data Antrian tidak valid")
      return
    }

    setCurrentAntrian(item)
    setOpenUpdate(true)
  }, [])

  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col gap-7 rounded-xl px-10 py-8">
        <div className="space-y-3">
          <div className="items-center space-y-7 sm:flex sm:justify-between">
            <HeaderDashboard
              Icon={Timer02FreeIcons}
              Title="Daftar Antrian"
              Deskrpsi="Kelola informasi data antrian poliklinik."
            />
            {/* ✅ INTEGRASI: Mengaktifkan komponen pendaftaran antrian baru */}
            <CreateAntrianDropdown
              onSelectBaru={() => setOpenCreateBaru(true)}
              onSelectLama={() => setOpenCreateLama(true)}
            />
          </div>

          <Input
            leftIcon={Search01FreeIcons}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari antrian..."
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
                {antrianList.length > 0 && data ? (
                  <AntrianTable
                    Data={data}
                    onEdit={handleEdit}
                    onDelete={(id) => {
                      setAntrianId(id)
                      setOpenDelete(true)
                    }}
                  />
                ) : (
                  <div className="col-span-full py-10 text-center text-neutral-400">
                    <p>Tidak ada data antrian ditemukan.</p>
                  </div>
                )}
              </div>
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
      <CreatePendaftaranBaruSheet
        open={openCreateBaru}
        onOpenChange={setOpenCreateBaru}
      />
      <CreatePendaftaranLamaDialog
        open={openCreateLama}
        onOpenChange={setOpenCreateLama}
      />
      <DeleteDialog
        open={openDelete}
        onOpenChange={(open) => {
          setOpenDelete(open)
          if (!open) setAntrianId(null)
        }}
        handledeDelete={handleDelete}
        processing={isPending}
        id={antrianId ?? 0}
        trigger={false}
      />
      {currentAntrian && (
        <UpdateAntrianDialog
          id={currentAntrian.id}
          nomorAntrian={currentAntrian.nomor_antrian}
          defaultValues={{
            poli_id: currentAntrian.poli_id,
            metode_pembayaran: currentAntrian.metode_pembayaran,
            jadwal_kunjungan: new Date(currentAntrian.jadwal_kunjungan)
              .toISOString()
              .split("T")[0],
            status: currentAntrian.status as any,
          }}
          open={openUpdate}
          onOpenChange={(open) => {
            setOpenUpdate(open)
            if (!open) setCurrentAntrian(null)
          }}
        />
      )}
    </>
  )
}

export default AntrianBlock
