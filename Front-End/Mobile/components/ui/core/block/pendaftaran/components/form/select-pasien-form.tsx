import * as React from 'react';
import { View } from 'react-native';

import { selectPasien } from '@/components/ui/core/block/pendaftaran/schema/pendaftaran-validation';

import { useSelectPasien } from '../../hooks/use-pendaftaran';
import { SelectType } from '../../types/select-type';
import { Users } from '@hugeicons/core-free-icons';
import { THEME } from '@/lib/theme';

interface SelectPasienFormProps {
  readonly onSubmitRef: (submitFn: () => void) => void;
  readonly onLoadingChange: (loading: boolean) => void;
  readonly onDirtyChange: (isDirty: boolean) => void;
  pasien: SelectType[];
}

export default function SelectPasienForm({
  onSubmitRef,
  pasien,
  onLoadingChange,
  onDirtyChange,
}: SelectPasienFormProps): React.ReactElement {
  const handleSellectPasien = useSelectPasien();
  const form = handleSellectPasien;

  React.useEffect(() => {
    onSubmitRef(form.handleSubmit);
  }, [form.handleSubmit, onSubmitRef]);

  const pasienOptions = pasien.map((p) => ({
    label: `${p.nama} - ${p.nik}`,
    value: p.id.toString(),
  }));
  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        isDirty: state.isDirty,
      })}>
      {({ isSubmitting, isDirty }) => {
        React.useEffect(() => {
          onLoadingChange(isSubmitting);
        }, [isSubmitting, onLoadingChange]);
        React.useEffect(() => {
          onDirtyChange(isDirty);
        }, [isDirty, onDirtyChange]);

        return (
          <View className="mt-4 w-full flex-col gap-6">
            <form.AppField
              name="pasien_id"
              validators={{
                onChange: ({ value }) => {
                  const result = selectPasien.shape.pasien_id.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Select
                  primaryColor={THEME.light.primary}
                  label="Pasien"
                  isValidClassName="border-primary bg-primary/5 text-primary"
                  options={pasienOptions}
                  placeholder="Pilih pasien"
                  icon={Users}
                />
              )}
            </form.AppField>
          </View>
        );
      }}
    </form.Subscribe>
  );
}
