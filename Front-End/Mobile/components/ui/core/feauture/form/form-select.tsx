import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/fragments/shadcn-ui/select';
import { useFieldContext } from '@/hooks/form/form-context';
import { useFormFieldState } from '@/utils/form-utils';
import { cn } from '@/lib/utils';
import type { Option } from '@/components/ui/fragments/shadcn-ui/select';
import { THEME } from '@/lib/theme';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { Building } from '@hugeicons/core-free-icons';

export interface FormSelectProps {
  options: Option[];
  placeholder?: string;
  showError?: boolean;
  className?: string;
  label?: string;
}

export function FormSelect({
  options,
  placeholder = 'Pilih...',
  showError = true,
  className,
  label,
}: FormSelectProps) {
  const field = useFieldContext<string>();
  const { errorMessage, isInvalid, colors, isValid } = useFormFieldState(field);

  const selectedOption = useMemo(() => {
    return options.find((opt) => String(opt?.value) === String(field.state.value)) || undefined;
  }, [options, field.state.value]);
  const [triggerWidth, setTriggerWidth] = useState(0);
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
      <Select
        value={selectedOption}
        onValueChange={(option: Option | undefined) => {
          if (option) {
            field.handleChange(option.value);
            field.handleBlur();
          }
        }}
        disabled={field.form.state.isSubmitting}>
        <SelectTrigger
          onLayout={(event) => {
            setTriggerWidth(event.nativeEvent.layout.width);
          }}
          className={cn(
            isInvalid && 'border-destructive bg-destructive/5 text-destructive',
            isValid && 'border-pink-500',
            'h-12 rounded-2xl',
            field.form.state.isSubmitting && 'opacity-50',
            isValid && 'bg-pink-50',
            'active:bg-muted'
          )}
          color={isInvalid ? THEME.light.destructive : THEME.dark.foreground}>
          <View className="flex flex-row items-center">
            <Icon
              icon={Building}
              size={18}
              color={isInvalid ? colors.destructive : 'hsl(330 81.2% 60.4%)'}
            />
            <SelectValue
              className={cn(
                !selectedOption && 'text-muted-foreground/50',
                !isValid && 'text-muted-foreground',
                isInvalid ? 'text-destructive' : 'text-foreground',
                'px-3',
                isValid && 'text-pink-500'
              )}
              placeholder={placeholder}
            />
          </View>
        </SelectTrigger>

        <SelectContent
          position="popper" // <--- KUNCI UTAMA: Ini memberi tahu content untuk mengikuti trigger
          className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]"
          style={{ width: triggerWidth }} // Jika menggunakan Radix/Web
          // Untuk React Native, biasanya kita gunakan props berikut:
        >
          <SelectGroup>
            {options.map((opt) => {
              const value = opt?.value ?? '';
              const label = opt?.label ?? '';

              return (
                <SelectItem key={value} label={label} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {isInvalid && showError && (
        <View className="mt-2">
          <Text className="text-xs text-destructive">* {errorMessage}</Text>
        </View>
      )}
    </View>
  );
}
