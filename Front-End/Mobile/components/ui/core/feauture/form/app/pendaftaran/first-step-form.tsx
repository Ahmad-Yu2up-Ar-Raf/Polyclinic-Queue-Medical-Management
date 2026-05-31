// File: @/components/ui/core/feauture/antrian/register-form.tsx
import * as React from 'react';
import { View } from 'react-native';
import { useFirstStepForm } from '@/hooks/form/use-pendaftaran';
import { firstStepSchema, pendaftaranBaruSchema } from '@/lib/validations/pendaftaran-validation';

import { JenisKelaminRadioGroup } from '../../radio/jeni-kelamin-radio';
import {
  Call02FreeIcons,
  IdentityCardFreeIcons,
  MapPinHouseFreeIcons,
  User,
} from '@hugeicons/core-free-icons';

interface FirstStepFormProps {
  readonly onSubmitRef: (submitFn: () => void) => void;
  readonly onLoadingChange: (loading: boolean) => void;
}

export default function FirstStepForm({
  onSubmitRef,
  onLoadingChange,
}: FirstStepFormProps): React.ReactElement {
  const handleFirstStep = useFirstStepForm();
  const form = handleFirstStep;

  React.useEffect(() => {
    onSubmitRef(form.handleSubmit);
  }, [form.handleSubmit, onSubmitRef]);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => {
        React.useEffect(() => {
          onLoadingChange(isSubmitting);
        }, [isSubmitting]);

        return (
          <View className="mt-4 w-full flex-col gap-6">
            <form.AppField
              name="nama"
              validators={{
                onChange: ({ value }) => {
                  const result = firstStepSchema.shape.nama.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Input
                  variant="border"
                  LeftIcon={User}
                  // ✅ FIX: Label tegas, placeholder kasih contoh nama
                  label="Nama Lengkap"
                  placeholder=" Budi Santoso"
                  autoCapitalize="words"
                  autoComplete="name"
                />
              )}
            </form.AppField>

            <form.AppField
              name="nik"
              validators={{
                onChange: ({ value }) => {
                  const result = firstStepSchema.shape.nik.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Input
                  variant="border"
                  iconColor="hsl(260, 30%, 60%)"
                  LeftIcon={IdentityCardFreeIcons}
                  // ✅ FIX: Kasih tau user berapa digit yang dibutuhin
                  label="NIK"
                  placeholder="Masukkan 16 digit NIK"
                  keyboardType="numeric"
                  autoComplete="off"
                  inputClassName="text-purple-500"
                  isFocusClassName="border-purple-500 bg-purple-50"
                  isValidClassName="border-purple-500 bg-purple-50"
                  textContentType="none"
                  autoCapitalize="none"
                  maxLength={16}
                />
              )}
            </form.AppField>

            <form.AppField
              name="no_hp"
              validators={{
                onChange: ({ value }) => {
                  const result = firstStepSchema.shape.no_hp.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Input
                  variant="border"
                  iconColor="hsl(120, 100%, 50%)"
                  LeftIcon={Call02FreeIcons}
                  // ✅ FIX: Kasih contoh format nomor HP lokal
                  label="Nomor HP"
                  placeholder=" 081234567890"
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  inputClassName="text-green-500"
                  isFocusClassName="border-green-500 bg-green-50"
                  isValidClassName="border-green-500 bg-green-50"
                  textContentType="telephoneNumber"
                  autoCapitalize="none"
                />
              )}
            </form.AppField>

            <form.AppField
              name="alamat"
              validators={{
                onChange: ({ value }) => {
                  const result = firstStepSchema.shape.alamat.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Textarea
                  variant="border"
                  iconColor={'hsl(45, 100%, 50%)'}
                  LeftIcon={MapPinHouseFreeIcons}
                  // ✅ FIX: Biar user tau ekspektasi seberapa detail alamatnya
                  label="Alamat"
                  placeholder=" Jl. Merdeka No. 1, RT 01/RW 02"
                  keyboardType="default"
                  autoComplete="address-line1"
                  textContentType="addressCityAndState"
                  autoCapitalize="sentences"
                  className="mb-3"
                />
              )}
            </form.AppField>

            <form.AppField
              name="jenis_kelamin"
              validators={{
                onChange: ({ value }) => {
                  const result = firstStepSchema.shape.jenis_kelamin.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => <JenisKelaminRadioGroup field={field} isSubmitting={isSubmitting} />}
            </form.AppField>

            <form.AppField
              name="tanggal_lahir"
              validators={{
                onChange: ({ value }) => {
                  const result = firstStepSchema.shape.tanggal_lahir.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.DateInput
                  label="Tanggal Lahir"
                  // ✅ Date picker lumayan oke pakai instruksi action
                  placeholder="Pilih tanggal lahir"
                  maximumDate={yesterday}
                  minimumDate={new Date(1924, 0, 1)}
                />
              )}
            </form.AppField>
          </View>
        );
      }}
    </form.Subscribe>
  );
}
