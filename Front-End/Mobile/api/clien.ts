import { setLogout, useAuthStore } from '@/store/auth-store';
import { router } from 'expo-router'; // 👈 Import router bawaan expo
import ky from 'ky';

const BASE_API = process.env.EXPO_PUBLIC_API_URL ?? 'http://172.16.0.75:8000/api';

export const api = ky.create({
  baseUrl: BASE_API,

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
          // 👈 Jangan pakai window.location.href, melainkan router expo
          router.replace('/login');
        }
      },
    ],
  },
});
