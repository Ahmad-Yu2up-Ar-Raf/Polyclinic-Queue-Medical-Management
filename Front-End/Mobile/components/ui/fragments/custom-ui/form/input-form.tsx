import { cn } from '@/lib/utils';
import { Text } from '../../shadcn-ui/text';
import React, { forwardRef, useState, useCallback } from 'react';
import { TextInput as TextInputB, TextInputProps, View } from 'react-native';
import { Input } from '../../shadcn-ui/input';
import type { LucideIcon } from 'lucide-react-native';

export interface FormInputProps extends Omit<TextInputProps, 'style'> {
  error?: string;
  LeftIcon?: LucideIcon;
  disabled?: boolean;
  showError?: boolean;
  className?: string;
}

export const FormInput = forwardRef<TextInputB, FormInputProps>(
  ({ error, LeftIcon, disabled, showError = true, onFocus, onBlur, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const isInvalid = !!error;

    const handleFocus = useCallback(
      (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    return (
      <View className="flex w-full flex-col gap-1.5">
        <View className="relative justify-center">
          {/* Posisi Icon di kiri yang center secara vertikal */}
          {LeftIcon && (
            <View className="absolute left-3 z-10 flex h-full items-center justify-center">
              <LeftIcon
                size={15}
                className={cn(
                  isFocused ? 'text-primary' : 'text-muted-foreground',
                  isInvalid && 'text-destructive'
                )}
              />
            </View>
          )}

          <Input
            ref={ref}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              // Override style dasar Input untuk mendapatkan look "border bottom only"
              'h-12 rounded-none border-0 border-b bg-transparent shadow-none',
              'text-base transition-all duration-200',

              // Beri jarak di sebelah kiri jika ada icon
              LeftIcon ? 'pl-12' : 'pl-2',

              // Perubahan warna border dan teks berdasarkan state Focus/Error
              isFocused
                ? 'border-b-primary text-primary placeholder:text-primary'
                : 'border-b-border text-foreground',
              isInvalid && 'border-b-destructive text-destructive',
              disabled && 'opacity-50',

              className
            )}
            // Opsional: Untuk mengubah warna placeholder sesuai state (jika setup NativeWind-mu mendukung)
            placeholderTextColor={
              isInvalid
                ? 'hsl(var(--destructive))'
                : isFocused
                  ? 'hsl(var(--primary))'
                  : 'hsl(var(--muted-foreground))'
            }
            {...props}
          />
        </View>

        {/* Indikator Error di bawah input */}
        {error && showError && <Text className="mt-1 text-sm text-destructive">* {error}</Text>}
      </View>
    );
  }
);

FormInput.displayName = 'FormInput';
