import React, { useState } from "react"
import { useStore } from "@tanstack/react-store"
import { FormBase, type FormControlProps } from "./form-base"
import { useFieldContext } from "@/hooks/use-form"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Textarea } from "../../shadcn-ui/textarea"

export type FormTextAreaProps = FormControlProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function FormTextArea(props: FormTextAreaProps) {
  const field = useFieldContext<string>()
  const [isFocused, setIsFocused] = useState(false)

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

  return (
    <FormBase {...props}>
      <div className="relative">
        {props.LeftIcon && (
          <div
            className={cn(
              "absolute top-3 left-3 z-10 transition-colors [&_svg]:size-5 [&_svg]:shrink-0",
              isFocused ? "text-primary" : "text-muted-foreground",
              isInvalid && "text-destructive",
              props.className // Support custom color via class
            )}
          >
            <HugeiconsIcon icon={props.LeftIcon} />
          </div>
        )}

        <Textarea
          id={field.name}
          name={field.name}
          value={field.state.value ?? ""}
          onBlur={() => {
            setIsFocused(false)
            field.handleBlur()
          }}
          onFocus={() => setIsFocused(true)}
          disabled={isSubmitting}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={props.placeholder || field.name}
          rows={props.rows || 3}
          className={cn(
            "flex w-full resize-none rounded-none border-0 border-b bg-background py-3 pr-4 text-sm shadow-none transition-all duration-200 outline-none focus-visible:ring-0",
            props.LeftIcon ? "pl-11" : "pl-3",
            isFocused ? "border-b-primary text-foreground" : "border-b-border",
            isInvalid &&
              "border-b-destructive text-destructive placeholder:text-destructive",
            props.className
          )}
        />
      </div>
    </FormBase>
  )
}
