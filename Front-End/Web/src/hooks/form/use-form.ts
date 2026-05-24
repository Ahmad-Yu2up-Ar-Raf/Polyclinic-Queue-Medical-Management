import { FormInput } from "@/components/ui/fragments/custom/form/form-input"
import { createFormHook, createFormHookContexts } from "@tanstack/react-form"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    // Textarea: FormTextarea,
    // Select: FormSelect,
    // Combobox: FormCombobox,
    // Checkbox: FormCheckbox,
    // Rating: FormRating,
    // FileUpload: FormFileUpload,
    // MultiFileUpload: FormMultiFileUpload,
    // ImagesUpload: FormImagesUpload,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, useFieldContext, useFormContext }
