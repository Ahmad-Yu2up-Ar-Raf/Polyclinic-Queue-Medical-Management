import { FormInput } from "@/components/ui/fragments/custom/form/form-input"
import { createFormHook, createFormHookContexts } from "@tanstack/react-form"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, useFieldContext, useFormContext }
