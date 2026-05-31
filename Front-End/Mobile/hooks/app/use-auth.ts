// File: @/hooks/use-auth.ts
import { api } from '@/api/clien';
import { setLogin, setLogout } from '@/store/auth-store';
import type { AuthResponse } from '@/types/auth-types';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useAppForm } from '../form/use-form';
import { useToast } from '../useToastSimplified';
import { handleApiError } from '@/utils/form-utils';

export type UseAuthType = ReturnType<typeof useAuth>;

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleLogout = async (): Promise<void> => {
    const loadingToastId = toast.loading({
      title: 'Log Out...',
      message: 'Sedang proses logout...',
    });
    try {
      const response = await api.post('auth/logout');

      if (!response.ok) throw new Error('Gagal logout dari server.');

      queryClient.clear();
      toast.dismiss(loadingToastId);

      setLogout();
    } catch (error) {
      queryClient.clear();
      toast.dismiss(loadingToastId);
      toast.error({
        title: 'Sesi Berakhir',
        message: error instanceof Error ? error.message : 'Terjadi kesalahan.',
      });
      setLogout();
    }
  };

  const handleLogin = () =>
    useAppForm({
      defaultValues: {
        email: '',
        password: '',
      },
      onSubmit: async ({ value, formApi }) => {
        try {
          const data = await api.post('auth/login', { json: value }).json<AuthResponse>();
          setLogin(data);

          router.replace('/(tabs)');
        } catch (error) {
          await handleApiError(error, formApi, (message) => {
            toast.error({ title: 'Gagal masuk', message });
          });
        }
      },
    });

  const handleRegister = () =>
    useAppForm({
      defaultValues: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      onSubmit: async ({ value, formApi }) => {
        try {
          const data = await api.post('auth/register', { json: value }).json<AuthResponse>();
          setLogin(data);

          router.replace('/(tabs)');
        } catch (error) {
          await handleApiError(error, formApi, (message) => {
            toast.error({ title: 'Gagal mendaftar', message });
          });
        }
      },
    });

  return { handleLogout, handleLogin, handleRegister };
};

export const useLogout = useAuth;
