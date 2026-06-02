import React from "react"
import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/fragments/shadcn-ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons"
import type { Pagination } from "@/types/pagination-type"

interface DataTablePaginationProps {
  pagination: Pagination
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  isLoading?: boolean
}

export function DataTablePagination({
  pagination,
  onPageChange,
  onPerPageChange,
  isLoading = false,
}: DataTablePaginationProps) {
  // Hitung jumlah data yang sedang tampil di layar
  const startData = (pagination.currentPage - 1) * pagination.perPage + 1
  const endData = Math.min(
    pagination.currentPage * pagination.perPage,
    pagination.total
  )
  const hasData = pagination.total > 0

  return (
    <footer className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto border-t px-2 py-4 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {hasData ? (
          <>
            Menampilkan <span className="font-medium text-foreground">{startData}</span> -{" "}
            <span className="font-medium text-foreground">{endData}</span> dari{" "}
            <span className="font-medium text-foreground">{pagination.total}</span> data
          </>
        ) : (
          "Tidak ada data"
        )}
      </div>

      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Baris per halaman</p>
          <Select
            value={`${pagination.perPage}`}
            onValueChange={(value) => onPerPageChange(Number(value))}
            disabled={isLoading || !hasData}
          >
            <SelectTrigger className="h-8 bg-background rounded-lg w-[70px]">
              <SelectValue placeholder={`${pagination.perPage}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Halaman {pagination.currentPage} dari {Math.max(1, pagination.lastPage)}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={pagination.currentPage <= 1 || isLoading || !hasData}
          >
            <span className="sr-only">Go to first page</span>
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1 || isLoading || !hasData}
          >
            <span className="sr-only">Go to previous page</span>
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.lastPage || isLoading || !hasData}
          >
            <span className="sr-only">Go to next page</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(pagination.lastPage)}
            disabled={pagination.currentPage >= pagination.lastPage || isLoading || !hasData}
          >
            <span className="sr-only">Go to last page</span>
            <HugeiconsIcon icon={ArrowRightDoubleIcon} className="size-4" />
          </Button>
        </div>
      </div>
    </footer>
  )
}