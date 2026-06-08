import * as React from 'react';
import { View } from 'react-native';
import { useSecondStepForm } from '@/components/ui/core/block/pendaftaran/hooks/use-pendaftaran';
import { secondStepSchema } from '@/components/ui/core/block/pendaftaran/schema/pendaftaran-validation';
import { PaymentMethodRadioGroup } from '@/components/ui/core/block/pendaftaran/components/form/radio/metode-pembayaran-radio';
import { SelectType } from '../../types/select-type';

interface SecondStepFormProps {
  readonly onSubmitRef: (submitFn: () => void) => void;
  readonly onLoadingChange: (loading: boolean) => void;
  polis: SelectType[];
}

export default function SecondStepForm({
  onSubmitRef,
  polis,
  onLoadingChange,
}: SecondStepFormProps): React.ReactElement {
  const handleSecondStep = useSecondStepForm();
  const form = handleSecondStep;

  React.useEffect(() => {
    onSubmitRef(form.handleSubmit);
  }, [form.handleSubmit, onSubmitRef]);

  const poliOptions = polis.map((p) => ({ label: p.nama, value: p.id.toString() }));
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => {
        React.useEffect(() => {
          onLoadingChange(isSubmitting);
        }, [isSubmitting]);

        return (
          <View className="mt-4 w-full flex-col gap-6">
            <form.AppField
              name="poli_id"
              validators={{
                onChange: ({ value }) => {
                  const result = secondStepSchema.shape.poli_id.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Select label="Poli Tujuan" options={poliOptions} placeholder="Pilih Poli" />
              )}
            </form.AppField>
            <form.AppField
              name="jadwal_kunjungan"
              validators={{
                onChange: ({ value }) => {
                  const result = secondStepSchema.shape.jadwal_kunjungan.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.DateInput
                  label="Tanggal Kunjungan"
                  placeholder="Pilih jadwal"
                  minimumDate={new Date()}
                />
              )}
            </form.AppField>
            <form.AppField
              name="metode_pembayaran"
              validators={{
                onChange: ({ value }) => {
                  const result = secondStepSchema.shape.metode_pembayaran.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => <PaymentMethodRadioGroup field={field} isSubmitting={isSubmitting} />}
            </form.AppField>
          </View>
        );
      }}
    </form.Subscribe>
  );
}
