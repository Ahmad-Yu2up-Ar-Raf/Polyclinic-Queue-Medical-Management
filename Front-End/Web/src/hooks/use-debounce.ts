import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set timer untuk mengupdate value
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Bersihkan timer jika user mengetik lagi sebelum delay selesai
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
