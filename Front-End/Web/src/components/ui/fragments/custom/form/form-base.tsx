import type { InputProps } from "@/components/ui/fragments/shadcn-ui/input"
import type { ReactNode } from "react"
import { useFieldContext } from "@/hooks/use-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/fragments/shadcn-ui/field"
import type { IconSvgElement } from "@hugeicons/react"
import { useStore } from "@tanstack/react-store"
export type FormControlProps = {
  label?: string
  description?: string
  type?: InputProps["type"]
  placeholder?: string
  className?: string
  LeftIcon: IconSvgElement
}

type FormBaseProps = FormControlProps & {
  children: ReactNode
  horizontal?: boolean
  controlFirst?: boolean
  inputClassName?: string
  isValidClassName?: string
  isFocusClassName?: string
}

export function FormBase({
  children,

  label,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps) {
  const field = useFieldContext()

  const submissionAttempts = useStore(
    field.form.baseStore,
    (state) => state.submissionAttempts
  )

  const hasErrors = field.state.meta.errors.length > 0
  const isInvalid =
    hasErrors && (field.state.meta.isTouched || submissionAttempts > 0)

  const labelElement = <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

  const captionElem = isInvalid ? (
    <FieldError className="mt-2 text-xs" errors={field.state.meta.errors} />
  ) : !isInvalid && description ? (
    <FieldDescription>{description}</FieldDescription>
  ) : null

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {captionElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {captionElem}
        </>
      )}
    </Field>
  )
}
