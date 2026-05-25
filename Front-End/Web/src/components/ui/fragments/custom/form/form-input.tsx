import { useStore } from "@tanstack/react-store"
import { FormBase } from "./form-base"
import type { FormControlProps } from "./form-base"
import { useFieldContext } from "@/hooks/form/use-form"
import { Input } from "../../shadcn-ui/input"
import { cn } from "@/lib/utils"
import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"

export function FormInput(props: FormControlProps) {
  const field = useFieldContext<string | number>()
  const [isFocused, setIsFocused] = React.useState(false)

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (props.type === "number") {
      field.handleChange(
        (value === "" ? undefined : Number(value)) as string | number
      )
    } else {
      field.handleChange(value)
    }
  }

  return (
    <FormBase {...props}>
      <div className="relative">
        {props.LeftIcon && (
          <div
            className={cn(
              "absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-colors [&_svg]:size-3.5 [&_svg]:shrink-0",
              isFocused ? "text-primary" : "text-muted-foreground",
              isInvalid && "text-destructive"
            )}
          >
            <HugeiconsIcon icon={props.LeftIcon} />
          </div>
        )}

        <Input
          id={field.name}
          name={field.name}
          value={field.state.value ?? ""}
          onBlur={() => {
            setIsFocused(false)
            field.handleBlur()
          }}
          onFocus={() => setIsFocused(true)}
          disabled={isSubmitting}
          onChange={handleChange}
          aria-invalid={isInvalid}
          placeholder={props.placeholder || field.name}
          type={props.type}
          className={cn(
            "rounded-none border-0 border-b bg-background",
            "transition-all duration-200",
            "focus-visible:ring-0 focus-visible:outline-none",
            isFocused
              ? "border-b-primary placeholder:text-primary [&_svg]:text-primary"
              : "border-b-border",
            isInvalid &&
              "border-b-destructive text-destructive placeholder:text-destructive",
            "[&_input]:border-0 [&_input]:py-6 [&_input]:pr-6 [&_input]:pl-13 [&_input]:text-sm",
            props.className
          )}
        />
      </div>
    </FormBase>
  )
}
