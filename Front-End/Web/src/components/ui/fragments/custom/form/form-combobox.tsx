"use client"

import React, { useState } from "react"
import { useStore } from "@tanstack/react-store"
import { useFieldContext } from "@/hooks/use-form"
import { FormBase, type FormControlProps } from "./form-base"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
} from "@/components/ui/fragments/shadcn-ui/combobox"

export interface ComboboxOption {
  label: string
  value: string | number
}

interface FormComboboxProps extends Omit<
  FormControlProps,
  "type" | "maxLength" | "inputMode"
> {
  options: ComboboxOption[]
  multiple?: boolean
}

export function FormCombobox(props: FormComboboxProps) {
  const field = useFieldContext<any>()
  const anchor = useComboboxAnchor()
  const [isFocused, setIsFocused] = useState(false)

  const isSubmitting = useStore(
    field.form.baseStore,
    (state) => state.isSubmitting
  )
  const submissionAttempts = useStore(
    field.form.baseStore,
    (state) => state.submissionAttempts
  )
  const errors = useStore(field.store, (state) => state.meta.errors)
  const value = useStore(field.store, (state) => state.value)

  const isMultiple = props.multiple || false

  const hasErrors = errors.length > 0
  const hasValue = isMultiple
    ? Array.isArray(value) && value.length > 0
    : value !== undefined && value !== ""

  const isInvalid = hasErrors && submissionAttempts > 0
  const isValid = hasValue && !hasErrors

  const defaultIconColor = props.iconClassName || "text-primary"
  const focusClass = props.isFocusClassName || "border-b-primary bg-primary/5"
  const validClass = props.isValidClassName || "border-b-primary bg-primary/5"
  const invalidClass =
    props.isInvalidClassName || "border-b-destructive bg-destructive/5"

  let containerStateClass = "border-border bg-card"
  let iconStateColor = defaultIconColor

  if (isInvalid) {
    containerStateClass = invalidClass
    iconStateColor = "text-destructive"
  } else if (isValid) {
    containerStateClass = validClass
    iconStateColor = defaultIconColor
  } else if (isFocused) {
    containerStateClass = focusClass
  }

  const selectedValue = isMultiple
    ? props.options.filter(
        (opt) => Array.isArray(value) && value.includes(opt.value)
      )
    : props.options.find((opt) => opt.value === value) || null

  const handleValueChange = (val: any) => {
    if (isMultiple) {
      field.handleChange(val ? val.map((v: any) => v.value) : [])
    } else {
      field.handleChange(val ? val.value : undefined)
    }
  }

  return (
    <FormBase {...props}>
      <div
        className={cn(
          "relative flex w-full flex-col justify-center overflow-hidden border-b transition-all duration-300 ease-in-out",
          containerStateClass,
          isSubmitting && "pointer-events-none opacity-50",
          props.className,
          isMultiple ? "min-h-14 py-2" : "h-14"
        )}
      >
        {props.LeftIcon && (
          <div
            className={cn(
              "absolute top-4 left-3 z-10 flex items-center justify-center transition-colors [&_svg]:size-5 [&_svg]:shrink-0",
              iconStateColor
            )}
          >
            <HugeiconsIcon icon={props.LeftIcon} />
          </div>
        )}

        <Combobox
          multiple={isMultiple as any}
          items={props.options}
          value={selectedValue}
          onValueChange={handleValueChange}
          disabled={isSubmitting}
          onOpenChange={(open) => setIsFocused(open)}
        >
          {isMultiple ? (
            <>
              <ComboboxChips
                ref={anchor}
                className={cn(
                  "w-full border-none bg-transparent shadow-none ring-0 focus-within:ring-0",
                  props.LeftIcon ? "pl-10" : "pl-4",
                  isInvalid && "[&_input]:placeholder:text-destructive"
                )}
              >
                <ComboboxValue>
                  {(values: ComboboxOption[]) => (
                    <React.Fragment>
                      {values.map((v) => (
                        /* ✅ FIX: Menghapus properti value={v} yang memicu error TypeScript */
                        <ComboboxChip key={v.value}>{v.label}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput
                        placeholder={hasValue ? "" : props.placeholder}
                        className={cn(
                          "bg-transparent",
                          isInvalid
                            ? "text-destructive placeholder:text-destructive"
                            : "text-foreground"
                        )}
                      />
                    </React.Fragment>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              {/* ✅ FIX: Mengubah z-[100] menjadi z-100 sesuai panduan aturan kelas Tailwind */}
              <ComboboxContent anchor={anchor} className="z-100">
                <ComboboxEmpty>Pencarian tidak ditemukan.</ComboboxEmpty>
                <ComboboxList>
                  {props.options.map((item) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </>
          ) : (
            <>
              <ComboboxTrigger
                className={cn(
                  "flex h-full w-full items-center justify-between border-none bg-transparent px-4 text-sm outline-none",
                  props.LeftIcon ? "pl-10" : "pl-4",
                  isInvalid
                    ? "text-destructive"
                    : hasValue
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                )}
              >
                <ComboboxValue placeholder={props.placeholder} />
              </ComboboxTrigger>

              {/* ✅ FIX: Mengubah z-[100] menjadi z-100 & min-w-[200px] menjadi min-w-50 */}
              <ComboboxContent className="z-100 w-full min-w-50">
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Cari..."
                  className="mx-2 my-2"
                />
                <ComboboxEmpty>Pencarian tidak ditemukan.</ComboboxEmpty>
                <ComboboxList>
                  {props.options.map((item) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </>
          )}
        </Combobox>
      </div>
    </FormBase>
  )
}
