import HeaderDashboard from "@/components/ui/fragments/custom/typograhy/header"
import { Home09Icon } from "@hugeicons/core-free-icons"
import React from "react"

const PoliPage = () => {
  return (
    <div className="space-y-3 p-4">
      <div className="items-center space-y-7 sm:flex sm:justify-between">
        <HeaderDashboard
          Icon={Home09Icon}
          Title="Daftar Poli"
          Deskrpsi="Kelola informasi poli poliklinik."
        />
        {/* <flux:modal.trigger name="pasien-create-modal">
                <flux:button variant="primary" icon="plus" class="sm:w-fit w-full">
                    Pasien Baru
                </flux:button>
            </flux:modal.trigger> */}
      </div>

      {/* <flux:input wire:model.live.debounce.300ms="search" variant="outline" icon="magnifying-glass"
            placeholder="Cari nomor urut, nama, atau dokter" class="w-full sm:max-w-sm" /> */}
    </div>
  )
}

export default PoliPage
