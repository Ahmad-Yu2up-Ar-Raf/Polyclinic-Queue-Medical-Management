import React, { useState } from "react"
import { Input } from "@/components/ui/fragments/shadcn-ui/input"
import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import { PoliCard } from "./poli-card"
import {
  Search01FreeIcons,
  Wrench01FreeIcons,
} from "@hugeicons/core-free-icons"

import { useDebounce } from "@/hooks/use-debounce"
import { Spinner } from "@/components/ui/fragments/shadcn-ui/spinner" // Pastikan import spinner
import { FetchPoli } from "@/components/ui/core/block/poli/hooks/use-poli-query"
import { usePagination } from "@/hooks/use-pagination"

const SelectPoli = () => {
  const [searchInput, setSearchInput] = useState("")
  const [poliId, setpoliId] = useState<number | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const debouncedSearch = useDebounce(searchInput, 500)
  const { page, perPage, setPage, handlePageChange, handlePerPageChange } =
    usePagination(10)

  const { data, isLoading, isError, isFetching } = FetchPoli({
    search: debouncedSearch,
    page,
    perPage,
  })

  // 4. Safe access data menggunakan optional chaining (?.)
  const poliList = data?.data ?? []

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-9 rounded-xl px-10 py-8">
      <div className="space-y-7">
        <div className="items-center space-y-7 sm:flex sm:justify-between">
          <HeaderDashboard
            Icon={Wrench01FreeIcons}
            Title="Pilih Poli"
            Deskrpsi="Pilih salah satu poli untuk di operasikan."
          />
        </div>

        {/* Input Search Shadcn */}
        <Input
          leftIcon={Search01FreeIcons}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cari poli..."
          className="sm:max-w-sm"
        />
      </div>

      {/* Handling Loading State dari Server */}
      {isLoading ? (
        <div className="flex w-full justify-center py-20">
          <Spinner className="size-8 text-primary" />
        </div>
      ) : isError ? (
        <div className="col-span-full py-10 text-center text-red-500">
          Gagal memuat data dari server.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {poliList.length > 0 ? (
            poliList.map((item) => <PoliCard key={item.id} item={item} />)
          ) : (
            <div className="col-span-full py-10 text-center text-neutral-400">
              <p>Tidak ada data poli ditemukan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectPoli
