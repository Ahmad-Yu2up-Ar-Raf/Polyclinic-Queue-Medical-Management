import React from "react"
import { useStore } from "@tanstack/react-store"
import { FormBase, type FormControlProps } from "./form-base"
import { useFieldContext } from "@/hooks/use-form"
import { RadioGroup, RadioGroupItem } from "../../shadcn-ui/radio-group"
import { Label } from "../../shadcn-ui/label"
import { cn } from "@/lib/utils"

export type FormRadioGroupProps = Omit<FormControlProps, "LeftIcon"> & {
  LeftIcon?: any
  options: {
    label: string | React.ReactNode
    value: string
    icon?: React.ReactNode
  }[]
  containerClassName?: string
}

export function FormRadioGroup(props: FormRadioGroupProps) {
  const field = useFieldContext<string>()

  const isSubmitting = useStore(
    field.form.baseStore,
    (state) => state.isSubmitting
  )

  const value = field.state.value ?? ""

  return (
    <FormBase LeftIcon={props.LeftIcon} {...props}>
      <RadioGroup
        id={field.name}
        name={field.name}
        value={value}
        disabled={isSubmitting}
        onValueChange={(val) => field.handleChange(val)}
        className={cn("grid w-full gap-3", props.containerClassName)}
      >
        {props.options.map((option) => (
          <Label
            key={option.value}
            htmlFor={`${field.name}-${option.value}`}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-none border-b-2 bg-background p-4 transition-all hover:bg-muted/30",
              value === option.value
                ? "border-b-primary bg-primary/5 text-primary"
                : "border-b-border text-muted-foreground"
            )}
          >
            <RadioGroupItem
              value={option.value}
              id={`${field.name}-${option.value}`}
              className="sr-only"
            />
            {option.icon && (
              <div className="size-4 shrink-0 transition-colors">
                {option.icon}
              </div>
            )}
            <span className="text-sm font-medium">{option.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </FormBase>
  )
}
