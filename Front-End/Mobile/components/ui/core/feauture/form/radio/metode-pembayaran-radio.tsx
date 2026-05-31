import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import { cn } from '@/lib/utils';
import { RadioGroupItem } from '@/components/ui/fragments/shadcn-ui/radio-group';
import { HeartAddFreeIcons, Money01FreeIcons } from '@hugeicons/core-free-icons';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { THEME } from '@/lib/theme';
import { useFormFieldState } from '@/utils/form-utils';
import { IconSvgElement } from '@hugeicons/react-native';

// ✅ TYPE DEFINITIONS
type PaymentMethodId = 'mandiri' | 'BPJS';

interface PaymentMethodOption {
  readonly id: PaymentMethodId;
  readonly title: string;
  readonly desc: string;
  readonly icon: IconSvgElement;
}

// ✅ IMPORTANT: Include null to match Zod schema (metode_pembayaran can be null from form state)
interface PaymentMethodRadioGroupProps {
  field: {
    state: { value: PaymentMethodId | null | undefined };
    handleChange: (value: PaymentMethodId) => void;
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
const PAYMENT_METHODS: readonly PaymentMethodOption[] = [
  {
    id: 'mandiri',
    title: 'Bayar Tunai',
    desc: 'Bayar langsung di kasir poliklinik.',
    icon: Money01FreeIcons,
  },
  {
    id: 'BPJS',
    title: 'BPJS Kesehatan',
    desc: 'Gunakan layanan asuransi BPJS.',
    icon: HeartAddFreeIcons,
  },
] as const;

export function PaymentMethodRadioGroup({
  field,
  isSubmitting,
}: PaymentMethodRadioGroupProps): React.ReactElement {
  const { isInvalid } = useFormFieldState(field);

  // ✅ Helper: Check if selected (handles null/undefined properly)
  const isSelected = (methodId: PaymentMethodId): boolean => field.state.value === methodId;

  // ✅ Helper: Select with proper type
  const handleSelect = (methodId: PaymentMethodId): void => {
    if (isSubmitting) return;
    field.handleChange(methodId);
    field.handleBlur();
  };

  // ✅ Helper: Get icon color
  const getColorForGender = (id: PaymentMethodId, isSelectedValue: boolean): string => {
    if (isInvalid && !isSelectedValue) return THEME.light.destructive;
    THEME.light.mutedForeground;
    return id === 'BPJS' ? 'hsl(140 69.3% 39.6%)' : 'hsl(311 46.4% 30%)';
  };

  const getBorderColorForPaymentMetod = (id: PaymentMethodId): string =>
    id === 'BPJS' ? 'border-green-500 bg-green-500/5' : 'border-purple-500 bg-purple-500/5';

  // ✅ Helper: Get background color for icon circle
  const getIconBgForPaymentMetod = (id: PaymentMethodId): string =>
    id === 'BPJS' ? 'bg-green-500/20' : 'bg-purple-500/20';

  // ✅ Helper: Get text color for gender
  const getTextColorForPaymentMetod = (id: PaymentMethodId): string =>
    id === 'BPJS' ? 'text-green-500' : 'text-purple-500';

  // ✅ Helper: Get border color for radio button
  const getRadioColorForPaymentMetod = (id: PaymentMethodId): string =>
    id === 'BPJS' ? 'border-green-500' : 'border-purple-500';

  const getRadioColorIndicatorForPaymentMetod = (id: PaymentMethodId): string =>
    id === 'BPJS' ? 'bg-green-500' : 'bg-purple-500';

  return (
    <View className="gap-5">
      <field.RadioGroup className="flex-col gap-3" label="Metode Pembayaran">
        {PAYMENT_METHODS.map((method) => {
          const selected = isSelected(method.id);

          return (
            <Pressable
              key={method.id}
              disabled={isSubmitting}
              onPress={() => handleSelect(method.id)}
              className={cn(
                'flex-row items-center gap-4 rounded-2xl border p-4 transition-all',
                selected
                  ? getBorderColorForPaymentMetod(method.id)
                  : 'border-border bg-card active:bg-muted active:opacity-65',
                isInvalid && !selected && 'border-destructive bg-destructive/5',
                isSubmitting && 'opacity-50'
              )}>
              <View
                className={cn(
                  'flex size-10 items-center justify-center rounded-full',
                  selected ? getIconBgForPaymentMetod(method.id) : 'bg-muted',
                  isInvalid && !selected && 'bg-destructive/20'
                )}>
                <Icon icon={method.icon} size={20} color={getColorForGender(method.id, selected)} />
              </View>

              <View className="flex-1">
                <Text
                  className={cn(
                    'text-base',
                    selected
                      ? `font-figtree_bold ${getTextColorForPaymentMetod(method.id)}`
                      : 'font-figtree_medium text-muted-foreground',
                    isInvalid && !selected && 'text-destructive'
                  )}>
                  {method.title}
                </Text>
                <Text
                  className={cn(
                    'mt-1 text-xs text-muted-foreground',
                    isInvalid && !selected && 'text-destructive/80'
                  )}>
                  {method.desc}
                </Text>
              </View>

              <RadioGroupItem
                value={method.id}
                indicatorClassName={cn(
                  selected ? getRadioColorIndicatorForPaymentMetod(method.id) : '',
                  isInvalid && !selected && 'bg-destructive'
                )}
                className={cn(
                  selected ? getRadioColorForPaymentMetod(method.id) : '',
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
