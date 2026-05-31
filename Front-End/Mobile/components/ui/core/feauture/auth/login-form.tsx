// File: @/components/ui/core/feauture/auth/login-form.tsx
import * as React from 'react';
import { Platform, View } from 'react-native';
import AuthLayout from '../../layout/auth-layout';
import { useAuth } from '@/hooks/app/use-auth'; // ✅ Import dari unified hook
import { Email, Key } from '@hugeicons/core-free-icons';
import { loginSchema } from '@/lib/validations/auth-validation';
import { Checkbox } from '@/components/ui/fragments/shadcn-ui/checkbox';
import { Label } from '@/components/ui/fragments/shadcn-ui/label';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { Text } from '@/components/ui/fragments/shadcn-ui/text';
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
                  placeholder="Password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
              )}
            </form.AppField>
          </View>
          {/* <View className="m-0 mb-1 mt-1 h-fit w-full flex-row items-center justify-between px-2">
            <View className="flex flex-row items-center gap-3">
              <Checkbox
                id="terms"
                checked={state.termsChecked}
                onCheckedChange={toggleCheckedState('termsChecked')}
              />
              <Label
                onPress={Platform.select({ native: toggleCheckedState('termsChecked') })}
                htmlFor="terms"
                className="text-muted-foreground">
                Ingat Saya
              </Label>
            </View>
            <Link asChild href={'/(auth)/register'}>
              <Button variant="link" size="sm" className="ml-auto h-fit px-1 py-0 web:h-fit sm:h-4">
                <Text className="text-sm font-normal leading-4">Lupa Password?</Text>
              </Button>
            </Link>
          </View> */}
        </AuthLayout>
      )}
    </form.Subscribe>
  );
}
