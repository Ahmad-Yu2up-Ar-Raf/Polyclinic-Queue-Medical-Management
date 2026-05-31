/**
 * FormDateInput Component - Enterprise-grade Date Picker Integration
 *
 * Seamlessly integrated with TanStack React Form ecosystem
 * - Native date picker modal (iOS + Android)
 * - ISO string storage (YYYY-MM-DD)
 * - Readable display format (Indonesian locale)
 * - Full error validation support
 * - Type-safe with generic <string> value
 * - NativeWind styling consistency
 */

import React, { useState, useCallback } from 'react';
import { View, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
import { Icon } from '@/components/ui/fragments/shadcn-ui/icon';
import { useFieldContext } from '@/hooks/form/form-context';
import { useFormFieldState } from '@/utils/form-utils';
import { cn } from '@/lib/utils';
import { formatDateForDisplay, parseISOToDate, formatDateToISO } from '@/utils/date-formatter';
import { Calendar } from '@hugeicons/core-free-icons';
import type { FieldApi } from '@tanstack/react-form';

/**
 * FormDateInput Component Props
 */
export interface FormDateInputProps {
  readonly placeholder?: string;
  readonly label?: string;
  readonly showError?: boolean;
  readonly minimumDate?: Date;
  readonly maximumDate?: Date;
  readonly className?: string;
  readonly mode?: 'date' | 'time' | 'datetime';
  readonly disabled?: boolean;
}

/**
 * FormDateInput Component - Reusable date picker field
 *
 * Features:
 * - Looks and feels like FormInput
 * - Opens native date picker on press
 * - Stores date as ISO string (YYYY-MM-DD)
 * - Displays date in readable format
 * - Full error validation
 * - Supports min/max date restrictions
 * - Responsive to form state changes
 *
 * @example
 * ```tsx
 * <form.AppField
 *   name="tanggal_lahir"
 *   validators={{
 *     onChange: ({ value }) => {
 *       const result = schema.shape.tanggal_lahir.safeParse(value);
 *       return result.success ? undefined : result.error.issues[0].message;
 *     },
 *   }}
 * >
 *   {(field) => (
 *     <field.DateInput
 *       label="Tanggal Lahir"
 *       placeholder="Pilih tanggal lahir"
 *       maximumDate={new Date()} // Can't select future date
 *     />
 *   )}
 * </form.AppField>
 * ```
 */
export function FormDateInput({
  placeholder = 'Pilih tanggal',
  label,
  showError = true,
  minimumDate,
  maximumDate,
  className,
  mode = 'date',
  disabled: disabledProp = false,
}: FormDateInputProps): React.ReactElement {
  // ============================================
  // HOOKS
  // ============================================

  // Get field from TanStack Form context
  const field = useFieldContext<string>();

  // Get form field state (errors, colors, etc.)
  const { errorMessage, isInvalid, colors } = useFormFieldState(field);

  // Local state for date picker modal visibility
  const [showPicker, setShowPicker] = useState(false);

  // ============================================
  // COMPUTED VALUES
  // ============================================

  // Parse current field value to Date object (or use today)
  const selectedDate = parseISOToDate(field.state.value as string) || new Date();

  // Format field value for display (ISO → readable format)
  const displayValue = formatDateForDisplay(field.state.value as string);

  // Check if input should be disabled
  // Only disable during form submission, NOT during validation errors
  const isDisabled =
    disabledProp || (field.form.state.isSubmitting && field.form.state.submissionAttempts > 0);

  // ============================================
  // EVENT HANDLERS
  // ============================================

  /**
   * Handle date picker value change
   * Platform-specific:
   * - Android: Auto-closes and commits immediately
   * - iOS: Commits when user confirms
   */
  const handleDateChange = useCallback(
    (event: any, date: Date | undefined) => {
      if (!date) {
        // User cancelled on Android
        setShowPicker(false);
        return;
      }

      // Convert Date to ISO string and update form field
      const isoDateString = formatDateToISO(date);
      field.handleChange(isoDateString);
      field.handleBlur();

      // Android auto-closes after selection
      // iOS picker will close when user taps outside
      if (Platform.OS === 'android') {
        setShowPicker(false);
      }
    },
    [field]
  );

  /**
   * Handle opening date picker
   */
  const handleOpenPicker = useCallback(() => {
    if (isDisabled) return;
    setShowPicker(true);
  }, [isDisabled]);

  // ============================================
  // RENDER
  // ============================================

  return (
    <View className={cn('mb-4 w-full', className)}>
      {/* Label */}
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

      {/* Date Picker Trigger (Pressable) */}
      <Pressable
        disabled={isDisabled}
        onPress={handleOpenPicker}
        className={cn(
          'flex-row items-center gap-3 rounded-2xl border border-border',
          'bg-background px-3 py-3 transition-all duration-200',
          isDisabled ? 'opacity-50' : 'active:bg-muted active:opacity-75',
          isInvalid && 'border-destructive bg-destructive/5',
          displayValue && 'border-primary bg-primary/5'
        )}>
        {/* Calendar Icon */}
        <Icon icon={Calendar} size={18} color={isInvalid ? colors.destructive : colors.primary} />

        {/* Display Value or Placeholder */}
        <Text
          className={cn(
            'flex-1 text-base',
            displayValue ? 'font-figtree_regular text-foreground' : 'text-muted-foreground',

            isInvalid && 'text-destructive',
            displayValue && 'text-primary'
          )}>
          {displayValue || placeholder}
        </Text>
      </Pressable>

      {/* Error Message */}
      {isInvalid && showError && (
        <View className="mt-2">
          <Text className="text-xs text-destructive">* {errorMessage}</Text>
        </View>
      )}

      {/* Native Date Picker Modal */}
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          textColor={colors.primary}
        />
      )}
    </View>
  );
}
