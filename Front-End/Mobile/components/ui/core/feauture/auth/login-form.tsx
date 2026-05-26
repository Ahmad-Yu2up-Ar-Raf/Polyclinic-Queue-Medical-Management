import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { View } from 'react-native';

import AuthLayout from '../../layout/auth-layout';
import { FormInput } from '@/components/ui/fragments/custom-ui/form/input-form'; // Sesuaikan path-nya jika berbeda
import { useSignIn } from '@/hooks/use-signin';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    formData,
    errors,
    touched,
    isSubmitting,
    emailRef,
    passwordRef,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useSignIn();

  return (
    <AuthLayout
      onPress={handleSubmit}
      loading={isSubmitting}
      signInGoogleButton={true}
      title="Selamat Datang"
      description="Login untuk melanjutkan"
      formType="login">
      <View className="flex flex-col gap-6">
        {/* Input Email */}
        <FormInput
          disabled={isSubmitting}
          ref={emailRef}
          LeftIcon={Mail}
          placeholder="m@example.com"
          value={formData.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={touched.email ? errors.email : undefined}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        {/* Input Password */}
        <View className="relative w-full">
          <FormInput
            disabled={isSubmitting}
            ref={passwordRef}
            LeftIcon={Lock}
            placeholder="••••••"
            value={formData.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password ? errors.password : undefined}
            secureTextEntry={!showPassword}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            className="pr-12" // Memberi ruang di kanan agar teks tidak menabrak icon mata
          />

          {/* Tombol Toggle Show/Hide Password */}
          <Button
            disabled={isSubmitting}
            variant="ghost"
            className="absolute right-0 top-1 bg-transparent"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowPassword(!showPassword);
            }}>
            {showPassword ? (
              <Eye
                size={22}
                className={cn(
                  errors.password && touched.password ? 'text-destructive' : 'text-muted-foreground'
                )}
              />
            ) : (
              <EyeOff
                size={22}
                className={cn(
                  errors.password && touched.password ? 'text-destructive' : 'text-muted-foreground'
                )}
              />
            )}
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
}
