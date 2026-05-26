import { useToast } from './useToastSimplified';
import { router } from 'expo-router';
import { useFormValidation, validationRules } from '@/lib/validations/auth-validation';
import * as React from 'react';
import { TextInput } from 'react-native';
import { api } from '@/api/clien';
import { AuthResponse } from '@/types/auth-types';
import { setLogin } from '@/store/auth-store'; // 👈 Import setLogin dari zustand

interface SignInFormData extends Record<string, string> {
  email: string;
  password: string;
}

export function useSignIn() {
  const { toast } = useToast();

  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  const {
    formData,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    registerField,
    setFieldError,
  } = useFormValidation<SignInFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        // 1. Kirim request login ke custom backend microservice
        const signInAttempt = await api.post('auth/login', { json: values }).json<AuthResponse>();

        // 2. Simpan token & user ke Zustand (Otomatis isAuthenticated jadi true)
        setLogin(signInAttempt);

        toast.success({
          title: 'Welcome back!',
          message: 'You have successfully signed in.',
        });

        // 3. Redirect ke halaman utama / dashboard poliklinik
        router.replace('/(drawwer)/(tabs)');
      } catch (err: any) {
        // 4. Handle error spesifik dari library 'ky' (jika backend ngasih response error)
        if (err.name === 'HTTPError') {
          try {
            const errorBody = await err.response.json();
            const errorMessage = errorBody.message || 'Email atau password salah.';

            // Set error ke field input masing-masing berdasarkan pesan backend
            const isEmailMessage =
              errorMessage.toLowerCase().includes('identifier') ||
              errorMessage.toLowerCase().includes('email') ||
              errorMessage.toLowerCase().includes('tidak ditemukan');

            if (isEmailMessage) {
              setFieldError('email', errorMessage);
            } else {
              setFieldError('password', errorMessage);
            }

            toast.error({
              title: 'Sign In Failed',
              message: errorMessage,
            });
            return;
          } catch (parseErr) {
            // Fallback jika response error bukan JSON
          }
        }

        // 5. Fallback error network / general error
        console.error(err);
        toast.error({
          title: 'Error',
          message:
            err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
        });
      }
    },
  });

  // Register fields dengan validation rules
  React.useEffect(() => {
    registerField({ name: 'email', rules: validationRules.email, ref: emailRef });
    registerField({ name: 'password', rules: validationRules.password, ref: passwordRef });
  }, [registerField]);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    emailRef,
    passwordRef,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
