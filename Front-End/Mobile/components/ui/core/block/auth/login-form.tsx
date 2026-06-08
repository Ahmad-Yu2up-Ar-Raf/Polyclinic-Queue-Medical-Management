// File: @/components/ui/core/feauture/auth/login-form.tsx
import * as React from 'react';
import { Platform, View } from 'react-native';
import AuthLayout from '../../layout/auth-layout';
import { useAuth } from '@/components/ui/core/block/auth/hooks/use-auth'; // ✅ Import dari unified hook
import { Email, Key } from '@hugeicons/core-free-icons';
import { loginSchema } from '@/components/ui/core/block/auth/schema/auth-validation';

import * as Haptics from 'expo-haptics';
export default function LoginForm() {
  const { handleLogin } = useAuth();
  const form = handleLogin();
  const [state, setState] = React.useState({
    termsChecked: true,
    terms2Checked: true,
    toggleChecked: false,
    toggle2Checked: false,
  });
  ('');
  function toggleCheckedState(key: keyof typeof state) {
    return () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setState((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };
  }
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <AuthLayout
          className="mb-4"
          onPress={form.handleSubmit}
          title="Selamat Datang!"
          description="Masuk ke akun kamu untuk melanjutkan."
          formType="login"
          textButton="Masuk"
          loading={isSubmitting}>
          <View className="mt-4 w-full">
            <form.AppField
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const result = loginSchema.shape.email.safeParse(value);
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

            <form.AppField
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const result = loginSchema.shape.password.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}>
              {(field) => (
                <field.Input
                  LeftIcon={Key}
                  isPassword
                  placeholder="Password"
                  autoCapitalize="none"
                  autoComplete="password"
                />
              )}
            </form.AppField>
          </View>
        </AuthLayout>
      )}
    </form.Subscribe>
  );
}
