import { setLogout, useAuthStore } from '@/store/auth-store';
import { router } from 'expo-router';
import ky from 'ky';

<<<<<<< HEAD
const BASE_API = process.env.EXPO_PUBLIC_API_URL ?? 'http://172.16.0.132:8000/';

export const api = ky.create({
  baseUrl: 'http://172.16.0.132:8000/api/v1/',
=======
const BASE_API = process.env.EXPO_PUBLIC_API_URL ?? 'https://poliklinik-api.smkpesat.id/';

export const api = ky.create({
  baseUrl: 'https://poliklinik-api.smkpesat.id/api/v1/',
>>>>>>> 084ee958cd25ffd5b0b573422f9ce0406c9e2962
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
