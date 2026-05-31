// @/hooks/use-monitor-clock.ts
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export const useMonitorClock = () => {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer) // Clean up memory
  }, [])

  const jam = format(time, "HH:mm")
  const tanggal = format(time, "EEEE, d MMMM", { locale: id })

  return { jam, tanggal }
}
