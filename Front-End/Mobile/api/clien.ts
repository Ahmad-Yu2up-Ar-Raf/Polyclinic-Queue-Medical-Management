import { setLogout, useAuthStore } from '@/components/ui/core/block/auth/store/auth-store';
import { router } from 'expo-router';
import ky from 'ky';

const BASE_API = process.env.EXPO_PUBLIC_API_URL ?? 'https://poliklinik-api.smkpesat.id/';

export const api = ky.create({
  baseUrl: BASE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const Token = useAuthStore.getState().token;
        if (Token) {
          request.headers.set('Authorization', `Bearer ${Token}`);
        }
      },
    ],
    afterResponse: [
      async ({ response }) => {
        if (response.status === 401) {
          setLogout();
          router.replace('/login');
        }
      },
    ],
  },
});
