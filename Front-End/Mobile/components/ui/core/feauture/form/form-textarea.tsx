// File: src/components/ui/core/form/form-textarea.tsx
import React, { useState } from 'react';
import { TextInputProps, View } from 'react-native';
import { Textarea } from '@/components/ui/fragments/shadcn-ui/textarea';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import { useFieldContext } from '@/hooks/form/form-context';
import { useFormFieldState } from '@/utils/form-utils';
import { cn } from '@/lib/utils';
import { IconSvgElement } from '@hugeicons/react-native';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';

export interface FormTextareaProps extends Omit<TextInputProps, 'style'> {
  LeftIcon?: IconSvgElement;
  showError?: boolean;
  iconColor?: string;
  isValidClassName?: string;
  inputClassName?: string;
  isFocusClassName?: string;
  label?: string;
  // 1. Tambahkan prop variant di sini
  variant?: 'default' | 'border';
}

export function FormTextarea({
  LeftIcon,
  showError = true,
  className,
  iconColor,
  isValidClassName,
  inputClassName,
  label,
  isFocusClassName,
  variant = 'default', // 2. Set default variant
  ...props
}: FormTextareaProps) {
  const field = useFieldContext<string>();
  const [isFocused, setIsFocused] = useState(false);

  const { errorMessage, isInvalid, isValid, colors } = useFormFieldState(field);
  // Default icon color pakai warna amber jika iconColor tidak di-passing
  const primaryColor = iconColor ?? '#f59e0b'; // hex untuk text-amber-500

  const isDefault = variant === 'default';

  // 3. Helper Variables: Set base border & active color pakai amber-500
  const baseBorderClass = isDefault ? 'border-b rounded-none' : 'border rounded-xl';
  const normalBorderClass = isDefault ? 'border-b-border' : 'border-border';
  const activeBorderClass = isDefault ? 'border-b-amber-500' : 'border-amber-500';
  const errorBorderClass = isDefault ? 'border-b-destructive' : 'border-destructive';

  // Logika warna Icon
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

          // State: Focused atau Valid (Warna Amber)
          (isFocused || isValid) && !isInvalid && [activeBorderClass, 'bg-amber-500/5'],
          isFocused && !isInvalid && isFocusClassName,
          isValid && !isInvalid && isValidClassName,

          // State: Invalid (Error) - Mutlak menang
          isInvalid && [errorBorderClass, 'bg-destructive/5 text-destructive']
        )}>
        {LeftIcon && (
          // Khusus Textarea, icon agak di atas (top-4 atau top-[25%])
          <View className="absolute left-3 top-4 z-10">
            <Icon icon={LeftIcon} size={16} color={currentIconColor} />
          </View>
        )}

        <Textarea
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
            // 4. BERSHKAN REDUNDANSI: Cukup atur padding dan text di sini, background biar View yang urus
            'h-28 border-0 bg-transparent text-sm shadow-none transition-all duration-200',
            LeftIcon ? 'pl-12' : 'pl-3',
            'pt-3', // Padding top biar text nggak nabrak border atas saat variant 'border'

            // State warna text normal/custom (Amber)
            !isInvalid && 'text-amber-500',
            !isInvalid && inputClassName,
            isFocused && !isInvalid && 'bg-amber-500/10 text-amber-500',
            isValid && !isInvalid && 'bg-amber-500/10 text-amber-500',
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
