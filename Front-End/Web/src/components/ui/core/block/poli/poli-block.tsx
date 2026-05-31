import React, { useState } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import { AmbulanceIcon, Search01FreeIcons } from "@hugeicons/core-free-icons"
import { useDebounce } from "@/hooks/use-debounce"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner"
import { FetchPoli } from "@/components/ui/core/block/poli/hooks/use-poli-query"
import PoliTable from "./components/poli-table"
import DeleteDialog from "@/components/ui/fragments/custom/dialog/delete-dialog"
import { usePoliDeleteMutation } from "./hooks/use-poli-mutation"
import CreatePoliDialog from "./components/create-poli-dialog"
import type { Poli } from "@/components/ui/core/block/poli/types/poli-type"
import UpdatePoliDialog from "./components/update-poli-dialog"
 
import { toast } from "sonner"

const PoliBlock = () => {
  const [searchInput, setSearchInput] = useState("")
  const [poliId, setpoliId] = useState<number | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const debouncedSearch = useDebounce(searchInput, 500)
  const { data, isLoading, isError } = FetchPoli(debouncedSearch)
  const poliList = data?.data ?? []
  const [currentPoli, setCurrentPoli] = React.useState<Poli | null>(null)
  // 👇 Hook di-load bersih tanpa disuapi parameter ID di awal
  const { mutate: deletePoli, isPending } = usePoliDeleteMutation()

  // 👇 Handler eksekusi delete sesungguhnya
  const handleDelete = React.useCallback(
    (id: number) => {
      deletePoli(`${id}`, {
        onSuccess: () => {
          setOpenDelete(false) // Tutup dialog jika sukses
          setpoliId(null) // Reset ID
        },
      })
    },
    [deletePoli]
  )
  const handleEdit = React.useCallback((item: Poli) => {
    // Sekarang item.id pasti ada karena tipenya Poli dari database
    if (!item.id) {
      console.error("❌ Cannot edit: Poli ID is missing!", item)
      toast.error("Data Poli tidak valid")
      return
    }

    setCurrentPoli(item)
    setOpenUpdate(true)
  }, [])
  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col gap-7 rounded-xl px-10 py-8">
        <div className="space-y-3">
          <div className="items-center space-y-7 sm:flex sm:justify-between">
            <HeaderDashboard
              Icon={AmbulanceIcon}
              Title="Daftar Poli"
              Deskrpsi="Kelola informasi poli poliklinik."
            />
            <CreatePoliDialog />
          </div>

          <Input
            leftIcon={Search01FreeIcons}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari poli..."
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
            {poliList.length > 0 && data ? (
              <PoliTable
                Data={data}
                onEdit={handleEdit}
                onDelete={(id) => {
                  setpoliId(id)
                  setOpenDelete(true)
                }}
              />
            ) : (
              <div className="col-span-full py-10 text-center text-neutral-400">
                <p>Tidak ada data poli ditemukan.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 👇 Dialog dikontrol penuh menggunakan openDelete state */}
      <DeleteDialog
        open={openDelete}
        onOpenChange={(open) => {
          setOpenDelete(open)
          if (!open) setpoliId(null) // Bersihkan ID kalau user klik batal/luar dialog
        }}
        handledeDelete={handleDelete}
        processing={isPending} // 👈 Gunakan isPending bawaan TanStack Query
        id={poliId ?? 0}
        trigger={false}
      />

      {currentPoli && (
        <UpdatePoliDialog
          id={currentPoli.id} // 👈 Udah 100% aman karena currentPoli tipenya Poli
          defaultValues={{
            nama: currentPoli.nama,
            ruangan: currentPoli.ruangan,
          }}
          open={openUpdate}
          onOpenChange={(open) => {
            setOpenUpdate(open)
            if (!open) setCurrentPoli(null) // Reset pas dialog ditutup
          }}
        />
      )}
    </>
  )
}

export default PoliBlock
