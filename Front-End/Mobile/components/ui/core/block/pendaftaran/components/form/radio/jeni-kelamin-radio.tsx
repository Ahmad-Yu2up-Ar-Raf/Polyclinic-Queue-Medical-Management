import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import { cn } from '@/lib/utils';
import { RadioGroupItem } from '@/components/ui/fragments/shadcn-ui/radio-group';
import { MaleSymbolIcon, FemaleSymbolIcon } from '@hugeicons/core-free-icons';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { THEME } from '@/lib/theme';
import { useFormFieldState } from '@/utils/form-utils';
import { IconSvgElement } from '@hugeicons/react-native';

// ✅ TYPE DEFINITIONS
type JenisKelaminId = 'pria' | 'wanita';

interface JenisKelaminOption {
  readonly id: JenisKelaminId;
  readonly title: string;
  readonly icon: IconSvgElement;
}

// ✅ IMPORTANT: Include null to match Zod schema (jenis_kelamin?: ... | null | undefined)
interface JenisKelaminRadioGroupProps {
  field: {
    state: { value: JenisKelaminId | null | undefined };
    handleChange: (value: JenisKelaminId) => void;
    handleBlur: () => void;
    // ✅ Use generic type instead of any
    RadioGroup: React.ComponentType<{
      className?: string;
      label?: string;
      children?: React.ReactNode;
    }>;
  };
  isSubmitting: boolean;
}

// ✅ CONSTANTS (readonly)
const JENIS_KELAMIN: readonly JenisKelaminOption[] = [
  {
    id: 'pria',
    title: 'Pria',
    icon: MaleSymbolIcon,
  },
  {
    id: 'wanita',
    title: 'Wanita',
    icon: FemaleSymbolIcon,
  },
] as const;

export function JenisKelaminRadioGroup({
  field,
  isSubmitting,
}: JenisKelaminRadioGroupProps): React.ReactElement {
  const { isInvalid } = useFormFieldState(field);

  // ✅ Helper: Check if selected (handles null/undefined properly)
  const isSelected = (methodId: JenisKelaminId): boolean => field.state.value === methodId;

  // ✅ Helper: Select with proper type
  const handleSelect = (methodId: JenisKelaminId): void => {
    if (isSubmitting) return;
    field.handleChange(methodId);
    field.handleBlur();
  };

  // ✅ Helper: Get color based on gender
  const getColorForGender = (id: JenisKelaminId, isSelectedValue: boolean): string => {
    if (isInvalid && !isSelectedValue) return THEME.light.destructive;
    THEME.light.mutedForeground;
    return id === 'pria' ? THEME.light.primary : 'hsl(330 81.2% 60.4%)';
  };

  const getBorderColorForGender = (id: JenisKelaminId): string =>
    id === 'pria' ? 'border-primary bg-primary/5' : 'border-pink-500 bg-pink-500/5';

  // ✅ Helper: Get background color for icon circle
  const getIconBgForGender = (id: JenisKelaminId): string =>
    id === 'pria' ? 'bg-primary/20' : 'bg-pink-500/20';

  // ✅ Helper: Get text color for gender
  const getTextColorForGender = (id: JenisKelaminId): string =>
    id === 'pria' ? 'text-primary' : 'text-pink-500';

  // ✅ Helper: Get border color for radio button
  const getRadioColorForGender = (id: JenisKelaminId): string =>
    id === 'pria' ? 'border-primary' : 'border-pink-500';
  const getRadioColorIndicatorForGender = (id: JenisKelaminId): string =>
    id === 'pria' ? 'bg-primary' : 'bg-pink-500';

  return (
    <View className="gap-5">
      <field.RadioGroup
        className="flex-row items-center justify-between gap-3"
        label="Jenis Kelamin">
        {JENIS_KELAMIN.map((method) => {
          const selected = isSelected(method.id);

          return (
            <Pressable
              key={method.id}
              disabled={isSubmitting}
              onPress={() => handleSelect(method.id)}
              className={cn(
                'w-fit flex-1 flex-row items-center gap-3.5 rounded-2xl border p-4 transition-all',
                selected
                  ? getBorderColorForGender(method.id)
                  : 'border-border bg-card active:bg-muted active:opacity-65',
                isInvalid && !selected && 'border-destructive bg-destructive/5',
                isSubmitting && 'opacity-50'
              )}>
              <View className={cn('flex size-6 items-center justify-center rounded-full')}>
                <Icon icon={method.icon} size={20} color={getColorForGender(method.id, selected)} />
              </View>

              <View className="flex-1">
                <Text
                  className={cn(
                    'text-sm',
                    selected
                      ? `font-figtree_bold ${getTextColorForGender(method.id)}`
                      : 'font-figtree_medium text-muted-foreground',
                    isInvalid && !selected && 'text-destructive'
                  )}>
                  {method.title}
                </Text>
              </View>

              <RadioGroupItem
                value={method.id}
                indicatorClassName={cn(
                  selected ? getRadioColorIndicatorForGender(method.id) : '',
                  isInvalid && !selected && 'bg-destructive'
                )}
                className={cn(
                  selected ? getRadioColorForGender(method.id) : '',
                  isInvalid && !selected && 'border-destructive'
                )}
              />
            </Pressable>
          );
        })}
      </field.RadioGroup>
    </View>
  );
}
