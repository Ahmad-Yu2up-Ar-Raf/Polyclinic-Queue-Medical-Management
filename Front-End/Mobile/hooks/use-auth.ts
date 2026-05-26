import { api } from '@/api/clien';
import { setLogin, setLogout } from '@/store/auth-store';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToastSimplified';
import { router } from 'expo-router';

export type useAuthType = ReturnType<typeof useAuth>;

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const handleLogout = async () => {
    const loadingToastId = toast.loading({
      title: 'Log Out...',
      message: `Sedang proses logout...`,
    });
    try {
      queryClient.clear();
      const response = await api.post('auth/logout');

      setLogout();

      if (!response.ok) {
        throw new Error('Gagal logout');
      }

      router.push('/(auth)/login');
      toast.dismiss(loadingToastId);
      toast.success({
        title: 'Log Out Berhasil!',
        message: 'Kamu berhasil logout',
      });
      return response;
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error({
        title: 'Gagal logout',
        message: error instanceof Error ? error.message : 'Terjadi kesalahan ketika logout.',
      });
    }
  };
  return {
    handleLogout,
  };
};
