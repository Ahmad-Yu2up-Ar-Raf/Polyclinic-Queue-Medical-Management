import React, { useState } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import {
  HospitalLocationIcon,
  UserMultipleIcon,
  Search01FreeIcons,
} from "@hugeicons/core-free-icons"
import { useDebounce } from "@/hooks/use-debounce"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchPasien } from "@/components/ui/core/block/pasien/hooks/use-pasien-query"
import PasienTable from "./components/pasien-table"
import DeleteDialog from "@/components/ui/fragments/custom/dialog/delete-dialog"
import { usePasienDeleteMutation } from "./hooks/use-pasien-mutation"
import CreatePasienDialog from "./components/create-pasien-sheet"
import type { Pasien } from "@/components/ui/core/block/pasien/types/pasien-type"
import UpdatePasienSheet from "./components/update-pasien-sheet"
import { toast } from "sonner"
import { usePagination } from "@/hooks/use-pagination"
import { DataTablePagination } from "@/components/ui/fragments/custom/table/data-table-paggination"
const PasienBlock = () => {
  const [searchInput, setSearchInput] = useState("")
  const [pasienId, setpasienId] = useState<number | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const debouncedSearch = useDebounce(searchInput, 500)
  const { page, perPage, setPage, handlePageChange, handlePerPageChange } =
    usePagination(10)

  const { data, isLoading, isError, isFetching } = FetchPasien({
    search: debouncedSearch,
    page,
    perPage,
  })

  const pasienList = data?.data ?? []
  const [currentPasien, setCurrentPasien] = React.useState<Pasien | null>(null)

  const { mutate: deletePasien, isPending } = usePasienDeleteMutation()

  const handleDelete = React.useCallback(
    (id: number) => {
      deletePasien(`${id}`, {
        onSuccess: () => {
          setOpenDelete(false)
          setpasienId(null)
        },
      })
    },
    [deletePasien]
  )

  const handleEdit = React.useCallback((item: Pasien) => {
    if (!item.id) {
      console.error("❌ Cannot edit: Pasien ID is missing!", item)
      toast.error("Data Pasien tidak valid")
      return
    }

    setCurrentPasien(item)
    setOpenUpdate(true)
  }, [])

  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col gap-7 rounded-xl px-10 py-8">
        <div className="space-y-3">
          <div className="items-center space-y-7 sm:flex sm:justify-between">
            <HeaderDashboard
              Icon={UserMultipleIcon}
              Title="Daftar Pasien"
              Deskrpsi="Kelola informasi data pasien poliklinik."
            />
            <CreatePasienDialog />
          </div>

          <Input
            leftIcon={Search01FreeIcons}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari pasien..."
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
                {pasienList.length > 0 && data ? (
                  <PasienTable
                    Data={data}
                    onEdit={handleEdit}
                    onDelete={(id) => {
                      setpasienId(id)
                      setOpenDelete(true)
                    }}
                  />
                ) : (
                  <div className="col-span-full py-10 text-center text-neutral-400">
                    <p>Tidak ada data pasien ditemukan.</p>
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

      <DeleteDialog
        open={openDelete}
        onOpenChange={(open) => {
          setOpenDelete(open)
          if (!open) setpasienId(null)
        }}
        handledeDelete={handleDelete}
        processing={isPending}
        id={pasienId ?? 0}
        trigger={false}
      />

      {currentPasien && (
        <UpdatePasienSheet
          id={currentPasien.id}
          defaultValues={{
            nama: currentPasien.nama,
            nik: currentPasien.nik,
            no_hp: currentPasien.no_hp,
            jenis_kelamin: currentPasien.jenis_kelamin as "pria" | "wanita",
            tanggal_lahir: currentPasien.tanggal_lahir
              ? new Date(currentPasien.tanggal_lahir)
                  .toISOString()
                  .split("T")[0]
              : "",
            alamat: currentPasien.alamat || "",
          }}
          open={openUpdate}
          onOpenChange={(open) => {
            setOpenUpdate(open)
            if (!open) setCurrentPasien(null)
          }}
          // 👇 Tambahkan callback onSuccess (kalau di komponen lu ada)
          onSuccessCallback={() => {
            setPage(1) // Balikin tabel ke halaman 1 biar datanya langsung kelihatan di atas!
            setSearchInput("") // (Opsional) Reset search kalau mau bener-bener bersih
            setOpenUpdate(false)
            setCurrentPasien(null)
          }}
        />
      )}
    </>
  )
}

export default PasienBlock
