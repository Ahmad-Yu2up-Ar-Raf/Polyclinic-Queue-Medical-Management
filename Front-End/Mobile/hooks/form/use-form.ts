// File: src/hooks/use-form.ts (atau lokasi file lu)
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './form-context';
import { FormInput } from '@/components/ui/core/feauture/form/form-input';
import { FormTextarea } from '@/components/ui/core/feauture/form/form-textarea';
import { FormSelect } from '@/components/ui/core/feauture/form/form-select';
// 🎯 IMPORT KOMPONEN BARU
import { FormRadioGroup } from '@/components/ui/core/feauture/form/form-radio-group';
import { FormDateInput } from '@/components/ui/core/feauture/form/form-date-input';

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    RadioGroup: FormRadioGroup,
    DateInput: FormDateInput, // ✅ NEW: Registered date input
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm };
