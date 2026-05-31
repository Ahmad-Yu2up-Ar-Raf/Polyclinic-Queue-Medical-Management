import React, { useState } from "react"
import { useStore } from "@tanstack/react-store"
import { format, parse } from "date-fns"
import { FormBase, type FormControlProps } from "./form-base"
import { useFieldContext } from "@/hooks/use-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../shadcn-ui/popover"
import { Calendar } from "../../shadcn-ui/calendar"
import { Button } from "../../shadcn-ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"

export function FormDateInput(props: FormControlProps) {
  const field = useFieldContext<string>()
  const [isOpen, setIsOpen] = useState(false)

  const isSubmitting = useStore(
    field.form.baseStore,
    (state) => state.isSubmitting
  )
  const submissionAttempts = useStore(
    field.form.baseStore,
    (state) => state.submissionAttempts
  )

  const hasErrors = field.state.meta.errors.length > 0
  const isInvalid =
    hasErrors && (field.state.meta.isTouched || submissionAttempts > 0)

  // Konversi string YYYY-MM-DD dari state ke Date object untuk Calendar
  const dateValue = field.state.value
    ? parse(field.state.value, "yyyy-MM-dd", new Date())
    : undefined

  const handleSelect = (date: Date | undefined) => {
    // Saat dipilih, ubah Date object jadi string YYYY-MM-DD untuk backend
    field.handleChange(date ? format(date, "yyyy-MM-dd") : "")
    setIsOpen(false)
  }

  return (
    <FormBase {...props}>
      <div className="relative">
        {props.LeftIcon && (
          <div
            className={cn(
              "absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
              isOpen ? "text-primary" : "text-muted-foreground",
              isInvalid && "text-destructive",
              props.className // Agar bisa di-override warna via kelas eksternal
            )}
          >
            <HugeiconsIcon icon={props.LeftIcon} />
          </div>
        )}

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              disabled={isSubmitting}
              className={cn(
                "w-full justify-start rounded-none border-0 border-b bg-background py-6 pr-6 pl-13 text-sm font-normal shadow-none transition-all duration-200 hover:bg-transparent focus-visible:ring-0",
                isOpen
                  ? "border-b-primary text-primary"
                  : "border-b-border text-foreground",
                !field.state.value && "text-muted-foreground",
                isInvalid && "border-b-destructive text-destructive",
                props.className
              )}
            >
              {dateValue ? (
                format(dateValue, "dd MMMM yyyy")
              ) : (
                <span className="opacity-70">
                  {props.placeholder || "Pilih Tanggal"}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={handleSelect}
              defaultMonth={dateValue}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </FormBase>
  )
}
