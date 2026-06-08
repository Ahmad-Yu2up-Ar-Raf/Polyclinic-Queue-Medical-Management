import * as React from 'react';
import { View } from 'react-native';
import AuthLayout from '../../layout/auth-layout';
import { useAuth } from '@/components/ui/core/block/auth/hooks/use-auth';
import { Email, Key, User } from '@hugeicons/core-free-icons';
import { registerSchema } from '@/components/ui/core/block/auth/schema/auth-validation';

export default function RegisterForm() {
  const { handleRegister } = useAuth();
  const form = handleRegister();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <AuthLayout
          onPress={form.handleSubmit}
          title="Buat Akun Baru"
          description="Daftarkan dirimu untuk memulai perjalanan."
          formType="register"
          textButton="Daftar"
          loading={isSubmitting}>
          <View className="mt-4 w-full">
            {/* ── Nama Pengguna ─────────────────────────────────────────────── */}

            <View className="grid items-center justify-between">
              <form.AppField
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const result = registerSchema.shape.name.safeParse(value);
                    return result.success ? undefined : result.error.issues[0].message;
                  },
                }}>
                {(field) => (
                  <field.Input
                    LeftIcon={User}
                    placeholder="Nama Lengkap"
                    autoCapitalize="words"
                    autoComplete="name"
                  />
                )}
              </form.AppField>

              {/* ── Email ─────────────────────────────────────────────────────── */}
              <form.AppField
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const result = registerSchema.shape.email.safeParse(value);
                    return result.success ? undefined : result.error.issues[0].message;
                  },
                }}>
                {(field) => (
                  <field.Input
                    LeftIcon={Email}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                )}
              </form.AppField>
            </View>

            {/* ── Password ──────────────────────────────────────────────────── */}
            <form.AppField
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const result = registerSchema.shape.password.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Input
                  LeftIcon={Key}
                  placeholder="Password"
                  isPassword
                  autoCapitalize="none"
                  autoComplete="new-password"
                />
              )}
            </form.AppField>
          </View>
        </AuthLayout>
      )}
    </form.Subscribe>
  );
}
