// File: src/components/ui/core/feauture/form/form-radio-group.tsx
import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import { RadioGroup, RadioGroupItem } from '@/components/ui/fragments/shadcn-ui/radio-group';
import { useFieldContext } from '@/hooks/form/form-context';
import { useFormFieldState } from '@/utils/form-utils';
import { cn } from '@/lib/utils';

export interface FormRadioGroupOption {
  label: string;
  value: string;
}

export interface FormRadioGroupProps {
  options?: FormRadioGroupOption[];
  children?: React.ReactNode;
  showError?: boolean;
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  label?: string;
}

export function FormRadioGroup({
  options,
  children,
  showError = true,
  className,
  itemClassName,
  label,
  labelClassName,
}: FormRadioGroupProps) {
  const field = useFieldContext<string>();
  const { errorMessage, isInvalid } = useFormFieldState(field);
  const isSubmitting = field.form.state.isSubmitting;

  const handleSelect = (value: string) => {
    if (isSubmitting) return;
    field.handleChange(value);
    field.handleBlur();
  };

  return (
    <View className={cn('mb-4 w-full')}>
      {label && (
        <Text
          className={cn(
            'mb-5 px-1 font-figtree_medium text-sm tracking-widest',
            'text-foreground',
            isInvalid && showError ? 'text-destructive' : 'text-foreground'
          )}>
          {label}
        </Text>
      )}
      <RadioGroup
        value={field.state.value ?? ''}
        onValueChange={handleSelect}
        disabled={isSubmitting}
        className={cn('flex-col gap-3', className)}>
        {/* 🎯 LOGIC HYBRID: Jika ada children, render custom UI. Jika tidak, render options simpel */}
        {children
          ? children
          : options?.map((option) => {
              const isChecked = field.state.value === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(option.value)}
                  disabled={isSubmitting}
                  className={cn('flex-row items-center gap-3', isSubmitting && 'opacity-50')}>
                  <RadioGroupItem
                    aria-labelledby={`label-${option.value}`}
                    value={option.value}
                    className={cn(
                      isInvalid && 'border-destructive text-destructive',
                      itemClassName
                    )}
                  />
                  <Text
                    nativeID={`label-${option.value}`}
                    className={cn(
                      'text-base',
                      isInvalid ? 'text-destructive' : 'text-foreground',
                      isChecked && 'font-figtree_medium text-primary',
                      labelClassName
                    )}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
      </RadioGroup>

      {/* Render Pesan Error */}
      {isInvalid && showError && (
        <Text className="mt-0 text-xs text-destructive">* {errorMessage}</Text>
      )}
    </View>
  );
}
