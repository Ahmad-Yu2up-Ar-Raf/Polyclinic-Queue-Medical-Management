import React, { useState } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import { AmbulanceIcon, Search01FreeIcons } from "@hugeicons/core-free-icons"
import { useDebounce } from "@/hooks/use-debounce"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchPasien } from "@/components/ui/core/block/pasien/hooks/use-pasien-query"
import PasienTable from "./components/pasien-table"
import DeleteDialog from "@/components/ui/fragments/custom/dialog/delete-dialog"
import { usePasienDeleteMutation } from "./hooks/use-pasien-mutation"
import CreatePasienDialog from "./components/create-pasien-dialog"
import type { Pasien } from "@/components/ui/core/block/pasien/types/pasien-type"
import UpdatePasienDialog from "./components/update-pasien-dialog"
import { toast } from "sonner"

const PasienBlock = () => {
  const [searchInput, setSearchInput] = useState("")
  const [pasienId, setpasienId] = useState<number | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const debouncedSearch = useDebounce(searchInput, 500)
  const { data, isLoading, isError } = FetchPasien(debouncedSearch)
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
              Icon={AmbulanceIcon}
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
        )}
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
        <UpdatePasienDialog
          id={currentPasien.id}
          defaultValues={{
            nama: currentPasien.nama,
            nik: currentPasien.nik,
            jenis_kelamin: currentPasien.jenis_kelamin as "Pria" | "Wanita",
            // Parsing Date object / ISO String ke format murni string yyyy-MM-dd agar dibaca sempurna oleh Calendar
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
        />
      )}
    </>
  )
}

export default PasienBlock
