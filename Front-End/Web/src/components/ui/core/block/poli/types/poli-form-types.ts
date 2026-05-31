import type { Poli } from "@/components/ui/core/block/poli/types/poli-type"
import type { PoliSchema } from "../validations/poli-schema"

export interface UsePoliFormProps {
  defaultValues?: PoliSchema
  poliId?: number | string | null
  onSuccessCallback?: () => void
}

export interface PoliResponse {
  success: boolean
  message: string
  data: Poli
}
