// File: src/components/ui/core/form/form-input.tsx
import React, { useState } from 'react';
import { TextInputProps, View } from 'react-native';
import { Input } from '@/components/ui/fragments/shadcn-ui/input';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { useFieldContext } from '@/hooks/form/form-context';
import { useFormFieldState } from '@/utils/form-utils';
import { cn } from '@/lib/utils';
import type { IconSvgElement } from '@hugeicons/react-native';

export interface FormInputProps extends Omit<TextInputProps, 'style'> {
  LeftIcon?: IconSvgElement;
  showError?: boolean;
  iconColor?: string;
  isValidClassName?: string;
  label?: string;
  inputClassName?: string;
  isFocusClassName?: string;
  variant?: 'default' | 'border';
}

export function FormInput({
  LeftIcon,
  showError = true,
  iconColor,
  className,
  label,
  isValidClassName,
  inputClassName,
  isFocusClassName,
  variant = 'default',
  ...props
}: FormInputProps) {
  const field = useFieldContext<string>();
  const [isFocused, setIsFocused] = useState(false);

  const { errorMessage, isInvalid, isValid, colors } = useFormFieldState(field);
  const primaryColor = iconColor ?? colors.primary;

  const isDefault = variant === 'default';

  const baseBorderClass = isDefault ? 'border-b rounded-none' : 'border rounded-xl';
  const normalBorderClass = isDefault ? 'border-b-border' : 'border-border';
  const activeBorderClass = isDefault ? 'border-b-primary' : 'border-primary';
  const errorBorderClass = isDefault ? 'border-b-destructive' : 'border-destructive';

  // 1. EKSTRAK LOGIKA WARNA ICON: Biar mutlak pas invalid jadi merah
  const currentIconColor = isInvalid
    ? colors.destructive
    : isFocused || isValid
      ? primaryColor
      : primaryColor;

  return (
    <View className={cn('mb-4 w-full', className)}>
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
      <View
        className={cn(
          'relative w-full overflow-hidden text-foreground transition-all duration-200',
          baseBorderClass,

          // State: Normal
          !isFocused && !isValid && !isInvalid && normalBorderClass,

          // State: Focused atau Valid
          // (UDAH DI FIX: Hanya aktif JIKA TIDAK INVALID)
          (isFocused || isValid) && !isInvalid && [activeBorderClass, 'bg-primary/5'],
          isFocused && !isInvalid && isFocusClassName,
          isValid && !isInvalid && isValidClassName,

          // State: Invalid (Error) - SEKARANG MENANG ABSOLUT
          isInvalid && [errorBorderClass, 'bg-destructive/5 text-destructive']
        )}>
        {LeftIcon && (
          <View className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
            <Icon icon={LeftIcon} size={16} color={currentIconColor} />
          </View>
        )}

        <Input
          id={field.name}
          value={field.state.value ?? ''}
          onBlur={() => {
            setIsFocused(false);
            field.handleBlur();
          }}
          onFocus={() => setIsFocused(true)}
          onChangeText={field.handleChange}
          editable={!field.form.state.isSubmitting || field.form.state.submissionAttempts === 0}
          className={cn(
            // 2. UDAH DIBERSIHIN: Gak ada lagi logic border/bg ganda di dalem Input ini
            'h-12 border-0  text-sm shadow-none transition-all duration-200',
            LeftIcon ? 'pl-12' : 'pl-3',

            // 3. FIX POSISI KELAS WARNA TEKS
            // Terapin input class kustom/normal HANYA jika TIDAK INVALID
            !isInvalid && 'text-primary',
            !isInvalid && inputClassName,
            isFocused && !isInvalid && 'bg-primary/5',
            isValid && !isInvalid && 'bg-primary/5',
            // Taruh logic error di PALING BAWAH biar ga ada yang bisa nimpa text-destructive
            isValid && !isInvalid && isValidClassName,
            isFocused && !isInvalid && isFocusClassName,
            isInvalid && 'bg-destructive/5 text-destructive',
            field.form.state.isSubmitting && field.form.state.submissionAttempts > 0 && 'opacity-50'
          )}
          placeholderTextColor={
            isInvalid ? colors.destructive : isFocused ? primaryColor : colors.mutedForeground
          }
          {...props}
        />
      </View>

      {isInvalid && showError && (
        <Text className="mt-2 text-xs text-destructive">* {errorMessage}</Text>
      )}
    </View>
  );
}
