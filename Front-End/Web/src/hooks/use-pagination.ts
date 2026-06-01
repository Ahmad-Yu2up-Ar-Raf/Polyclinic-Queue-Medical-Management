import { useState } from "react"

export function usePagination(defaultPerPage: number = 10) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(defaultPerPage)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setPage(1) // Reset ke halaman pertama setiap ganti jumlah baris
  }

  return {
    page,
    perPage,
    setPage,
    handlePageChange,
    handlePerPageChange,
  }
}