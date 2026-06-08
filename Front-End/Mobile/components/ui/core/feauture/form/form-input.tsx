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
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { Eye, EyeOff } from '@hugeicons/core-free-icons';
export interface FormInputProps extends Omit<TextInputProps, 'style'> {
  LeftIcon?: IconSvgElement;
  isPassword?: boolean;
  showError?: boolean;

  iconColor?: string;
  label?: string;
  inputClassName?: string;
  isValidClassName?: string;
  isFocusClassName?: string;
  variant?: 'default' | 'border';
}

export function FormInput({
  LeftIcon,
  isPassword,
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
  const [showPassword, setShowPassword] = React.useState(true);
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

 
          !isFocused && !isValid && !isInvalid && normalBorderClass,

          (isFocused || isValid) && !isInvalid && [activeBorderClass, 'bg-primary/5'],
          isFocused && !isInvalid && isFocusClassName,
          isValid && !isInvalid && isValidClassName,

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
            'h-12 rounded-none border-0 text-sm shadow-none transition-all duration-200',
            LeftIcon ? 'pl-12' : 'pl-3',

            !isInvalid && 'text-primary',
            !isInvalid && inputClassName,
            isFocused && !isInvalid && 'bg-primary/5',
            isValid && !isInvalid && 'bg-primary/5',

            isValid && !isInvalid && isValidClassName,
            isFocused && !isInvalid && isFocusClassName,
            isInvalid && 'bg-destructive/5 text-destructive',
            field.form.state.isSubmitting && field.form.state.submissionAttempts > 0 && 'opacity-50'
          )}
          placeholderTextColor={
            isInvalid ? colors.destructive : isFocused ? primaryColor : colors.mutedForeground
          }
          secureTextEntry={isPassword ? showPassword : false}
          {...props}
        />
        {isPassword && (
          <Button
            disabled={field.form.state.isSubmitting}
            variant="ghost"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-none"
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Icon color={currentIconColor} icon={Eye} size={18} />
            ) : (
              <Icon color={currentIconColor} icon={EyeOff} size={18} />
            )}
          </Button>
        )}
      </View>

      {isInvalid && showError && (
        <Text className="mt-2 text-xs text-destructive">* {errorMessage}</Text>
      )}
    </View>
  );
}
