import { setLogout, useAuthStore } from '@/store/auth-store';
import { router } from 'expo-router';
import ky from 'ky';

const BASE_API = process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.1.3:8000/';

export const api = ky.create({
  baseUrl: 'http://192.168.1.3:8000/api/v1/',
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
